import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as select from 'js/reducers';
import { UPDATE_CONCEPT } from 'js/actions/constants';
import loadConcept from 'js/actions/concepts/concept';
import loadConceptList from 'js/actions/concepts/list';
import loadStampList from 'js/actions/stamp';
import updateConcept from 'js/actions/concepts/update';
import ConceptEditionCreation from './home';
import buildPayloadUpdate from 'js/utils/concepts/build-payload-creation-update/build-payload-update';
import { mergeWithAllConcepts } from 'js/utils/concepts/links';
import D from 'js/i18n';
import { Loading, buildExtract } from '@inseefr/wilco';
import { OK } from 'js/constants';
import { Stores } from 'bauhaus-utilities';

const extractId = buildExtract('id');

class EditionContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			updateRequested: false,
		};

		this.handleUpdate = (id, versioning, oldData, data) => {
			this.props.updateConcept(
				id,
				buildPayloadUpdate(versioning, oldData, data)
			);
			this.setState({
				updateRequested: true,
			});
		};
	}

	componentWillMount() {
		const {
			id,
			concept,
			conceptList,
			stampList,
			disseminationStatusList,
		} = this.props;
		if (!concept) this.props.loadConcept(id);
		if (!conceptList) this.props.loadConceptList();
		if (stampList.length === 0) this.props.loadStampList();
		if (!disseminationStatusList) this.props.loadDisseminationStatusList();
	}

	render() {
		if (this.state.updateRequested) {
			if (this.props.updateStatus === OK) {
				return <Redirect to={`/concept/${this.props.id}`} />;
			} else return <Loading textType="saving" />;
		}
		const {
			id,
			concept,
			conceptList,
			stampList,
			disseminationStatusList,
			maxLengthScopeNote,
			updateStatus,
			langs,
		} = this.props;
		if (concept && conceptList && stampList && disseminationStatusList) {
			const { general, notes, links } = concept;
			const conceptsWithLinks = mergeWithAllConcepts(conceptList, links);

			return (
				<ConceptEditionCreation
					id={id}
					title={D.updateConceptTitle}
					subtitle={general.prefLabelLg1}
					general={general}
					notes={notes}
					conceptsWithLinks={conceptsWithLinks}
					disseminationStatusList={disseminationStatusList}
					maxLengthScopeNote={maxLengthScopeNote}
					stampList={stampList}
					isActionProcessed={updateStatus}
					save={this.handleUpdate}
					langs={langs}
				/>
			);
		}
		return <Loading />;
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = extractId(ownProps);
	return {
		id,
		concept: select.getConcept(state, id),
		conceptList: select.getConceptList(state),
		stampList: Stores.Stamps.getStampList(state),
		disseminationStatusList: Stores.DisseminationStatus.getDisseminationStatusList(state),
		maxLengthScopeNote: Number(state.app.properties.maxLengthScopeNote),
		updateStatus: select.getStatus(state, UPDATE_CONCEPT),
		langs: select.getLangs(state),
	};
};

const mapDispatchToProps = {
	loadConcept,
	loadConceptList,
	loadDisseminationStatusList: Stores.DisseminationStatus.loadDisseminationStatusList,
	loadStampList,
	updateConcept,
};

EditionContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditionContainer);

EditionContainer.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}),
	}),
};

export default EditionContainer;
