import React from 'react';
import { render } from '@testing-library/react';
import Collection from './home';
import { empty } from 'js/utils/collections/general';
import { MemoryRouter } from 'react-router-dom';

describe('collection-edition-creation', () => {
	it('renders without crashing', () => {
		render(
			<Collection
				title=""
				general={empty()}
				members={[]}
				collectionList={[]}
				conceptList={[]}
				stampList={[]}
				save={() => console.log('save')}
				langs={{ lg1: 'fr', lg2: 'en' }}
			/>,
			{ wrapper: MemoryRouter }
		);
	});
});
