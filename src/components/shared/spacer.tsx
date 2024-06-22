import { ElementType, ReactNode } from 'react';

const Spacer = ({
	children,
	element: Element = 'section',
	className,
}: {
	children: ReactNode;
	element?: ElementType;
	className?: string;
}) => {
	return <Element className={className}>{children}</Element>;
};

export default Spacer;
