export function formatAmount(amount: number): string {
	const formatter = new Intl.NumberFormat('en-US', {
		// style: 'currency',
		// currency: 'NGN',
		minimumFractionDigits: 0,
	});

	return formatter.format(amount);
}
