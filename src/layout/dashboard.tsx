import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/sidebar';
import Header from '../components/dashboard/header';
import { useEffect, useState } from 'react';
import { getSessionStorage } from '../services/helper';
import { routes } from '../navigation';

const DashboardLayout = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const navigate = useNavigate();
	const handleToggleMenu = () => {
		setOpenMenu((prevState) => !prevState);
	};

	const user = getSessionStorage('email');

	useEffect(() => {
		if (!user) {
			navigate(routes.signIn.path);
		}
	}, [user, navigate]);

	if (!user) return null;

	return (
		<main className='lendsqr-dashboard__layout'>
			<Header onSetSideBar={handleToggleMenu} />
			<div className='lendsqr-dashboard__layout--body'>
				<Sidebar onOpenMenu={openMenu} />
				<Outlet />
			</div>
		</main>
	);
};

export default DashboardLayout;
