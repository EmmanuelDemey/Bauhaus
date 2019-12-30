import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CancelButton, Button, ErrorBloc } from 'bauhaus-library';
import D from 'js/i18n';

class ConceptCreateControlLayout extends Component {
	render() {
		const { message, handleSave, saveEnabled, redirectCancel } = this.props;

		return (
			<>
				<div className="row btn-line action-toolbar">
					<CancelButton action={redirectCancel()} />

					<Button
						label={
							<>
								<span
									className="glyphicon glyphicon-floppy-disk"
									aria-hidden="true"
								/>
								<span> {D.btnSave}</span>
							</>
						}
						action={handleSave}
						disabled={!saveEnabled}
					/>
				</div>
				<ErrorBloc error={message} />
			</>
		);
	}
}

ConceptCreateControlLayout.propTypes = {
	message: PropTypes.string,
	saveEnabled: PropTypes.bool.isRequired,
	handleSave: PropTypes.func.isRequired,
	redirectCancel: PropTypes.func.isRequired,
};

export default withRouter(ConceptCreateControlLayout);