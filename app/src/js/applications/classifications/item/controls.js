import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'bauhaus-library';
import { goBack } from 'bauhaus-library/src/utils/redirection';
import D from 'js/i18n';

class ItemControls extends Component {
	static propTypes = {
		classificationId: PropTypes.string.isRequired,
		itemId: PropTypes.string.isRequired,
		version: PropTypes.string.isRequired,
	};

	render() {
		const { classificationId, itemId, version } = this.props;
		const cancel = [
			goBack(
				this.props,
				`/classifications/classification/${classificationId}/items`
			),
			D.btnReturn,
		];
		const compare =
			!version || version <= 1
				? null
				: [
						`/classifications/classification/${classificationId}/item/${itemId}/compare`,
						D.btnCompare,
				  ];
		const btns = [cancel, compare];

		return (
			<div className="row btn-line action-toolbar">
				{btns.map((btn, i) => {
					if (!btn) return null;
					const [action, label] = btn;
					return btn && <Button key={label} action={action} label={label} />;
				})}
			</div>
		);
	}
}

export default withRouter(ItemControls);