import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '@components/loading';

import { ClassificationsApi } from '@sdk/classification';

import { useSecondLang } from '@utils/hooks/second-lang';

import SeriesVisualization from './home';

export const Component = () => {
	const { id } = useParams();
	const [series, setSeries] = useState();

	const [secondLang] = useSecondLang();
	useEffect(() => {
		Promise.all([
			ClassificationsApi.getSeriesGeneral(id),
			ClassificationsApi.getSeriesMembers(id),
		]).then(([general, members]) => {
			setSeries({
				general: general ?? {},
				members: members ?? [],
			});
		});
	}, [id]);

	if (!series) return <Loading />;
	return <SeriesVisualization series={series} secondLang={secondLang} />;
};
