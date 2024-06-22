// import { formatAmount } from '../../lib/utils';
import CountUp from 'react-countup';
const InfoCard = ({
	imgURL,
	title,
	total,
}: {
	imgURL: string;
	title: string;
	total: number;
}) => {
	return (
		<div className='info-card__container'>
			<figure className='info-card__img--container'>
				<img src={imgURL} alt={`${title} icon`} />
			</figure>
			<p className='info-card__title'>{title}</p>
			<p className='info-card__total'>
				<CountUp
					duration={2.75}
					decimals={0}
					decimal=','
					// prefix='$'
					start={total / 1.1}
					end={total}
					preserveValue={true}
				/>
			</p>
			{/* <p className='info-card__total'>{formatAmount(total)}</p> */}
		</div>
	);
};

export default InfoCard;
