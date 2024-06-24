import { render, screen } from '@testing-library/react';
import DashboardLayout from '../../src/layout/dashboard';
import { getSessionStorage } from '../../src/services/helper';
import { Mock } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../../src/services/helper.ts', () => ({
	getSessionStorage: vi.fn(),
	getQueryKeys: vi.fn(),
}));

const mockedUseNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
	const actual: any = await importOriginal();
	return {
		...actual,
		useNavigate: () => mockedUseNavigate,
	};
});

describe('group', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should render dashboard when user is authenticated', () => {
		(getSessionStorage as Mock).mockReturnValue('user@example.com');
		render(
			<MemoryRouter initialEntries={['/dashboard']}>
				<Routes>
					<Route path='/dashboard' element={<DashboardLayout />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByRole('main')).toBeInTheDocument();
		expect(mockedUseNavigate).not.toHaveBeenCalled();
	});

	it('should redirect to sign in when user is not authenticated', () => {
		(getSessionStorage as Mock).mockReturnValue(null);

		render(
			<MemoryRouter initialEntries={['/dashboard']}>
				<Routes>
					<Route path='/dashboard' element={<DashboardLayout />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.queryByRole('main')).toBeNull();
		expect(mockedUseNavigate).toHaveBeenCalledWith('/sign-in');
	});
});
