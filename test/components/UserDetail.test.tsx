// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import { Mock, vi } from 'vitest';
// import Page from '../../src/pages/users/user';
// import * as queries from '../../src/services/queries/users';
// import * as helper from '../../src/services/helper';
// import Loader from '../../components/shared/loader';

// // Mock dependencies
// vi.mock('react-router-dom', async () => ({
// 	...((await vi.importActual('react-router-dom')) as object),
// 	useNavigate: vi.fn(),
// 	useParams: () => ({ id: '1' }),
// }));

// vi.mock('../../services/queries/users', () => ({
// 	readOne: vi.fn(),
// }));

// vi.mock('../../services/helper', () => ({
// 	getLocalStorage: vi.fn(),
// }));

// vi.mock('../../components/shared/loader', () => ({
// 	__esModule: true,
// 	default: () => <div>Loading...</div>,
// }));

// vi.mock('../../components/form control', () => ({
// 	Button: ({
// 		value,
// 		onClick,
// 		className,
// 	}: {
// 		value: any;
// 		onClick: () => void;
// 		className: string;
// 	}) => (
// 		<button className={className} onClick={onClick}>
// 			{value}
// 		</button>
// 	),
// }));

// describe('Page Component', () => {
// 	beforeEach(() => {
// 		vi.clearAllMocks();
// 	});

// 	test('renders loader during loading state', () => {
// 		(queries.readOne as Mock).mockReturnValue({ isLoading: true });
// 		(helper.getLocalStorage as Mock).mockReturnValue(null);

// 		render(
// 			<MemoryRouter initialEntries={['/user/1']}>
// 				<Routes>
// 					<Route path='/user/:id' element={<Page />} />
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		expect(screen.getByText('Loading...')).toBeInTheDocument();
// 	});

// 	test('renders "User Not Found" when no user data is available', async () => {
// 		(queries.readOne as vi.Mock).mockReturnValue({ isLoading: false });
// 		(helper.getLocalStorage as vi.Mock).mockReturnValue(null);

// 		render(
// 			<MemoryRouter initialEntries={['/user/1']}>
// 				<Routes>
// 					<Route path='/user/:id' element={<Page />} />
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			expect(screen.getByText('User Not Found...')).toBeInTheDocument();
// 		});
// 	});

// 	test('renders user details correctly', async () => {
// 		(queries.readOne as vi.Mock).mockReturnValue({ isLoading: false });
// 		const userData = {
// 			full_name: 'John Doe',
// 			code: '1234',
// 			tier: 2,
// 			monthly_income: '50000',
// 			acc_number: '5678',
// 			bank: 'Bank Name',
// 			phone_number: '123-456-7890',
// 			email_address: 'john.doe@example.com',
// 			bvn: '12345678901',
// 			gender: 'Male',
// 			marital_status: 'Single',
// 			children: 'None',
// 			type_of_residence: 'Apartment',
// 			degree: 'Bachelor',
// 			employment_status: 'Employed',
// 			sector_of_employment: 'Tech',
// 			duration_of_employment: '2 years',
// 			office_email: 'john.doe@office.com',
// 			loan_repayment: '5000',
// 			twitter_handle: '@johndoe',
// 			facebook_handle: 'john.doe',
// 			instagram_handle: '@john.doe',
// 			guarantor_full_name: 'Jane Doe',
// 			guarantor_phone_number: '098-765-4321',
// 			guarantor_email_address: 'jane.doe@example.com',
// 			guarantor_relationship: 'Sister',
// 			guarantor2_full_name: 'Jack Doe',
// 			guarantor2_phone_number: '098-765-4322',
// 			guarantor2_email_address: 'jack.doe@example.com',
// 			guarantor2_relationship: 'Brother',
// 		};
// 		(helper.getLocalStorage as vi.Mock).mockReturnValue(userData);

