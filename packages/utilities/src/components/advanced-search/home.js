import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { PageTitle, Pagination } from '@inseefr/wilco';
import AdvancedSearchControls from '../advanced-search/controls';
import NumberResult from '../number-result';
const AdvancedSearchList = ({
	title,
	backUrl,
	children,
	data,
	initializeState,
}) => {
	const [askForReturn, askForReturnChange] = useState(false);

	if (askForReturn) return <Redirect to={backUrl} push />;

	return (
		<div>
			<div className="container">
				<PageTitle title={title} />
				<AdvancedSearchControls
					onClickReturn={() => {
						askForReturnChange(true);
					}}
					initializeState={initializeState}
				/>
				{children}
				<div className="text-center">
					<div>
						<h4>
							<NumberResult results={data} />
						</h4>
					</div>
					<div>
						<Pagination itemEls={data} itemsPerPage="10" />
					</div>
				</div>
			</div>
		</div>
	);
};

AdvancedSearchList.propTypes = {
	data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AdvancedSearchList;