import { Provider } from 'react-redux';
import Root from './packages/application/router';
import configureStore from './packages/redux/configure-store';
import { I18NContext, BackToTop, getLang } from '@inseefr/wilco';
import D from './packages/deprecated-locales';
import { ApplicationTitle } from './packages/components';
import { AppContext } from './packages/application/app-context';
import '@inseefr/wilco/dist/index.css';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import loadDevTools from './dev-tools/load';
import * as Sentry from '@sentry/react';

import './packages//styles/main.scss';
import { GeneralApi } from './packages//sdk/general-api';

Sentry.init({
	dsn: 'https://57eb7cf936ad4c9198267ec7cd0031aa@o364590.ingest.sentry.io/4505557438169088',
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
});

const Error = () => {
	return (
		<div>
			<div className="container">
				<h1 className="text-center">{D.errorTitle}</h1>
				<p className="text-center">{D.errorBody}</p>
			</div>
		</div>
	);
};

GeneralApi.getInit()
	.then(
		(res: any) => (res.ok ? res.json() : Promise.reject(res.statusText)),
		(err: any) => {
			renderApp(Error, {}, { home: true });
			return Promise.reject(err.toString());
		}
	)
	.then((res: any) => renderApp(Root, res));

const renderApp = (Component: any, initState: any, props?: any) => {
	const { authType: type, lg1, lg2, version, ...properties } = initState;
	const store = configureStore({
		app: {
			auth: { type, user: { roles: [], stamp: '' } },
			lg1,
			lg2,
			version,
			properties,
			secondLang: false,
			error: false,
		},
	});

	loadDevTools(store, () => {
		document.querySelector('html')!.setAttribute('lang', getLang());

		const container = document.getElementById('root');
		const root = createRoot(container!);
		root.render(
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<AppContext.Provider value={{ lg1, lg2 }}>
						<I18NContext.Provider value={D}>
							<ApplicationTitle />
							<main>
								<Component {...props} />
								<BackToTop />
							</main>
						</I18NContext.Provider>
					</AppContext.Provider>
				</Provider>
			</QueryClientProvider>
		);
	});
};
