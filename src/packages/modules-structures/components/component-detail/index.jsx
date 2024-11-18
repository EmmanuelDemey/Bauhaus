import { useCallback, useState } from 'react';
import { DumbComponentDetailEdit } from './edit';
import { ComponentDetailView } from './view';
import ComponentTitle from './title';
import { useSecondLang } from '@utils/hooks/second-lang';

export const ComponentDetail = (props) => {
	const [secondLang] = useSecondLang();

	const [mode, setMode] = useState(
		!props.component?.labelLg1 ? 'EDIT' : 'VIEW',
	);

	const handleViewUpdate = useCallback(() => setMode('EDIT'), []);
	const handleEditUpdate = useCallback(
		(component) => {
			props.handleSave(component);
			setMode('VIEW');
		},
		[props],
	);
	const handleEditBack = useCallback(
		() => (!props.component.labelLg1 ? props.handleBack() : setMode('VIEW')),
		[props],
	);

	return (
		<div className="container">
			{mode === 'VIEW' && (
				<>
					<ComponentTitle component={props.component} secondLang={secondLang} />

					<ComponentDetailView
						{...props}
						secondLang={secondLang}
						handleUpdate={handleViewUpdate}
						handleBack={props.handleBack}
						updatable={!props.readOnly}
					/>
				</>
			)}
			{mode === 'EDIT' && (
				<DumbComponentDetailEdit
					{...props}
					handleSave={handleEditUpdate}
					handleBack={handleEditBack}
				/>
			)}
		</div>
	);
};
