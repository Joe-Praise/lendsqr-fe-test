import { Link } from 'react-router-dom';
import { Logo } from '../svg';
import searchIcon from '../../assets/dashboard/search.svg';
import alertIcon from '../../assets/dashboard/alert.svg';
import chevrondown from '../../assets/dashboard/chevrondown.svg';
import ProfilePicture from '../../assets/dashboard/image/profilePic.png';
import { MenuIcon } from 'lucide-react';

const Header = ({ onSetSideBar }: { onSetSideBar: () => void }) => {
	return (
		<header className='header'>
			<div className='header__logo'>
				<Link to={'/users'}>
					<Logo className='dashboard__logo' />
				</Link>
			</div>

			<div className='header__search'>
				<form action='' className='header__search--form'>
					<input
						type='search'
						name=''
						id=''
						className=''
						placeholder='search for anything'
					/>
					<button type='button'>
						<img src={searchIcon} alt='search icon' />
					</button>
				</form>
			</div>

			<div className='header__profile--wrapper'>
				<p className='header__profile--docs'>Docs</p>

				<div className='header__profile--alert'>
					<img src={alertIcon} alt='alert icon' />
				</div>

				<div className='header__profile--container'>
					<div className='header__profile__pic'>
						<img src={ProfilePicture} alt='profile' />
					</div>
					<p>Ayodeji</p>
					<img src={chevrondown} alt='Chevrondown icon' />
				</div>
				<div className='header__menu--container'>
					<button type='button' className='' onClick={onSetSideBar}>
						<MenuIcon />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
