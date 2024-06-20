import CardContainer from '../../components/dashboard/cardcontainer';

const Page = () => {
	return (
		<div className='dashboard__main--content scrollbar'>
			<h2>Users</h2>

			<div>
				<CardContainer />
			</div>
		</div>
	);
};

export default Page;
