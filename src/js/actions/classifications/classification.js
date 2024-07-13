import loadGeneral from './general';
import loadLevels from './levels';

const loadClassification = (id) => (dispatch) =>
	Promise.all([dispatch(loadGeneral(id)), dispatch(loadLevels(id))]);

export default loadClassification;
