import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, beforeEach, vi } from 'vitest';
import Page from '../../src/pages/users';
import mock from '../../src/services/queries/users/mock.json';

const queryClient = new QueryClient();

describe('Page Component', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const MockRender = () => {
		return (
			<QueryClientProvider client={queryClient}>
				<Page />
			</QueryClientProvider>
		);
	};
	beforeEach(() => {
		vi.mock('../../services/queries/users', () => ({
			read: vi.fn().mockReturnValue({
				data: mock,
				isLoading: false,
			}),
		}));
	});

	// Mock the read function from queries module

	const headers = [
		{ id: 1, name: 'Organization', role: 'columnheader' },
		{ id: 2, name: 'Username', role: 'columnheader' },
		{ id: 3, name: 'Email', role: 'columnheader' },
		{ id: 1, name: 'Phone Number', role: 'columnheader' },
		{ id: 2, name: 'Date Joined', role: 'columnheader' },
		{ id: 3, name: 'Status', role: 'columnheader' },
	];

	type HeadersType = ReturnType<() => (typeof headers)[0]>;

	const checkHeader = (array: HeadersType[]) => {
		array.forEach((item) => {
			expect(
				screen.getByRole(item.role, { name: item.name })
			).toBeInTheDocument();
		});
	};

	const placeholders = [
		{
			placeholder: 'User',
			value: 'testValue',
		},
		{
			placeholder: 'Email',
			value: 'testValue',
		},
		{
			placeholder: 'Date',
			value: 'testValue',
		},
		{
			placeholder: 'Phone Number',
			value: 'testValue',
		},
	];

	type placeholderType = ReturnType<() => (typeof placeholders)[0]>;

	const handleCheckFilters = (array: placeholderType[]) => {
		array.forEach(async (item) => {
			const usernameInput = screen.getByPlaceholderText(item.placeholder);
			fireEvent.change(usernameInput, { target: { value: item.value } });

			const filterButton = screen.getByText('Filter');
			fireEvent.click(filterButton);

			await waitFor(() => {
				const rows = screen.getAllByRole('row');
				expect(rows).toHaveLength(2); // 1 header row + 1 data row (filtered result)
			});
		});
	};

	it('renders the table headers correctly', () => {
		render(<MockRender />, { wrapper: BrowserRouter });
		checkHeader(headers);
	});

	it('renders the correct number of rows', async () => {
		render(<MockRender />, { wrapper: BrowserRouter });

		await waitFor(() => {
			const rows = screen.getAllByRole('row');
			expect(rows).toHaveLength(11); // 1 header row + 10 data rows
		});
	});

	it('validate all filters', async () => {
		render(<MockRender />, { wrapper: BrowserRouter });

		handleCheckFilters(placeholders);
	});
});
