import { useNavigate, useParams } from 'react-router-dom';
import { Spacer } from '../../components/shared';
import backarrow from '../../assets/dashboard/back arrow.svg';
import { Button } from '../../components/form control';
import avi from '../../assets/dashboard/image/user avi.png';
import { useState } from 'react';
import queries from '../../services/queries/users';
import { formatAmount } from '../../lib/utils';
import Loader from '../../components/shared/loader';
import { getLocalStorage } from '../../services/helper';
import { UsersType } from '../../services/queries/users/types';
import starfill from '../../assets/dashboard/star-fill.svg';
import starnofill from '../../assets/dashboard/star-no_fill.svg';

const Page = () => {
	const { id } = useParams<{ id: string }>();
	const idString: string = id || '';
	const navigate = useNavigate();
	const star = [1, 2, 3];
	const userDetailsTab = [
		{
			id: 1,
			label: 'General Details',
		},
		{
			id: 2,
			label: 'Documents',
		},
		{
			id: 3,
			label: 'Bank Details',
		},
		{
			id: 4,
			label: 'Loans',
		},
		{
			id: 5,
			label: 'Savings',
		},
		{
			id: 6,
			label: 'App and System',
		},
	];
	const { isLoading } = queries.readOne(idString);

	const data = getLocalStorage('userDetail') as UsersType;

	const [activeTab, setActiveTab] = useState(1);

	const handleDisplay = () => {
		if (isLoading) {
			return <Loader className='h-full' />;
		}

		if (!isLoading && !data) {
			return (
				<div>
					<Spacer>
						<button
							onClick={() => navigate(-1)}
							className='user-details__go-back--btn'
						>
							<img src={backarrow} alt='back arrow icon' />
							<span>Back to users</span>
						</button>
					</Spacer>
					<h3 className='loading__container h-full'>User Not Found...</h3>;
				</div>
			);
		}
		return (
			<>
				<Spacer className=''>
					<button
						onClick={() => navigate(-1)}
						className='user-details__go-back--btn'
					>
						<img src={backarrow} alt='back arrow icon' />
						<span>Back to users</span>
					</button>
					<Spacer
						element={'div'}
						className='user-details__action--container spacer_20'
					>
						<h2>User Details</h2>
						<div className='user-details__action--btn-container'>
							<Button value='Blacklist User' className='blacklist' />
							<Button value='Activate User' className='activate' />
						</div>
					</Spacer>
				</Spacer>

				<Spacer className='margin_top_50 white__bg'>
					<div className='user-details__header'>
						<figure className='user-details__header--img-container'>
							<img src={avi} alt='user placeholder avi' />
						</figure>

						<div className='user-details__header--name-container'>
							<h3>{data?.full_name}</h3>
							<p className='spacer_10'>{data?.code}</p>
						</div>

						<div className='user-details__header--tier-container'>
							<p>User's Tier</p>
							<p className='spacer_10'>
								{star.map((_, index) => {
									return (
										<img
											key={index + '_key'}
											src={index < data.tier ? starfill : starnofill}
										/>
									);
								})}
							</p>
						</div>

						<div className='user-details__header--finance-container'>
							<h3>{formatAmount(Number(data?.monthly_income))}</h3>
							<p className='spacer_10'>
								<span>{data?.acc_number}</span>/<span>{data?.bank}</span>
							</p>
						</div>
					</div>

					<div className='user-details__header--tab-container'>
						{userDetailsTab.map((tab, index) => {
							const isActive = activeTab === tab.id;
							return (
								<Button
									value={tab.label}
									key={`${tab.label}__key__${index}`}
									onClick={() => setActiveTab(tab.id)}
									className={
										isActive
											? 'user-details__header--tab-container__active'
											: ''
									}
								/>
							);
						})}
					</div>
				</Spacer>

				<Spacer className='margin_top_30 white__bg'>
					<div className='user-details__info--wrapper underline'>
						<h4>Personal Information</h4>
						<div className='user-details__info--container underline'>
							<div className='user-details__info--container__personal-card'>
								<p className='uppercase'>Full name</p>
								<p className='margin_top_5 info__bold'>{data?.full_name}</p>
							</div>
							<div className='user-details__info--container__personal-card'>
								<p className='uppercase'>Phone Number</p>
								<p className='margin_top_5 info__bold'>{data?.phone_number}</p>
							</div>
							<div className='user-details__info--container__personal-card'>
								<p className='uppercase'>Email Address</p>
								<p className='margin_top_5 info__bold'>{data?.email_address}</p>
							</div>
							<div className='user-details__info--container__personal-card'>
								<p className='uppercase'>BVN</p>
								<p className='margin_top_5 info__bold'>{data?.bvn}</p>
							</div>
							<div className='user-details__info--container__personal-card'>
								<p className='uppercase'>Gender</p>
								<p className='margin_top_5 info__bold'>{data?.gender}</p>
							</div>
							<div className='user-details__info--container__personal-card'>
								<p className='uppercase'>Marital Status</p>
								<p className='margin_top_5 info__bold'>
									{data?.marital_status}
								</p>
							</div>
							<div className='user-details__info--container__personal-card'>
								<p className='uppercase'>Children</p>
								<p className='margin_top_5 info__bold'>{data?.children}</p>
							</div>
							<div className='user-details__info--container__personal-card'>
								<p className='uppercase'>Type of Residence</p>
								<p className='margin_top_5 info__bold'>
									{data?.type_of_residence}
								</p>
							</div>
						</div>
					</div>

					<div className='user-details__info--wrapper underline'>
						<h4>Education and Employment</h4>
						<div className='user-details__info--container'>
							<div className='user-details__info--container__education-card'>
								<p className='uppercase'>level of education</p>
								<p className='margin_top_5 info__bold'>{data?.degree}</p>
							</div>
							<div className='user-details__info--container__education-card'>
								<p className='uppercase'>employment status</p>
								<p className='margin_top_5 info__bold'>
									{data?.employment_status}
								</p>
							</div>
							<div className='user-details__info--container__education-card'>
								<p className='uppercase'>sector of employment</p>
								<p className='margin_top_5 info__bold'>
									{data?.sector_of_employment}
								</p>
							</div>
							<div className='user-details__info--container__education-card'>
								<p className='uppercase'>duration of employment</p>
								<p className='margin_top_5 info__bold'>
									{data?.duration_of_employment}
								</p>
							</div>
							<div className='user-details__info--container__education-card'>
								<p className='uppercase'>office email</p>
								<p className='margin_top_5 info__bold'>{data?.office_email}</p>
							</div>
							<div className='user-details__info--container__education-card'>
								<p className='uppercase'>monthly income</p>
								<p className='margin_top_5 info__bold'>
									₦{formatAmount(data?.monthly_income)} - ₦500,000
								</p>
							</div>
							<div className='user-details__info--container__education-card'>
								<p className='uppercase'>loan repayment</p>
								<p className='margin_top_5 info__bold'>
									{data?.loan_repayment}
								</p>
							</div>
						</div>
					</div>

					<div className='user-details__info--wrapper underline'>
						<h4>Socials</h4>
						<div className='user-details__info--container'>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>Twitter</p>
								<p className='margin_top_5 info__bold'>
									{data?.twitter_handle}
								</p>
							</div>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>Facebook</p>
								<p className='margin_top_5 info__bold'>
									{data?.facebook_handle}
								</p>
							</div>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>Instagram</p>
								<p className='margin_top_5 info__bold'>
									{data?.instagram_handle}
								</p>
							</div>
						</div>
					</div>

					<div className='user-details__info--wrapper underline'>
						<h4>Guarantor</h4>
						<div className='user-details__info--container'>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>Full name</p>
								<p className='margin_top_5 info__bold'>
									{data?.guarantor_full_name}
								</p>
							</div>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>Phone Number</p>
								<p className='margin_top_5 info__bold'>{data?.phone_number}</p>
							</div>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>Email Address</p>
								<p className='margin_top_5 info__bold'>
									{data?.guarantor_email_address}
								</p>
							</div>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>relationship</p>
								<p className='margin_top_5 info__bold'>
									{data?.guarantor_relationship}
								</p>
							</div>
						</div>
					</div>

					<div className='user-details__info--wrapper '>
						<h4 className='margin_top_10'></h4>
						<div className='user-details__info--container'>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>Full name</p>
								<p className='margin_top_5 info__bold'>
									{data?.guarantor2_full_name}
								</p>
							</div>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>Phone Number</p>
								<p className='margin_top_5 info__bold'>
									{data?.guarantor2_phone_number}
								</p>
							</div>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>Email Address</p>
								<p className='margin_top_5 info__bold'>
									{data?.guarantor2_email_address}
								</p>
							</div>
							<div className='user-details__info--container__card'>
								<p className='uppercase'>relationship</p>
								<p className='margin_top_5 info__bold'>
									{data?.guarantor2_relationship}
								</p>
							</div>
						</div>
					</div>
				</Spacer>
			</>
		);
	};

	return (
		<div className='dashboard__main--content scrollbar'>{handleDisplay()}</div>
	);
};

export default Page;
