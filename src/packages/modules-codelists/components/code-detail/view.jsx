import { ActionToolbar } from '@components/action-toolbar';
import { ReturnButton } from '@components/buttons/buttons-with-icons';
import { ErrorBloc } from '@components/errors-bloc';
import { Row } from '@components/layout';
import { Note } from '@components/note';

import { renderMarkdownElement } from '@utils/html-utils';

import D, { D1, D2 } from '../../i18n/build-dictionary';
import './view.css';

export const CodeDetailView = ({
	code,
	codes,
	handleBack,
	secondLang,
	col = 3,
	serverSideError,
}) => {
	const descriptionLg1 = renderMarkdownElement(code.descriptionLg1);
	const descriptionLg2 = renderMarkdownElement(code.descriptionLg2);

	const codesOptions = codes.map((code) => {
		return {
			label: code.code + ' - ' + code.labelLg1,
			value: code.code,
		};
	});

	return (
		<>
			<ActionToolbar>
				<ReturnButton action={handleBack} col={col} />
			</ActionToolbar>
			<ErrorBloc error={serverSideError} />
			<Row>
				<Note
					text={
						<ul>
							{codesOptions
								.filter(
									({ value }) =>
										code.parents &&
										code.parents.some((parent) => parent.code === value),
								)
								.map((code) => (
									<li key={code.value}>{code.label}</li>
								))}
						</ul>
					}
					title={D1.parentCodeTitle}
					alone={true}
				/>
			</Row>
			<Row>
				<Note text={code.code} title={D.codeTitle} alone={true} />
			</Row>
			<Row>
				<Note text={code.labelLg1} title={D1.codeLabel} alone={!secondLang} />
				{secondLang && (
					<Note text={code.labelLg2} title={D2.codeLabel} alone={false} />
				)}
			</Row>
			<Row>
				<Note
					text={descriptionLg1}
					title={D1.codeDescription}
					alone={!secondLang}
					allowEmpty={true}
				/>
				{secondLang && (
					<Note
						text={descriptionLg2}
						title={D2.codeDescription}
						alone={false}
						allowEmpty={true}
					/>
				)}
			</Row>
		</>
	);
};
