import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import '@inseefr/wilco/dist/index.css';

import 'bauhaus-utilities/dist/index.css';
import './styles.css';

const requireAll = (requireContext) =>
	requireContext.keys().map(requireContext);

const loadStories = () =>
	requireAll(require.context('../src', true, /stories\.jsx?$/));

configure(loadStories, module);
