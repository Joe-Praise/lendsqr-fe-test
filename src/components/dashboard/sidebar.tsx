import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks } from '../../constants';
import { Fragment } from 'react/jsx-runtime';

const Sidebar = ({ onOpenMenu }: { onOpenMenu: boolean }) => {
	const { pathname } = useLocation();

	return (
		<div className={`sidebar__wrapper scrollbar ${onOpenMenu ? 'active' : ''}`}>
			<nav className='sidebar__nav'>
				{sidebarLinks.map((group, index) => {
					return (
						<Fragment key={`${group.header}_group${index}`}>
							{group.header && group.children.length > 0 && (
								<p className='sidebar__nav--group-header'>{group.header}</p>
							)}
							{group.children &&
								group.children.length > 0 &&
								group.children.map((item) => {
									const isActive =
										pathname === item.route ||
										pathname.startsWith(`${item.route}/`);
									return (
										<Link
											to={item.route}
											key={`${item.label}_link`}
											className={`sidebar__nav--link ${
												isActive ? ' active' : ''
											}`}
										>
											<div>
												<img src={item.imgURL} alt={item.label} />
											</div>
											<p>{item.label}</p>
											{item.chevron && item.chevron.length > 0 && (
												<div>
													<img src={item.chevron} alt={item.chevron} />
												</div>
											)}
										</Link>
									);
								})}
						</Fragment>
					);
				})}
			</nav>
		</div>
	);
};

export default Sidebar;
