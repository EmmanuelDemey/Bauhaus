import { buildApi } from './build-api';
import { Dataset } from '../model/Dataset';

const api = {
	getAll: () => [''],
	getArchivageUnits: () => ['archivageUnits'],
	getById: (id: string) => [id],
	publish: (id: string) => [
		`${id}/validate`,
		{ method: 'PUT' },
		(res: Response) => res.text(),
	],
	putDataset: (dataset: Dataset) => [
		dataset.id,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataset),
		},
		() => Promise.resolve(dataset.id),
	],
	postDataset: (dataset: Dataset) => [
		'',
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataset),
		},
		(res: Response) => res.text(),
	],
	deleteDataset: (id: string) => [`${id}`, {}, () => Promise.resolve(id)],
};

export const DatasetsApi = buildApi('datasets', api) as any;
