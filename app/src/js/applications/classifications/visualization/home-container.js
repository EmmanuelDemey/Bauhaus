import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ClassificationVisualization from './home';
import { buildExtract, Loading } from '@inseefr/wilco';
import loadClassification from 'js/actions/classifications/classification';
import * as mainSelect from 'js/reducers';
import * as select from 'js/reducers/classifications/classification';
import { Stores } from 'bauhaus-utilities';

const extractId = buildExtract('id');

class ClassificationVisualizationContainer extends Component {
	constructor(props) {
		super();
	}
	componentWillMount() {
		const { classification, id } = this.props;
		if (!classification) this.props.loadClassification(id);
	}
	componentWillReceiveProps({ id }) {
		if (id !== this.props.id) {
			this.props.loadClassification(id);
		}
	}
	render() {
		const { classification, id, secondLang, langs } = this.props;
		if (!classification) return <Loading />;
		return (
			<ClassificationVisualization
				classification={classification}
				classificationId={id}
				secondLang={secondLang}
				langs={langs}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = extractId(ownProps);
	const classification = select.getClassification(state, id);
	const secondLang = Stores.SecondLang.getSecondLang(state);
	const langs = mainSelect.getLangs(state);
	return {
		id,
		classification,
		secondLang,
		langs,
	};
};

const mapDispatchToProps = {
	loadClassification,
};

ClassificationVisualizationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ClassificationVisualizationContainer);

ClassificationVisualizationContainer.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}),
	}),
};
export default ClassificationVisualizationContainer;
