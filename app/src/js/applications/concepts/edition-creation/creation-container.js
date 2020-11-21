import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CREATE_CONCEPT } from 'js/actions/constants';
import * as select from 'js/reducers';
import loadConceptList from 'js/actions/concepts/list';
import loadStampList from 'js/actions/stamp';
import createConcept from 'js/actions/concepts/create';
import buildPayloadCreation from 'js/utils/concepts/build-payload-creation-update/build-payload-creation';
import ConceptEditionCreation from './home';
import { mergeWithAllConcepts } from 'js/utils/concepts/links';
import D from 'js/i18n';
import emptyConcept from 'js/utils/concepts/empty-concept';
import { Loading } from '@inseefr/wilco';
import { OK } from 'js/constants';
import { Stores } from 'bauhaus-utilities';

class CreationContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creationRequested: false,
			id: '',
		};

		this.handleCreation = (data) => {
			this.props.createConcept(buildPayloadCreation(data));
			this.setState({
				creationRequested: true,
			});
		};
	}

	componentWillMount() {
		const { conceptList, stampList, disseminationStatusList } = this.props;
		if (!conceptList) this.props.loadConceptList();
		if (stampList.length === 0) this.props.loadStampList();
		if (!disseminationStatusList) this.props.loadDisseminationStatusList();
	}

	render() {
		const {
			concept,
			conceptList,
			stampList,
			disseminationStatusList,
			maxLengthScopeNote,
			creationStatus,
			langs,
		} = this.props;

		if (this.state.creationRequested) {
			if (creationStatus === OK) {
				return <Redirect to={`/concept/${this.props.id}`} />;
			} else return <Loading textType="saving" />;
		}
		if (conceptList && stampList && disseminationStatusList) {
			const { general, notes, links } = concept;
			const conceptsWithLinks = mergeWithAllConcepts(conceptList, links);
			return (
				<ConceptEditionCreation
					creation
					title={D.createConceptTitle}
					general={general}
					notes={notes}
					conceptsWithLinks={conceptsWithLinks}
					disseminationStatusList={disseminationStatusList}
					maxLengthScopeNote={maxLengthScopeNote}
					stampList={stampList}
					isActionProcessed={creationStatus}
					save={this.handleCreation}
					langs={langs}
				/>
			);
		}
		return <Loading />;
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		concept: emptyConcept(state.app.properties.defaultContributor),
		conceptList: select.getConceptList(state),
		stampList: Stores.Stamps.getStampList(state),
		disseminationStatusList: Stores.DisseminationStatus.getDisseminationStatusList(state),
		maxLengthScopeNote: Number(state.app.properties.maxLengthScopeNote),
		id: select.getNewlyCreatedId(state),
		creationStatus: select.getStatus(state, CREATE_CONCEPT),
		langs: select.getLangs(state),
	};
};

const mapDispatchToProps = {
	loadConceptList,
	loadDisseminationStatusList: Stores.DisseminationStatus.loadDisseminationStatusList,
	loadStampList,
	createConcept,
};

CreationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreationContainer);

export default CreationContainer;
