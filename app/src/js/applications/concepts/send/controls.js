import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
	goBack,
	Button,
	ErrorBloc,
	ActionToolbar,
	ReturnButton,
} from '@inseefr/wilco';
import D from 'js/i18n';

function SendControls(props) {
	const { isRecipientValid, subject, message, sendMessage } = props;

	const hasSubject = Boolean(subject);
	const hasMessage = Boolean(message);
	let warning;
	let disabled;
	if (!isRecipientValid) {
		warning = D.invalidMailAdress;
		disabled = true;
	} else if (!hasSubject) {
		warning = D.emptyMailObject;
		disabled = true;
	} else if (!hasMessage) {
		warning = D.emptyMailBody;
	}
	const location = props.history.location.pathname;
	const nextLocation = location.replace('/send', '');

	return (
		<>
			<ActionToolbar>
				<ReturnButton action={goBack(props, nextLocation)} />
				<Button label={D.btnSend} action={sendMessage} disabled={disabled} />
			</ActionToolbar>
			<ErrorBloc error={warning} />
		</>
	);
}

SendControls.propTypes = {
	isRecipientValid: PropTypes.bool.isRequired,
	subject: PropTypes.string,
	message: PropTypes.string,
	sendMessage: PropTypes.func.isRequired,
};

export default withRouter(SendControls);
