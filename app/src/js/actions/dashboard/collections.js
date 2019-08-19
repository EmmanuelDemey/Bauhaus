import api from 'js/remote-api/concepts-api';
import * as A from '../constants';
import { sortArray } from 'js/utils/array-utils';

const sortByLabel = sortArray('label');

export default () => dispatch => {
	dispatch({
		type: A.LOAD_COLLECTION_DASHBOARD_LIST,
		payload: {},
	});
	return api.getCollectionDashboardList().then(
		results =>
			dispatch({
				type: A.LOAD_COLLECTION_DASHBOARD_LIST_SUCCESS,
				payload: { results: sortByLabel(results) },
			}),
		err =>
			dispatch({
				type: A.LOAD_COLLECTION_DASHBOARD_LIST_FAILURE,
				payload: { err },
			})
	);
};