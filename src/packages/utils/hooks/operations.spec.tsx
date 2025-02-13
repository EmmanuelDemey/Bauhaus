import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { OperationsApi } from '@sdk/operations-api';

import { Operation } from '../../model/Operation';
import { useOperations } from './operations';

vi.mock('@sdk/operations-api');

const queryClient = new QueryClient();

const wrapper = ({ children }: any) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useSeries', () => {
	it('fetches and returns series data', async () => {
		const seriesMock: Operation[] = [
			{
				id: '1',
				label: 'Operation 1',
				iri: 'iri',
				altLabel: 'altLabel 1',
				seriesIri: 'seriesIri',
			} as Operation,
		];

		(OperationsApi.getOperationsList as any).mockResolvedValueOnce(seriesMock);

		const { result } = renderHook(() => useOperations(), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual(seriesMock);
		expect(OperationsApi.getOperationsList).toHaveBeenCalledTimes(1);
	});
});
