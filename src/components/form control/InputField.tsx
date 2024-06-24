import React, { useState } from 'react';
import { RenderIf } from '../shared';
// import { Eye, EyeOff } from '../svg';

interface IProps extends React.HTMLProps<HTMLInputElement> {
	type?: React.HTMLInputTypeAttribute;
	errors?: any;
	touched?: any;
	className?: string;
}

const InputField = (props: IProps) => {
	const {
		name = 'name',
		id,
		errors = {},
		touched = {},
		className,
		label,
		...restProps
	} = props;

	const hasError = (errors[name] && touched[name]) || false;

	const [show, setShow] = useState(false);

	return (
		<div
			className={`app__form--field ${hasError ? 'has_error' : ''} ${
				className || ''
			}`}
		>
			<div className='position-relative'>
				<RenderIf condition={!!label}>
					<label htmlFor={id}>{label}</label>
				</RenderIf>

				<div className=''>
					<input
						{...{
							...restProps,
							type: show ? 'text' : restProps.type,
							id,
							name,
						}}
					/>

					{restProps.type === 'password' && (
						<span
							onClick={() => setShow((prev) => !prev)}
							className='reveal cursor-pointer'
						>
							{show ? <p>HIDE</p> : <p>SHOW</p>}
						</span>
					)}
				</div>
			</div>
			<RenderIf condition={hasError}>
				<div>
					<p className='app__form--field-error'>{errors[name]}</p>
				</div>
			</RenderIf>
		</div>
	);
};

export default InputField;
