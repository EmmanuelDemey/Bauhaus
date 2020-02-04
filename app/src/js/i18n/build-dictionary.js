import appD from './dictionary/app';
import conceptsD from './dictionary/concepts';
import classificationsD from './dictionary/classifications';
import operationsD from './dictionary/operations/index.js';
import DSDsD from './dictionary/dsds';

import {
	createDictionary,
	firstLang,
	secondLang,
	getLang,
} from 'bauhaus-library';

const dictionary = {
	...appD,
	...conceptsD,
	...classificationsD,
	...operationsD,
	...DSDsD,
};

export const D1 = createDictionary(firstLang, dictionary);
export const D2 = createDictionary(secondLang, dictionary);

export default getLang() === firstLang ? D1 : D2;
