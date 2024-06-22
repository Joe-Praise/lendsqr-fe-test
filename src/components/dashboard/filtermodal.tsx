import { ReactNode } from 'react';

const FilterModal = ({
	className,
	children,
	openMenu,
}: {
	className?: string;
	children: ReactNode;
	openMenu: boolean;
}) => {
	return (
		<div
			className={`${className || ''} modal--container ${
				openMenu ? 'modal--container__active' : 'modal--container__inactive'
			}`}
			aria-hidden={`${openMenu ? false : true}`}
			aria-label='users table filter modal'
		>
			{children}
		</div>
	);
};

export default FilterModal;
