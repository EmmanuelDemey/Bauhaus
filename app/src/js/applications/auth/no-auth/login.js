import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from '@inseefr/wilco';
import { checkAuth } from 'js/actions/app';
import {
	ADMIN,
	INDICATOR_CONTRIBUTOR,
	SERIES_CONTRIBUTOR,
} from 'bauhaus-utilities/src/auth/roles';

class LoginNoAuth extends Component {
	componentWillMount() {
		this.props.checkAuth({
			stamp: 'XXXXXX',
			roles: [ADMIN, SERIES_CONTRIBUTOR, INDICATOR_CONTRIBUTOR],
		});
	}
	render() {
		return <Loading textType="authentification" />;
	}
}

const mapDispatchToProps = {
	checkAuth,
};

export default connect(null, mapDispatchToProps)(LoginNoAuth);
