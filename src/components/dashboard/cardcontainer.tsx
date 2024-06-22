import { usersInfoCardDetails } from '../../constants';
import InfoCard from './infocard';

const CardContainer = () => {
	return (
		<div className='users__card--container'>
			{usersInfoCardDetails.map((details, index) => (
				<InfoCard key={`${details.title}__${index}_index}`} {...details} />
			))}
		</div>
	);
};

export default CardContainer;
