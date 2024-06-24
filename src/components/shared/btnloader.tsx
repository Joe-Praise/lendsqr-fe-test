import { ReactNode } from 'react';

const BtnLoader = ({ children }: { children: ReactNode }) => {
	return (
		<div className='dot-spinner'>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			{children}
		</div>
	);
};

export default BtnLoader;