// 		render(
// 			<MemoryRouter initialEntries={['/user/1']}>
// 				<Routes>
// 					<Route path='/user/:id' element={<Page />} />
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			expect(screen.getByText('John Doe')).toBeInTheDocument();
// 			expect(screen.getByText('1234')).toBeInTheDocument();
// 			expect(screen.getAllByAltText('user placeholder avi')).toHaveLength(1);
// 			expect(screen.getAllByAltText('star fill icon')).toHaveLength(2);
// 			expect(screen.getAllByAltText('star no fill icon')).toHaveLength(1);
// 			expect(screen.getByText('₦50,000')).toBeInTheDocument();
// 			expect(screen.getByText('5678')).toBeInTheDocument();
// 			expect(screen.getByText('Bank Name')).toBeInTheDocument();
// 			expect(screen.getByText('123-456-7890')).toBeInTheDocument();
// 			expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
// 			expect(screen.getByText('12345678901')).toBeInTheDocument();
// 			expect(screen.getByText('Male')).toBeInTheDocument();
// 			expect(screen.getByText('Single')).toBeInTheDocument();
// 			expect(screen.getByText('None')).toBeInTheDocument();
// 			expect(screen.getByText('Apartment')).toBeInTheDocument();
// 			expect(screen.getByText('Bachelor')).toBeInTheDocument();
// 			expect(screen.getByText('Employed')).toBeInTheDocument();
// 			expect(screen.getByText('Tech')).toBeInTheDocument();
// 			expect(screen.getByText('2 years')).toBeInTheDocument();
// 			expect(screen.getByText('john.doe@office.com')).toBeInTheDocument();
// 			expect(screen.getByText('₦50,000 - ₦500,000')).toBeInTheDocument();
// 			expect(screen.getByText('5000')).toBeInTheDocument();
// 			expect(screen.getByText('@johndoe')).toBeInTheDocument();
// 			expect(screen.getByText('john.doe')).toBeInTheDocument();
// 			expect(screen.getByText('@john.doe')).toBeInTheDocument();
// 			expect(screen.getByText('Jane Doe')).toBeInTheDocument();
// 			expect(screen.getByText('098-765-4321')).toBeInTheDocument();
// 			expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument();
// 			expect(screen.getByText('Sister')).toBeInTheDocument();
// 			expect(screen.getByText('Jack Doe')).toBeInTheDocument();
// 			expect(screen.getByText('098-765-4322')).toBeInTheDocument();
// 			expect(screen.getByText('jack.doe@example.com')).toBeInTheDocument();
// 			expect(screen.getByText('Brother')).toBeInTheDocument();
// 		});
// 	});

// 	test('handles tab switching correctly', async () => {
// 		(queries.readOne as vi.Mock).mockReturnValue({ isLoading: false });
// 		const userData = {
// 			full_name: 'John Doe',
// 			code: '1234',
// 			tier: 2,
// 			monthly_income: '50000',
// 			acc_number: '5678',
// 			bank: 'Bank Name',
// 			phone_number: '123-456-7890',
// 			email_address: 'john.doe@example.com',
// 			bvn: '12345678901',
// 			gender: 'Male',
// 			marital_status: 'Single',
// 			children: 'None',
// 			type_of_residence: 'Apartment',
// 			degree: 'Bachelor',
// 			employment_status: 'Employed',
// 			sector_of_employment: 'Tech',
// 			duration_of_employment: '2 years',
// 			office_email: 'john.doe@office.com',
// 			loan_repayment: '5000',
// 			twitter_handle: '@johndoe',
// 			facebook_handle: 'john.doe',
// 			instagram_handle: '@john.doe',
// 			guarantor_full_name: 'Jane Doe',
// 			guarantor_phone_number: '098-765-4321',
// 			guarantor_email_address: 'jane.doe@example.com',
// 			guarantor_relationship: 'Sister',
// 			guarantor2_full_name: 'Jack Doe',
// 			guarantor2_phone_number: '098-765-4322',
// 			guarantor2_email_address: 'jack.doe@example.com',
// 			guarantor2_relationship: 'Brother',
// 		};
// 		(helper.getLocalStorage as vi.Mock).mockReturnValue(userData);

// 		render(
// 			<MemoryRouter initialEntries={['/user/1']}>
// 				<Routes>
// 					<Route path='/user/:id' element={<Page />} />
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			expect(screen.getByText('John Doe')).toBeInTheDocument();
// 		});

// 		const tabButton = screen.getByText('Documents');
// 		fireEvent.click(tabButton);

// 		await waitFor(() => {
// 			expect(tabButton).toHaveClass(
// 				'user-details__header--tab-container__active'
// 			);
// 		});
// 	});
// });
