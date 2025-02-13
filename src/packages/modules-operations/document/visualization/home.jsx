import { useEffect, useState } from 'react';

import { Row } from '@components/layout';
import { ExternalLink } from '@components/link';
import { Note } from '@components/note';

import { useTitle } from '@utils/hooks/useTitle';

import D, { D1, D2 } from '../../../deprecated-locales';
import { getBaseURI } from '../../../sdk';
import RelationsView from '../../components/relations';
import { isDocument, isLink, LINK } from '../utils';

function formatSims(sims) {
	const simsObject = sims.reduce((acc, s) => {
		if (acc[s.id]) {
			return {
				...acc,
				[s.id]: {
					...acc[s.id],
					rubrics: [...acc[s.id].rubrics, s.simsRubricId],
				},
			};
		} else {
			return {
				...acc,
				[s.id]: {
					...s,
					rubrics: [s.simsRubricId],
				},
			};
		}
	}, {});

	return Object.values(simsObject).map((s) => {
		return {
			...s,
			labelLg1: s.labelLg1 + ` (${s.rubrics?.join(', ')})`,
			labelLg2: s.labelLg2 + ` (${s.rubrics?.join(', ')})`,
		};
	});
}
/**
 * @typedef OperationsDocumentationVisualizationProps
 * @property {any} attr
 * @property {boolean} secondLang
 * @property {{ lg1: string, lg2: string }} langs
 *
 * @param {OperationsDocumentationVisualizationProps} props
 */
function OperationsDocumentationVisualization({
	id,
	attr,
	secondLang,
	langOptions,
	type,
}) {
	useTitle(type === LINK ? D.titleLink : D.titleDocument, attr.labelLg1);
	const sims = formatSims(attr.sims);
	const [baseURI, setBaseURI] = useState('');
	useEffect(() => {
		getBaseURI().then((uri) => setBaseURI(uri));
	});
	return (
		<>
			<Row>
				<Note
					text={attr.descriptionLg1}
					title={D1.descriptionTitle}
					alone={!secondLang}
					allowEmpty={true}
				/>
				{secondLang && (
					<Note
						text={attr.descriptionLg2}
						title={D2.descriptionTitle}
						alone={false}
						allowEmpty={true}
					/>
				)}
			</Row>
			{isDocument(attr) && (
				<Row>
					<Note
						text={
							attr.updatedDate &&
							new Date(attr.updatedDate).toLocaleDateString()
						}
						title={D1.titleUpdatedDate}
						alone={true}
						allowEmpty={true}
					/>
				</Row>
			)}
			{isDocument(attr) && (
				<Row>
					<Note
						text={
							<ExternalLink href={`${baseURI}/documents/document/${id}/file`}>
								{attr.labelLg1}
							</ExternalLink>
						}
						title={D1.titleDocument}
						alone={true}
						allowEmpty={true}
					/>
				</Row>
			)}
			{isLink(attr) && (
				<Row>
					<Note
						text={<ExternalLink href={attr.url}>{attr.url}</ExternalLink>}
						title={D1.titleLink}
						alone={true}
						allowEmpty={true}
					/>
				</Row>
			)}
			<Row>
				<Note
					text={
						langOptions?.codes?.find((option) => option.code === attr.lang)
							?.labelLg1
					}
					title={D1.langTitle}
					alone={true}
					allowEmpty={true}
				/>
			</Row>
			<RelationsView
				children={sims}
				childrenTitle="linkedSims"
				childrenPath="sims"
				title="linksTitle"
				secondLang={secondLang}
			/>
		</>
	);
}

export default OperationsDocumentationVisualization;
