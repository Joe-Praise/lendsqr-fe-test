import { Navigate } from 'react-router-dom';
import { routes } from '../navigation';

// Right now this is not doing anything. But it will be useful in situations where we have protected routes where we navigate on load to the protected routes and redirect user to login/signin page when user token can't be found.
export default function Page() {
	return <Navigate to={routes.dashboard.users.path} />;
}
