import React from 'react';
import { render } from '@testing-library/react';
import Outline from './index';
import { MemoryRouter } from 'react-router-dom';
jest.mock('js/applications/operations/msd/utils');

const metadataStructureOpened = {
	idMas: '1',
	masLabelLg1: 'masLabelLg1',
	children: { '1': { idMas: '2', children: [] } },
};

const metadataStructureClosed = {
	idMas: '2',
	masLabelLg1: 'masLabelLg1',
	children: { '1': { idMas: '1', children: [] } },
};

describe('Outline', () => {
	it('should displayed a collapsed block', () => {
		const { container } = render(
			<Outline
				metadataStructure={metadataStructureClosed}
				storeCollapseState
			/>,
			{ wrapper: MemoryRouter }
		);
		expect(container.querySelectorAll('.glyphicon-chevron-down').length).toBe(
			1
		);
		expect(container.querySelectorAll('.msd__item').length).toBe(0);
	});

	it('should display a expanded block', () => {
		const { container } = render(
			<Outline
				metadataStructure={metadataStructureOpened}
				storeCollapseState
			/>,
			{ wrapper: MemoryRouter }
		);
		expect(container.querySelectorAll('.glyphicon-chevron-up').length).toBe(1);
		expect(container.querySelectorAll('.msd__item').length).toBe(1);
	});


	it('should not store the collapse status', () => {
		const { container } = render(
			<Outline metadataStructure={metadataStructureOpened} />,
			{ wrapper: MemoryRouter }
		);
		expect(container.querySelectorAll('.glyphicon-chevron-up').length).toBe(0);
		expect(container.querySelectorAll('.msd__item').length).toBe(0);
	});
});
