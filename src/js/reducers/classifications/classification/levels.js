import * as A from '../../../actions/constants';
import { LOADED } from '../../../new-architecture/sdk/constants';

const reducers = (state = {}, action) => {
	const { type, payload } = action;
	switch (type) {
		case A.LOAD_CLASSIFICATION_LEVELS_SUCCESS: {
			const { id, results } = payload;
			return {
				...state,
				[id]: {
					status: LOADED,
					results,
				},
			};
		}
		default:
			return state;
	}
};

export default reducers;

export function getLevels(state, id) {
	return state[id] && state[id].results;
}
