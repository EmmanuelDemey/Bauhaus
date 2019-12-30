import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'bauhaus-library';
import { goBack } from 'bauhaus-library/src/utils/redirection';
import D from 'js/i18n';

function CorrespondenceControls(props) {
	const { correspondenceId } = props;

	return (
		<div className="row btn-line action-toolbar">
			<Button
				action={goBack(
					props,
					`/classifications/correspondence/${correspondenceId}`
				)}
				label={D.btnReturn}
			/>
		</div>
	);
}

export default withRouter(CorrespondenceControls);