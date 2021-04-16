import reducerApp from './';
import * as A from 'js/actions/constants';
import { Stores } from 'bauhaus-utilities';

describe('getSecondLang', () => {
	it('should return the secondLang', () => {
		const input = {
			app: {
				secondLang: 'en',
			},
		};
		const output = 'en';
		expect(Stores.SecondLang.getSecondLang(input)).toEqual(output);
	});
});
describe('reducerApp', () => {
	test('failure action type', () => {
		const action = { type: 'XXX_FAILURE', payload: 'payload' };
		const result = reducerApp({ state: 'previous' }, action);
		expect(result).toEqual({ state: 'previous' });
	});

	test('action SAVE_SECOND_LANG', () => {
		const action = { type: Stores.SecondLang.SAVE_SECOND_LANG, payload: false };
		const result = reducerApp({ state: 'previous' }, action);
		expect(result).toEqual({ state: 'previous', secondLang: false });
	});

	test('action SAVE_USER_PROPS', () => {
		const action = { type: A.SAVE_USER_PROPS, payload: { name: 'user' } };
		const result = reducerApp(
			{
				state: 'previous',
				auth: {
					previous: true,
				},
			},
			action
		);
		expect(result).toEqual({
			state: 'previous',
			auth: {
				previous: true,
				user: {
					name: 'user',
				},
			},
		});
	});

	test('action CHECK_AUTH', () => {
		const action = { type: A.CHECK_AUTH, payload: 'toto' };
		const result = reducerApp(
			{ branch: 'previous', auth: { type: 'Oauth2' } },
			action
		);
		expect(result).toEqual({
			branch: 'previous',
			auth: { type: 'Oauth2', user: 'toto' },
		});
	});
});
