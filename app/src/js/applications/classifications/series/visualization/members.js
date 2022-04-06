import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '@inseefr/wilco';
import { D1, D2 } from 'js/i18n';

export default ({ members, secondLang }) => {
	const membersLg1 = members.map((m, i) => (
		<li key={i}>
			<Link to={`/classifications/classification/${m.id}`}>{m.labelLg1}</Link>
		</li>
	));
	let membersLg2 = [];
	if (secondLang)
		membersLg2 = members.map((m, i) =>
			m.labelLg2 ? (
				<li key={i}>
					<Link to={`/classifications/classification/${m.id}`}>
						{m.labelLg2}
					</Link>
				</li>
			) : null
		);
	const isMembersLg2 = membersLg2.filter(m => m !== null).length !== 0;
	return (
		<div className="row">
			<Note title={D1.childrenClassifications} alone={!secondLang} text={
				<ul>{membersLg1}</ul>
			}/>
			{secondLang && isMembersLg2 && (
				<Note title={D2.childrenClassifications} alone={false} text={
					<ul>{membersLg2}</ul>
				}/>
			)}
		</div>
	);
};
