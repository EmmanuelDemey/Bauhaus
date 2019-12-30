import React from 'react';
import { ExplanatoryNote } from 'js/applications/shared/explanatory-note';
import D, { D2 } from 'js/i18n';

export default ({
	notes: {
		scopeNoteLg1,
		scopeNoteLg2,
		changeNoteLg1,
		changeNoteLg2,
		descriptionLg1,
		descriptionLg2,
	},
	secondLang,
	langs: { lg1, lg2 },
}) => (
	<div>
		<span>
			{descriptionLg1 && (
				<div className="row">
					<ExplanatoryNote
						text={descriptionLg1}
						title={D.classificationsDescription}
						lang={lg1}
						alone={!secondLang}
					/>
					{secondLang && (
						<ExplanatoryNote
							text={descriptionLg2}
							title={D2.classificationsDescription}
							lang={lg2}
							alone={false}
						/>
					)}
				</div>
			)}
		</span>
		<span>
			{scopeNoteLg1 && (
				<div className="row">
					<ExplanatoryNote
						text={scopeNoteLg1}
						title={D.classificationsScopeNote}
						lang={lg1}
						alone={!secondLang}
					/>
					{secondLang && (
						<ExplanatoryNote
							text={scopeNoteLg2}
							title={D2.classificationsScopeNote}
							lang={lg2}
							alone={false}
						/>
					)}
				</div>
			)}
		</span>
		<span>
			{changeNoteLg1 && (
				<div className="row">
					<ExplanatoryNote
						text={changeNoteLg1}
						title={D.classificationsChangeNote()}
						lang={lg1}
						alone={!secondLang}
					/>
					{secondLang && (
						<ExplanatoryNote
							text={changeNoteLg2}
							title={D2.classificationsChangeNote()}
							lang={lg2}
							alone={false}
						/>
					)}
				</div>
			)}
		</span>
	</div>
);