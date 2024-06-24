const Loader = ({ className }: { className?: string }) => {
	return (
		<div className={`loading__container ${className}`}>
			<div className='loader' data-testid='loader'>
				<div className='loader-square'></div>
				<div className='loader-square'></div>
				<div className='loader-square'></div>
				<div className='loader-square'></div>
				<div className='loader-square'></div>
				<div className='loader-square'></div>
				<div className='loader-square'></div>
			</div>
		</div>
	);
};

export default Loader;
