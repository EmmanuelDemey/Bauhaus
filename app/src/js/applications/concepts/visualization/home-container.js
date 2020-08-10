import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { VALIDATE_CONCEPT_LIST } from 'js/actions/constants';
import validateConcepts from 'js/actions/concepts/validate';
import {
	DELETE_CONCEPT,
	DELETE_CONCEPT_FAILURE,
	DELETE_CONCEPT_SUCCESS,
} from 'js/actions/constants/concepts';
import deleteConcept from 'js/actions/concepts/delete';
import * as select from 'js/reducers';
import loadConcept from 'js/actions/concepts/concept';
import loadConceptAndAllNotes from 'js/actions/concepts/concept-and-all-notes';
import check from 'js/utils/auth';
import { Loading, buildExtract } from '@inseefr/wilco';
import ConceptVisualization from './home';
import ConceptVisualizationStandBy from './stand-by';
import { OK } from 'js/constants';
import { Auth, Stores } from 'bauhaus-utilities';

const extractId = buildExtract('id');

class ConceptVisualizationContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validationRequested: false,
			deletionRequested: false,
		};
		this.handleConceptValidation = id => {
			this.props.validateConcept(id);
			this.setState({
				validationRequested: true,
			});
		};
		this.handleConceptDeletion = id => {
			this.props.deleteConcept(id);
			this.setState({
				deletionRequested: true,
			});
		};
	}
	componentWillMount() {
		const { id, allNotes } = this.props;
		if (!allNotes) {
			this.props.loadConceptAndAllNotes(id);
		}
	}

	componentWillReceiveProps({ id, validationStatus, deleteStatus }) {
		if (id !== this.props.id) {
			this.props.loadConceptAndAllNotes(id);
		}
		if (this.state.validationRequested && validationStatus === OK) {
			//validation has been processed successfully, we can show the
			//component again
			this.setState({
				validationRequested: false,
			});
			//we need to load the concept again
			this.props.loadConcept(id);
		}
		if (this.state.deletionRequested && deleteStatus !== OK) {
			//deletion has not been processed successfully, we show the
			//component again
			this.setState({
				deletionRequested: false,
				showModalError: true,
			});
		}
	}
	render() {
		const { validationRequested, deletionRequested } = this.state;
		const { validationStatus, deleteStatus } = this.props;

		if (validationRequested && validationStatus !== OK) {
			//if validation is OK: nothing to do. We stay on this page and the concept will
			//be loaded automatically (since the entries for the given concept in the store will
			//be deleted).
			if (validationStatus !== OK) {
				return <Loading textType="validating" />;
			}
		}

		if (deletionRequested && deleteStatus === OK) {
			//if deletion is OK: we redirect to the concepts list.
			return <Redirect to={`/concepts`} />;
		}

		const {
			id,
			permission,
			concept,
			allNotes,
			secondLang,
			langs,
			error,
		} = this.props;
		if (concept && allNotes) {
			const { general, links } = concept;
			let { notes } = concept;
			const { conceptVersion, isValidated, creator } = general;
			const { authType, roles, stamp } = permission;
			const authImpl = check(authType);
			const adminOrContributorOrConceptCreator = authImpl.isAdminOrContributorOrConceptCreator(
				roles,
				stamp,
				creator
			);
			if (
				!adminOrContributorOrConceptCreator &&
				isValidated === 'false' &&
				conceptVersion === '1'
			)
				return <ConceptVisualizationStandBy general={general} />;
			if (
				conceptVersion !== '1' &&
				isValidated === 'false' &&
				!adminOrContributorOrConceptCreator
			) {
				general.isValidated = 'true';
				general.conceptVersion = (general.conceptVersion - 1).toString();
				notes = allNotes[general.conceptVersion];
			}

			return (
				<ConceptVisualization
					id={id}
					permission={permission}
					general={general}
					notes={notes}
					links={links}
					validateConcept={this.handleConceptValidation}
					deleteConcept={this.handleConceptDeletion}
					validationStatus={validationStatus}
					secondLang={secondLang}
					langs={langs}
					serverSideError={error}
				/>
			);
		}
		return <Loading />;
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = extractId(ownProps);
	let allNotes;
	const general = select.getConceptGeneral(state, id);
	if (general) {
		allNotes = select.getAllNotes(state, id, general.conceptVersion);
	}
	return {
		id,
		permission: Auth.getPermission(state),
		secondLang: Stores.SecondLang.getSecondLang(state),
		concept: select.getConcept(state, id),
		allNotes,
		validationStatus: select.getStatus(state, VALIDATE_CONCEPT_LIST),
		deleteStatus: select.getStatus(state, DELETE_CONCEPT),
		deleteSuccessStatus: select.getStatus(state, DELETE_CONCEPT_SUCCESS),
		deleteFailureStatus: select.getStatus(state, DELETE_CONCEPT_FAILURE),
		langs: select.getLangs(state),
		error: select.getError(state, DELETE_CONCEPT),
	};
};

const mapDispatchToProps = {
	loadConcept,
	loadConceptAndAllNotes,
	validateConcept: id => validateConcepts([id]),
	deleteConcept: id => deleteConcept(id),
};

ConceptVisualizationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConceptVisualizationContainer);

ConceptVisualizationContainer.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}),
	}),
};
export default ConceptVisualizationContainer;
