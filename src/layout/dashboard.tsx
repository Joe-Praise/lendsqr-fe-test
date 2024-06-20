import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/sidebar';
import Header from '../components/dashboard/header';
import { useState } from 'react';

const DashboardLayout = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const handleToggleMenu = () => {
		setOpenMenu((prevState) => !prevState);
	};
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
