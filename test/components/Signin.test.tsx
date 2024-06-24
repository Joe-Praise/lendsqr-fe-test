// import SignIn from '../../src/pages/sign-in';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { BrowserRouter } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useMutation } from 'react-query';

// const mockedNavigate = vi.fn();

// vi.mock('react-router-dom', async (importOriginal) => {
// 	const actual: any = await importOriginal();
// 	return {
// 		...actual,
// 		useNavigate: () => mockedNavigate,
// 	};
// });

// // Mock the useMutation hook
// const mockMutate = vi.fn();

// vi.mock('react-query', async (importOriginal) => {
// 	const actual: any = await importOriginal();
// 	return {
// 		...actual,
// 		useMutation: vi.fn(),
// 		QueryClient: vi.fn(),
// 	};
// });
// // Mock the auth queries
// vi.mock('../../src/services/queries/auth', async (importOriginal) => {
// 	const actual: any = await importOriginal();
// 	return {
// 		...actual,
// 		login: () => ({
// 			mutate: mockMutate,
// 			isLoading: false,
// 		}),
// 	};
// });

// describe('SignIn Page', () => {
// 	const mockMutate = vi.fn();
// 	const queryClient = new QueryClient();

// 	afterEach(() => {
// 		vi.clearAllMocks();
// 	});

// 	it('renders the sign-in form', () => {
// 		render(
// 			<QueryClientProvider client={queryClient}>
// 				<SignIn />
// 			</QueryClientProvider>,
// 			{ wrapper: BrowserRouter }
// 		);

// 		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
// 		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
// 		expect(screen.getByText(/log in/i)).toBeInTheDocument();
// 	});

// 	it('should show validation errors for empty email and password', async () => {
// 		render(
// 			<QueryClientProvider client={queryClient}>
// 				<SignIn />
// 			</QueryClientProvider>,
// 			{ wrapper: BrowserRouter }
// 		);

// 		const submitButton = screen.getByRole('button', { name: /Log in/i });
// 		fireEvent.click(submitButton);

// 		expect(
// 			await screen.findByText(/Please enter your email address/i)
// 		).toBeInTheDocument();
// 		expect(
// 			await screen.findByText(/Please enter your password/i)
// 		).toBeInTheDocument();
// 	});

// 	it('should show validation error for invalid email format', async () => {
// 		render(
// 			<QueryClientProvider client={queryClient}>
// 				<SignIn />
// 			</QueryClientProvider>,
// 			{ wrapper: BrowserRouter }
// 		);

// 		const emailInput = screen.getByPlaceholderText(/Email/i);
// 		fireEvent.focus(emailInput);
// 		fireEvent.blur(emailInput);

// 		await waitFor(() => {
// 			expect(
// 				screen.getByText(/Please enter your email address/i)
// 			).toBeInTheDocument();
// 		});
// 	});

// 	it('should show validation error for invalid email format', async () => {
// 		render(
// 			<QueryClientProvider client={queryClient}>
// 				<SignIn />
// 			</QueryClientProvider>,
// 			{ wrapper: BrowserRouter }
// 		);

// 		const emailInput = screen.getByPlaceholderText(/Email/i);
// 		fireEvent.focus(emailInput);
// 		fireEvent.blur(emailInput);

// 		await waitFor(() => {
// 			expect(
// 				screen.getByText(/Please enter your email address/i)
// 			).toBeInTheDocument();
// 		});
// 	});

// 	it('calls the mutate function with form values when the form is submitted', async () => {
// 		render(
// 			<QueryClientProvider client={queryClient}>
// 				<SignIn />
// 			</QueryClientProvider>,
// 			{ wrapper: BrowserRouter }
// 		);

// 		fireEvent.change(screen.getByPlaceholderText(/email/i), {
// 			target: { value: 'user@example.com' },
// 		});
// 		fireEvent.change(screen.getByPlaceholderText(/password/i), {
// 			target: { value: 'password123' },
// 		});

// 		fireEvent.click(screen.getByText(/log in/i));

// 		await waitFor(() => {
// 			expect(mockMutate).toHaveBeenCalled();
// 			expect(mockMutate).toHaveBeenCalledWith({
// 				url: expect.stringContaining('/login'),
// 				body: {
// 					email: 'user@example.com',
// 					password: 'password123',
// 				},
// 				auth: false,
// 			});
// 		});
// 	});
// });

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../../src/pages/sign-in';

// Mock the useNavigate hook
const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
	const actual: any = await importOriginal();
	return {
		...actual,
		useNavigate: () => mockedNavigate,
	};
});

// Mock the useMutation hook
const mockMutate = vi.fn();

vi.mock('react-query', async (importOriginal) => {
	const actual: any = await importOriginal();
	return {
		...actual,
		useMutation: vi.fn().mockImplementation(() => ({
			mutate: mockMutate,
			isLoading: false,
		})),
		QueryClient: actual.QueryClient,
		QueryClientProvider: actual.QueryClientProvider,
	};
});

// Mock the auth queries
vi.mock('../../src/services/queries/auth', async (importOriginal) => {
	const actual: any = await importOriginal();
	return {
		...actual,
		login: () => ({
			mutate: mockMutate,
			isLoading: false,
		}),
	};
});

describe('SignIn Page', () => {
	const queryClient = new QueryClient();

	const MockRender = () => {
		return (
			<QueryClientProvider client={queryClient}>
				<SignIn />
			</QueryClientProvider>
		);
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders the sign-in form', () => {
		render(<MockRender />, { wrapper: BrowserRouter });

		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
		expect(screen.getByText(/log in/i)).toBeInTheDocument();
	});

	it('should show validation errors for empty email and password', async () => {
		render(<MockRender />, { wrapper: BrowserRouter });

		const submitButton = screen.getByRole('button', { name: /Log in/i });
		fireEvent.click(submitButton);

		expect(
			await screen.findByText(/Please enter your email address/i)
		).toBeInTheDocument();
		expect(
			await screen.findByText(/Please enter your password/i)
		).toBeInTheDocument();
	});

	it('should show validation error for invalid email format', async () => {
		render(<MockRender />, { wrapper: BrowserRouter });

		const emailInput = screen.getByPlaceholderText(/Email/i);
		fireEvent.focus(emailInput);
		fireEvent.blur(emailInput);

		await waitFor(() => {
			expect(
				screen.getByText(/Please enter your email address/i)
			).toBeInTheDocument();
		});
	});

	it('calls the mutate function with form values when the form is submitted', async () => {
		render(<MockRender />, { wrapper: BrowserRouter });

		fireEvent.change(screen.getByPlaceholderText(/email/i), {
			target: { value: 'user@example.com' },
		});
		fireEvent.change(screen.getByPlaceholderText(/password/i), {
			target: { value: 'password123' },
		});

		fireEvent.click(screen.getByText(/log in/i));

		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalled();
			expect(mockMutate).toHaveBeenCalledWith({
				url: expect.stringContaining('/login'),
				body: {
					email: 'user@example.com',
					password: 'password123',
				},
				auth: false,
			});
		});
	});
});
