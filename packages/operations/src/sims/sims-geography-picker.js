import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import D from '../i18n/build-dictionary';
import { Stores, Auth } from 'bauhaus-utilities';
import SlidingPanel from 'react-sliding-side-panel';
import SimsGeographyField from './sims-geography-field';

import './sims-geography-picker.scss';
import { SimsGeographyI18NLabel } from 'bauhaus-operations';

const SimsGeographyPicker = ({ onChange, value }) => {
	const geographiesOptions = useSelector(Stores.Geographies.getAllOptions);
	const [slidingModal, setSlidingModal] = useState(false);
	const openPanel = useCallback(() => {
		setSlidingModal(true);
	}, []);
	const onSave = useCallback(() => {
		setSlidingModal(false);
	}, []);
	const onCancel = useCallback(() => {
		setSlidingModal(false);
	}, []);
	const formatOptionLabel = (geography) => {
		return <SimsGeographyI18NLabel geography={geography} />;
	};

	return (
		<>
			<div className="bauhaus-sims-geography-picker">
				<div className="form-group">
					<ReactSelect
						value={geographiesOptions.find(
							({ value: gValue }) => gValue === value
						)}
						options={geographiesOptions}
						onChange={(e) => onChange(e ? e.value : '')}
						placeholder={''}
						searchable={true}
						noResultsText={D.noResult}
						isClearable={true}
						formatOptionLabel={formatOptionLabel}
					/>
				</div>

				<Auth.AuthGuard roles={[Auth.ADMIN]}>
					<button type="button" className="btn btn-default" onClick={openPanel}>
						{D.btnNew}
					</button>
				</Auth.AuthGuard>
			</div>
			<SlidingPanel type={'right'} isOpen={slidingModal} size={60} backdropClicked={() => setSlidingModal(false)}>
				<SimsGeographyField onCancel={onCancel} onSave={onSave} />
			</SlidingPanel>
		</>
	);
};

export default SimsGeographyPicker;
