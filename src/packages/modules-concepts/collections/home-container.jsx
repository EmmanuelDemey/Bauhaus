import { useEffect, useState } from 'react';

import { Loading } from '@components/loading';

import { CollectionApi } from '@sdk/collection-api';

import CollectionsHome from './home';

export const Component = () => {
	const [loading, setLoading] = useState(true);
	const [collections, setCollections] = useState([]);
	useEffect(() => {
		CollectionApi.getCollectionList()
			.then(setCollections)
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Loading />;
	}
	return <CollectionsHome collections={collections} />;
};
