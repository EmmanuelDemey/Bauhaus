import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import D from 'js/i18n';
import { rangeType } from 'js/utils/msd/';
import {
	Button,
	DuplicateButton,
	ErrorBloc,
	Note,
	ActionToolbar,
	ReturnButton,
} from '@inseefr/wilco';

import { PublicationFemale } from 'js/applications/operations/shared/status';

import {
	HTMLUtils,
	ValidationButton,
	CheckSecondLang,
	DateUtils,
} from 'bauhaus-utilities';
import DocumentsBloc from 'js/applications/operations/msd/documents/documents-bloc/index.js';
import {
	hasLabelLg2,
	shouldDisplayDuplicateButton,
	getParentUri,
} from 'js/applications/operations/msd/utils';
import { isLink, isDocument } from 'js/applications/operations/document/utils';
import {
	ADMIN,
	CNIS,
	INDICATOR_CONTRIBUTOR,
	SERIES_CONTRIBUTOR,
} from 'js/utils/auth/roles';
import Auth from 'js/utils/auth/components/auth';

const { RICH_TEXT, TEXT, DATE, CODE_LIST, ORGANIZATION } = rangeType;

export default function SimsVisualisation({
	metadataStructure,
	currentSection,
	codesLists,
	sims = {},
	secondLang,
	goBack,
	langs: { lg1, lg2 },
	organisations,
	publishSims,
}) {
	const shouldDisplayDuplicateButtonFlag = shouldDisplayDuplicateButton(sims);

	function displayInformation(msd, isSecondLang = false, currentSection = {}) {
		if (!msd.masLabelLg1) {
			return null;
		}
		return (
			!msd.isPresentational && (
				<>
					{currentSection.rangeType === TEXT &&
						currentSection[isSecondLang ? 'labelLg2' : 'labelLg1']}
					{currentSection.value &&
						currentSection.rangeType === DATE &&
						DateUtils.stringToDate(currentSection.value)}
					{currentSection.rangeType === RICH_TEXT && (
						<>
							{HTMLUtils.renderMarkdownElement(
								currentSection[isSecondLang ? 'labelLg2' : 'labelLg1']
							)}

							{currentSection.documents && (
								<>
									<DocumentsBloc
										documents={currentSection.documents.filter(isDocument)}
										localPrefix={isSecondLang ? 'Lg2' : 'Lg1'}
										objectType="documents"
									/>
									<DocumentsBloc
										documents={currentSection.documents.filter(isLink)}
										localPrefix={isSecondLang ? 'Lg2' : 'Lg1'}
										objectType="links"
									/>
								</>
							)}
						</>
					)}
					{currentSection.rangeType === CODE_LIST &&
						codesLists[currentSection.codeList] && (
							<span>
								{
									codesLists[currentSection.codeList].codes.find(
										code => code.code === currentSection.value
									).labelLg1
								}
							</span>
						)}
					{currentSection.rangeType === ORGANIZATION && (
						<span>
							{
								(
									organisations.find(
										orga => orga.id === currentSection.value
									) || {}
								).label
							}
						</span>
					)}
				</>
			)
		);
	}

	function MSDInformations({ msd, firstLevel = false }) {
		return (
			<>
				{firstLevel && shouldDisplayTitleForPrimaryItem(msd) && (
					<h3 className="col-md-12 sims-title">
						{msd.idMas} - {msd.masLabelBasedOnCurrentLang}
					</h3>
				)}
				<div className="row" key={msd.idMas} id={msd.idMas}>
					{!msd.isPresentational && (
						<Note
							title={`${msd.idMas} - ${msd.masLabelLg1}`}
							text={displayInformation(msd, false, sims.rubrics[msd.idMas])}
							alone={!(hasLabelLg2(msd) && secondLang)}
							lang={lg1}
						/>
					)}
					{!msd.isPresentational && hasLabelLg2(msd) && secondLang && (
						<Note
							title={`${msd.idMas} - ${msd.masLabelLg2}`}
							text={displayInformation(msd, true, sims.rubrics[msd.idMas])}
							lang={lg2}
						/>
					)}
				</div>
				{Object.values(msd.children).map(child => (
					<MSDInformations key={child.idMas} msd={child} />
				))}
			</>
		);
	}

	/*
	 * The publication button should be enabled only if RICH_TEXT value do not
	 * have unsupported styles like STRIKETHROUGH, color or background color
	 */
	const publicationDisabled = HTMLUtils.containUnsupportedStyles(
		Object.keys(sims.rubrics)
			.filter(key => sims.rubrics[key].rangeType === RICH_TEXT)
			.reduce((acc, key) => {
				return {
					...acc,
					[`${key}_labelLg1`]: sims.rubrics[key].labelLg1,
					[`${key}_labelLg2`]: sims.rubrics[key].labelLg2,
				};
			}, {})
	);

	const [serverSideError, setServerSideError] = useState();
	const publish = useCallback(
		object => {
			publishSims(object, err => {
				if (err) {
					setServerSideError(err);
				}
			});
		},
		[publishSims]
	);

	const CONTRIBUTOR = sims.idIndicator
		? INDICATOR_CONTRIBUTOR
		: SERIES_CONTRIBUTOR;
	return (
		<>
			<ActionToolbar>
				<ReturnButton action={() => goBack(getParentUri(sims))} />
				<Auth
					roles={[ADMIN, CONTRIBUTOR]}
					complementaryCheck={shouldDisplayDuplicateButtonFlag}
				>
					<DuplicateButton
						action={`/operations/sims/${sims.id}/duplicate`}
						col={3}
					/>
				</Auth>
				<Auth roles={[ADMIN, CONTRIBUTOR]}>
					<ValidationButton
						object={sims}
						callback={object => publish(object)}
						disabled={publicationDisabled}
					/>
				</Auth>
				<Auth roles={[ADMIN, CNIS, INDICATOR_CONTRIBUTOR, SERIES_CONTRIBUTOR]}>
					<Button
						action={`/operations/sims/${sims.id}/modify`}
						label={
							<>
								<span
									className="glyphicon glyphicon-floppy-disk"
									aria-hidden="true"
								/>
								<span> {D.btnUpdate}</span>
							</>
						}
					/>
				</Auth>
			</ActionToolbar>

			<ErrorBloc error={serverSideError} />

			<CheckSecondLang />

			<div className="row">
				<Note
					text={
						<ul>
							<li>
								{D.simsStatus} : <PublicationFemale object={sims} />
							</li>
						</ul>
					}
					title={D.globalInformationsTitle}
					alone={true}
				/>
			</div>

			{Object.values(metadataStructure).map(msd => {
				if (currentSection && msd.idMas !== currentSection) {
					return null;
				}
				return <MSDInformations key={msd.idMas} msd={msd} firstLevel={true} />;
			})}
		</>
	);
}
function shouldDisplayTitleForPrimaryItem(msd) {
	return (
		msd.isPresentational ||
		(!msd.isPresentational && Object.keys(msd.children).length === 0)
	);
}
SimsVisualisation.propTypes = {
	metadataStructure: PropTypes.object.isRequired,
	currentSection: PropTypes.string,
	codesLists: PropTypes.object.isRequired,
	sims: PropTypes.object.isRequired,
	goBack: PropTypes.func,
};
