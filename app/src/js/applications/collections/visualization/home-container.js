import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { VALIDATE_COLLECTION_LIST } from 'js/actions/constants';
import validateCollection from 'js/actions/collections/validate';
import * as select from 'js/reducers';
import loadCollections from 'js/actions/collections/collection';
import loadStampList from 'js/actions/stamp';
import { Loading, buildExtract } from '@inseefr/wilco';
import CollectionVisualization from './home';
import { OK } from 'js/constants';
import { Auth, Stores } from 'bauhaus-utilities';

const extractId = buildExtract('id');

class CollectionVisualizationContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validationRequested: false,
		};
		this.handleCollectionValidation = (id) => {
			this.props.validateCollection(id);
			this.setState({
				validationRequested: true,
			});
		};
	}
	componentWillMount() {
		const { id, collection, stampList } = this.props;
		if (!collection) this.props.loadCollections(id);
		if (!stampList) this.props.loadStampList();
	}

	componentWillReceiveProps({ id, validationStatus }) {
		if (id !== this.props.id) {
			this.props.loadCollections(id);
		}
		if (this.state.validationRequested && validationStatus === OK) {
			//validation has been processed successfully, we can show the
			//component again
			this.setState({
				validationRequested: false,
			});
			//we need to load the collection again
			this.props.loadCollections(id);
		}
	}
	render() {
		const { validationRequested } = this.state;
		const { validationStatus, langs } = this.props;
		if (validationRequested && validationStatus !== OK) {
			//if validation is OK: nothing to do. We stay on this page and the collection will
			//be loaded automatically (since the entries for the given collection in the store will
			//be deleted).
			if (validationStatus !== OK) return <Loading textType="validating" />;
		}
		const { id, permission, collection, stampList, secondLang } = this.props;
		if (collection && stampList) {
			const { general, members } = collection;
			return (
				<CollectionVisualization
					id={id}
					permission={permission}
					general={general}
					members={members}
					stampList={stampList}
					validateCollection={this.handleCollectionValidation}
					validationStatus={validationStatus}
					secondLang={secondLang}
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
		permission: Auth.getPermission(state),
		secondLang: Stores.SecondLang.getSecondLang(state),
		collection: select.getCollection(state, id),
		stampList: Stores.Stamps.getStampList(state),
		validationStatus: select.getStatus(state, VALIDATE_COLLECTION_LIST),
		langs: select.getLangs(state),
	};
};

const mapDispatchToProps = {
	loadCollections,
	loadStampList,
	validateCollection: (id) => validateCollection([id]),
};

CollectionVisualizationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CollectionVisualizationContainer);

CollectionVisualizationContainer.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}),
	}),
};
export default CollectionVisualizationContainer;
