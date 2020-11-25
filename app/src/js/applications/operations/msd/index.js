import React, { Component } from 'react';
import MSDLayout from 'js/applications/operations/msd/layout/';
import { connect } from 'react-redux';
import { Loading, buildExtract } from '@inseefr/wilco';
import { LOADING, NOT_LOADED, LOADED } from 'js/constants';
import loadMetadataStructure from 'js/actions/operations/metadatastructure/list';
import loadDocuments from 'js/actions/operations/documents/list';
import {
	getOperationsDocuments,
	getOperationsDocumentsStatus,
	getOperationsOrganisations,
	getOperationsCodesList,
} from 'js/reducers/operations/selector';
import loadSIMS, {
	saveSims,
	publishSims,
} from 'js/actions/operations/sims/item';
import { withRouter } from 'react-router-dom';
import MSDHelp from 'js/applications/operations/msd/pages/help';
import SimsVisualisation from 'js/applications/operations/msd/pages/sims-visualisation/';
import SimsCreation from 'js/applications/operations/msd/pages/sims-creation/';
import PropTypes from 'prop-types';
import * as select from 'js/reducers';
import loadOperation from 'js/actions/operations/operations/item';
import loadSerie from 'js/actions/operations/series/item';
import loadIndicator from 'js/actions/operations/indicators/item';
import { Stores, PageTitleBlock } from 'bauhaus-utilities';
import api from 'js/remote-api/operations-api';

import { getParentType, getParentId } from './utils';
import './msd.scss';
const extractId = buildExtract('id');
const extractIdParent = buildExtract('idParent');

export const HELP = 'HELP';
export const CREATE = 'CREATE';
export const VIEW = 'VIEW';
export const UPDATE = 'UPDATE';
export const DUPLICATE = 'DUPLICATE';

const mapToParentType = {
	operation: {
		load: 'loadOperation',
	},
	series: { load: 'loadSerie' },
	indicator: { load: 'loadIndicator' },
};
class MSDContainer extends Component {
	static propTypes = {
		metadataStructure: PropTypes.object,
		metadataStructureStatus: PropTypes.oneOf([LOADED, NOT_LOADED, LOADING]),
		codesLists: PropTypes.object,
		mode: PropTypes.oneOf([HELP, VIEW, CREATE, UPDATE, DUPLICATE]),
		baseUrl: PropTypes.string,
		id: PropTypes.string,
		saveSims: PropTypes.func,
		idParent: PropTypes.string,
		disableSectionAnchor: PropTypes.bool,
		langs: PropTypes.object,
		secondLang: PropTypes.bool,
		currentSims: PropTypes.object,
	};
	static defaultProps = {
		currentSims: {},
	};

	constructor() {
		super();
		this.state = {
			exportPending: false,
			owners: []
		};
	}
	_loadParent(id) {
		const parentType = this.props.match.params[0];
		return this.props[mapToParentType[parentType].load](id);
	}

	goBackCallback = (url) => {
		this.props.history.push(url);
	};

	componentDidMount() {
		if (this.props.documentStoresStatus === NOT_LOADED) {
			this.props.loadDocuments();
		}
		if (this.props.metadataStructureStatus !== LOADED) {
			this.props.loadMetadataStructure();
		}
		if (!this.props.currentSims.id) {
			this.props.loadSIMS(this.props.id);
		}
		if (!this.props.isParentLoaded) {
			this._loadParent(this.props.idParent);
		}
		if (!this.props.geographiesLoaded) {
			this.props.loadGeographies();
		}

		if(!this.props.userStampLoaded){
			this.props.loadUserStamp();
		}

		this._loadOwnersList();
	}

