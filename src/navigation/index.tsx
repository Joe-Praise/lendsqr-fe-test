import { createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '../layout/dashboard';
import SignIn from '../pages/sign-in';
import Users from '../pages/users';
import UserDetails from '../pages/users/user';

export const routes = {
	entry: {
		path: '/',
	},
	signIn: {
		path: '/sign-in',
	},
	dashboard: {
		path: '/dashboard',
		users: {
			path: '/dashboard/users',
		},
		userDetails: {
			path: 'dashboard/users/:id',
		},
	},
};

export const router = createBrowserRouter([
	{
		path: '/',
		element: <DashboardLayout />,
		children: [
			{
				path: routes.dashboard.users.path,
				element: <Users />,
			},
			{
				path: routes.dashboard.userDetails.path,
				element: <UserDetails />,
			},
		],
	},
	{
		path: routes.signIn.path,
		element: <SignIn />,
	},
]);
