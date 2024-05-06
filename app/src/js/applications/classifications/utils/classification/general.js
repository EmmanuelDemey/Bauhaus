import { buildEmpty } from '@inseefr/wilco';

export const fieldsWithRequired = [
	['prefLabelLg1', true],
	['prefLabelLg2', false],
	['altLabelLg1', false],
	['altLabelLg2', false],
	['seriesLg1', false],
	['seriesLg2', false],
	['idSeries', false],
	['afterLg1', false],
	['afterLg2', false],
	['idAfter', false],
	['beforeLg1', false],
	['beforeLg2', false],
	['idBefore', false],
	['variantLg1', false],
	['variantLg2', false],
	['idVariant', false],
	['issued', false],
	['valid', false],
	['lastRefreshedOn', false],
	['additionalMaterial', false],
	['rights', false],
	['creator', false],
	['contributor', false],
	['disseminationStatus', false],
	['legalMaterial', false],
	['homepage', false],
	['scopeNoteLg1', false],
	['scopeNoteLg2', false],
	['changeNoteLg1', false],
	['changeNoteLg2', false],
	['descriptionLg1', false],
	['descriptionLg2', false],
];

export const empty = () => buildEmpty(fieldsWithRequired);