	_loadOwnersList() {
		api.getOwners(this.props.id).then(owners => {
			this.setState({ owners })
		})
	}
	exportCallback = (id) => {
		this.setState(() => ({ exportPending: true }));
		api.exportSims(id).then(() => {
			this.setState(() => ({ exportPending: false }));
		});
	};
	componentWillReceiveProps(nextProps) {
		if (!nextProps.currentSims.id || this.props.id !== nextProps.id) {
			this.props.loadSIMS(nextProps.id);
		}
		if (!nextProps.isParentLoaded) {
			this._loadParent(nextProps.idParent);
		}
	}
	isEditMode = () => {
		const { mode } = this.props;
		return mode === CREATE || mode === UPDATE || mode === DUPLICATE;
	};
	render() {
		const {
			metadataStructure,
			metadataStructureStatus,
			codesLists,
			mode = HELP,
			baseUrl,
			saveSims,
			idParent,
			disableSectionAnchor,
			langs,
			secondLang,
			currentSims,
			organisations,
			parentType,
			documentStores,
		} = this.props;
		if (
			metadataStructureStatus !== LOADED ||
			(mode === VIEW && !currentSims.id)
		)
			return <Loading />;

		if (this.state.exportPending) return <Loading textType="loadableLoading" />;
		return (
			<MSDLayout
				metadataStructure={metadataStructure}
				currentSection={this.props.match.params.idSection}
				storeCollapseState={mode === HELP}
				baseUrl={baseUrl}
				disableSectionAnchor={disableSectionAnchor}
			>
				{mode !== HELP && mode !== DUPLICATE && (
					<PageTitleBlock
						titleLg1={currentSims.labelLg1}
						titleLg2={currentSims.labelLg2}
						secondLang={secondLang || mode !== VIEW}
					/>
				)}
				{mode === HELP && (
					<MSDHelp
						metadataStructure={metadataStructure}
						codesLists={codesLists}
						currentSection={this.props.match.params.idSection}
						langs={langs}
						organisations={organisations}
					/>
				)}

				{mode === VIEW && (
					<SimsVisualisation
						sims={currentSims}
						metadataStructure={metadataStructure}
						codesLists={codesLists}
						organisations={organisations}
						currentSection={this.props.match.params.idSection}
						langs={langs}
						secondLang={secondLang}
						goBack={this.goBackCallback}
						publishSims={this.props.publishSims}
						exportCallback={this.exportCallback}
						owners={this.state.owners}
					/>
				)}
				{this.isEditMode() && (
					<SimsCreation
						sims={currentSims}
						metadataStructure={metadataStructure}
						codesLists={codesLists}
						onSubmit={saveSims}
						idParent={idParent}
						langs={langs}
						goBack={this.goBackCallback}
						mode={mode}
						organisations={organisations}
						parentType={parentType}
						documentStores={documentStores}
					/>
				)}
			</MSDLayout>
		);
	}


}

export const mapStateToProps = (state, ownProps) => {
	if (!state.operationsMetadataStructureList) {
		return {
			metadataStructureStatus: NOT_LOADED,
			metadataStructure: [],
		};
	}

	const {
		results: metadataStructure,
		status: metadataStructureStatus,
	} = state.operationsMetadataStructureList;

	const id = extractId(ownProps);

	function getCurrentParent(parentType) {
		if (parentType === 'operation') {
			return [
				select.getOperation(state),
				state.operationsIndicatorCurrentStatus,
			];
		}
		if (parentType === 'series') {
			return [select.getSerie(state), state.operationsSeriesCurrentStatus];
		}
		if (parentType === 'indicator') {
			return [
				select.getIndicator(state),
				state.operationsIndicatorCurrentStatus,
			];
		}
	}

	let idParent;
	let currentSims = {};
	let parentType;
	let isParentLoaded = true;
	switch (ownProps.mode) {
		case HELP:
			currentSims = {};
			break;
		case CREATE:
			idParent = extractIdParent(ownProps);
			parentType = ownProps.match.params[0];
			const [currentParent, currentParentStatus] = getCurrentParent(parentType);
			currentSims = {
				labelLg1: currentParent.prefLabelLg1,
				labelLg2: currentParent.prefLabelLg2,
			};
			isParentLoaded =
				currentParentStatus !== NOT_LOADED || currentParent.id === idParent;
			break;
		default:
			currentSims = select.getOperationsSimsCurrent(state);
			parentType = getParentType(currentSims);
			idParent = getParentId(currentSims);
			break;
	}

	return {
		documentStoresStatus: getOperationsDocumentsStatus(state),
		documentStores: getOperationsDocuments(state, ownProps.objectType),
		geographiesLoaded: Stores.Geographies.isLoaded(state),
		userStampLoaded: Stores.UsersAction.isLoaded(state),
		langs: select.getLangs(state),
		secondLang: Stores.SecondLang.getSecondLang(state),
		metadataStructure,
		metadataStructureStatus,
		currentSims: !id || currentSims.id === id ? currentSims : {},
		isParentLoaded,
		id,
		idParent,
		codesLists: getOperationsCodesList(state),
		organisations: getOperationsOrganisations(state),
		parentType,
	};
};

const mapDispatchToProps = {
	loadMetadataStructure,
	loadSIMS,
	saveSims,
	loadOperation,
	loadSerie,
	loadIndicator,
	publishSims,
	loadDocuments,
	loadGeographies: Stores.Geographies.loadGeographies,
	loadUserStamp: Stores.UsersAction.loadUserStamp,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(MSDContainer)
);
