import React, { useState, useCallback, useEffect } from 'react';
import { ErrorBloc, LabelRequired, Select, AbstractButton, ActionToolbar, SaveButton, NewButton, DeleteButton } from '@inseefr/wilco';
import PropTypes from 'prop-types';
import { Stores } from 'bauhaus-utilities';
import { validateCode } from '../../utils';
import D, { D1, D2 } from '../../i18n/build-dictionary';
import './edit.scss';

/**
 * TODO:
 * Ne pas perdre le state du tree
 * Reinitialiser le formulaire après la validation d'une action
 * Ne pas pouvoir associer un code à un parent pour lequel il est deja un descendant
 * Validation - Eviter d'avoir deux codes avec le meme code
 * - Gérer le DragnDrop
 */
const DumbCodeDetailEdit = ({
	code: initialCode,
	codes,
	serverSideError,
	deleteCode,
	deleteCodeWithChildren,
	updateCode,
	createCode}) => {

	const [code, setCode] = useState({});
	useEffect(() => {
		setCode({ ...initialCode });
	}, [initialCode]);
	const [parents, setParents] = useState(code.parents);

	const handleChange = useCallback(
		(e) => {
			const { name, value } = e.target;
			setCode({
				...code,
				[name]: value,
			});
		},
		[code]
	);

	const codesOptions = codes
		.map((code) => {
			return {
				label: code.code + ' - ' + code.labelLg1,
				value: code.code,
			};
		})
		.concat({ label: '', value: '' });

	const { field, message } = validateCode(code);
	console.log(code)
	return (
		<React.Fragment>
			{message && <ErrorBloc error={message} />}
			{serverSideError && <ErrorBloc error={serverSideError} />}
			<form>
				<div className="row">
					<div className="col-md-12 form-group">
						<LabelRequired htmlFor="parents">{D.parentCodeTitle}</LabelRequired>
						<Select
							className="form-control"
							placeholder={D.parentCodeTitle}
							value={codesOptions.filter(option => code.parents?.find(p => p === option.value))}

							options={codesOptions}
							onChange={(parents) => {
								setCode({
									...code,
									parents: parents?.map(({ value }) => value) || []
								});
							}}
							multi
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 form-group">
						<LabelRequired htmlFor="code">{D.idTitle}</LabelRequired>
						<input
							type="text"
							className="form-control"
							id="code"
							name="code"
							value={code.code}
							onChange={handleChange}
							disabled={initialCode?.code !== ''}
							aria-invalid={field === 'code'}
						/>
					</div>
				</div>
				<div className="row">
					<div className={`col-md-6 form-group`}>
						<LabelRequired htmlFor="labelLg1">{D1.codeLabel}</LabelRequired>
						<input
							type="text"
							className="form-control"
							id="labelLg1"
							name="labelLg1"
							onChange={handleChange}
							value={code.labelLg1}
							aria-invalid={field === 'labelLg1'}
						/>
					</div>
					<div className="col-md-6 form-group">
						<LabelRequired htmlFor="labelLg2">{D2.codeLabel}</LabelRequired>
						<input
							type="text"
							className="form-control"
							id="labelLg2"
							name="labelLg2"
							value={code.labelLg2}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6 form-group">
						<label htmlFor="descriptionLg2">{D1.descriptionTitle}</label>
						<input
							type="text"
							value={code.descriptionLg1}
							className="form-control"
							id="descriptionLg1"
							name="descriptionLg1"
							onChange={handleChange}
						/>
					</div>
					<div className="col-md-6 form-group">
						<label htmlFor="descriptionLg2">{D2.descriptionTitle}</label>
						<input
							type="text"
							value={code.descriptionLg2}
							className="form-control"
							id="descriptionLg2"
							name="descriptionLg2"
							onChange={handleChange}
						/>
					</div>
				</div>
			</form>
			<ActionToolbar>
				<button type="button" disabled={message} onClick={() => updateCode(code)} className="btn wilco-btn btn-lg col-md-12">
					<span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span><span>{D.btnSave}</span>
				</button>
				<button type="button" disabled={!code.code} onClick={() => createCode(code)} className="btn wilco-btn btn-lg col-md-12">
					<span className="glyphicon glyphicon-plus" aria-hidden="true"></span><span> {D.btnCreate}</span>
				</button>
				<button type="button" disabled={!code.code} onClick={() => deleteCode(code)} className="btn wilco-btn btn-lg col-md-12">
					<span className="glyphicon glyphicon-trash" aria-hidden="true"></span><span> {D.btnDelete}</span>
				</button>
				<button type="button" icon="trash" disabled={!code.code} onClick={() => deleteCodeWithChildren(code)} className="btn wilco-btn btn-lg col-md-12">
					<span className="glyphicon glyphicon-trash" aria-hidden="true"></span><span> {D.btnDeleteWithChildren }</span>
				</button>
			</ActionToolbar>
		</React.Fragment>
	);
};

DumbCodeDetailEdit.propTypes = {
	code: PropTypes.object,
	secondLang: PropTypes.bool,
};

export const CodeDetailEdit =
	Stores.DisseminationStatus.withDisseminationStatusListOptions(
		DumbCodeDetailEdit
	);
