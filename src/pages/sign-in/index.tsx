import { Formik } from 'formik';
import * as Yup from 'yup';
import SignInBannerSvg from '../../assets/auth/pablo-sign-in 1.svg';
import { Logo } from '../../components/svg';
import { Button, InputField } from '../../components/form control';
import queries from '../../services/queries/auth';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Please enter a valid email address')
		.required('Please enter your email address'),
	password: Yup.string().required('Please enter your password'),
});

const initialValues = {
	email: '',
	password: '',
};

const Page = () => {
	const { mutate, isLoading } = queries.login();

	// TODO: FIX UP ISLOADING TO ACTUAL STATE
	return (
		<section className='signin-container'>
			<div className='signin-container__banner--background'>
				<div className='signin-container__banner--wrapper'>
					<div className='signin__logo--Container'>
						<Logo width='174px' height='36px' />
					</div>
					<img src={SignInBannerSvg} />
				</div>
			</div>
			<div className='signin-container__form--wrapper'>
				<div className='app__login--header'>
					<h1>Welcome!</h1>
					<p>Enter details to login</p>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={mutate}
				>
					{(props) => {
						const {
							values,
							handleChange,
							handleBlur,
							handleSubmit,
							errors,
							touched,
						} = props;
						return (
							<form className='app__login-form' onSubmit={handleSubmit}>
								<div className='app__login_form__password'>
									<InputField
										name='email'
										type='email'
										id='email'
										placeholder='Email'
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										errors={errors}
										touched={touched}
									/>

									<InputField
										name='password'
										id='password'
										type='password'
										placeholder='Password'
										onChange={handleChange}
										onBlur={handleBlur}
										errors={errors}
										touched={touched}
									/>

									<p className='app__login-form--password__fgt'>
										Forgot Password?
									</p>
								</div>

								<Button
									isLoading={isLoading}
									value='Log in'
									type='submit'
									className='border-radius_8'
								/>
							</form>
						);
					}}
				</Formik>
			</div>
		</section>
	);
};

export default Page;
