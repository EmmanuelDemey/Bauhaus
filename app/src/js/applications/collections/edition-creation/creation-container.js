import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CREATE_COLLECTION } from 'js/actions/constants';
import * as select from 'js/reducers';
import loadConceptList from 'js/actions/concepts/list';
import loadCollectionList from 'js/actions/collections/list';
import loadStampList from 'js/actions/stamp';
import createCollection from 'js/actions/collections/create';
import buildPayload from 'js/utils/collections/build-payload/build-payload';
import CollectionEditionCreation from './home';
import D from 'js/i18n';
import emptyCollection from 'js/utils/collections/empty-collection';
import { cleanId, Loading } from '@inseefr/wilco';
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
			this.props.createCollection(buildPayload(data, 'CREATE'));
			this.setState({
				creationRequested: true,
				id: data.general.id,
			});
		};
	}

	componentWillMount() {
		const { conceptList, collectionList, stampList } = this.props;
		if (!conceptList) this.props.loadConceptList();
		if (!collectionList) this.props.loadCollectionList();
		if (!stampList) this.props.loadStampList();
	}

	render() {
		const {
			collection,
			collectionList,
			conceptList,
			stampList,
			creationStatus,
			langs,
		} = this.props;

		if (this.state.creationRequested) {
			if (creationStatus === OK) {
				return <Redirect to={`/collection/${cleanId(this.state.id)}`} />;
			} else return <Loading textType="saving" />;
		}
		if (conceptList && stampList) {
			const { general, members } = collection;
			return (
				<CollectionEditionCreation
					creation
					title={D.createCollectionTitle}
					general={general}
					members={members}
					collectionList={collectionList}
					conceptList={conceptList}
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
		collection: emptyCollection(state.app.properties.defaultContributor),
		collectionList: select.getCollectionList(state),
		conceptList: select.getConceptList(state),
		stampList: Stores.Stamps.getStampList(state),
		creationStatus: select.getStatus(state, CREATE_COLLECTION),
		langs: select.getLangs(state),
	};
};

const mapDispatchToProps = {
	loadConceptList,
	loadCollectionList,
	loadStampList,
	createCollection,
};

CreationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreationContainer);

export default CreationContainer;
