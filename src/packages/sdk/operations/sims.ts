import { saveFileFromHttpResponse } from '../../utils/files';

const hasDocument = (sims: any, withDocument: boolean) => {
	if (!withDocument) {
		return false;
	}
	// We activate the download of a ZIP with documents only if we have at least on file using the file:// protocol.
	const hasDocument =
		Object.values(sims.rubrics).filter((rubric: any) => {
			return rubric.documentsLg1?.find((doc: any) => {
				return doc.url.indexOf('file') === 0;
			});
		})?.length > 0;

	return hasDocument;
};

const api = {
	getSims: (id: string) => [`metadataReport/${id}`],
	getDefaultSims: () => ['metadataReport/default'],
	getOwners: (id: string) => [`metadataReport/Owner/${id}`],
	exportSims: (id: string, config: any, sims: any) => [
		`metadataReport/export/${id}?emptyMas=${config.emptyMas}&lg1=${
			config.lg1
		}&lg2=${config.lg2}&document=${hasDocument(sims, config.document)}`,
		{
			method: 'GET',
			mode: 'cors',
			headers: {
				Accept: 'application/vnd.oasis.opendocument.text',
				'Content-Type': 'text/plain',
			},
		},
		async (response: any) => {
			await saveFileFromHttpResponse(response);

			if (response.headers.get('X-Missing-Documents')) {
				return new Set(response.headers.get('X-Missing-Documents').split(','));
			}
			return new Set();
		},
	],
	deleteSims: (sims: any) => [
		`metadataReport/delete/${sims.id}`,
		(res: Response) => res.text(),
	],
	publishSims: (sims: any) => [
		`metadataReport/validate/${sims.id}`,
		{ method: 'PUT' },
		(res: Response) => res.text(),
	],
	putSims: (sims: any) => [
		`metadataReport/${sims.id}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sims),
		},
		() => {},
	],
	postSims: (sims: any) => [
		`metadataReport`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sims),
		},
		(res: Response) => res.text().then((id) => id),
	],
} as any;

export default api;
