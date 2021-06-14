import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('initial conditions', () => {
	render(<SummaryForm />);

	const button = screen.getByRole('button', { name: /confirm order/i });
	expect(button).toBeDisabled();

	const checkBox = screen.getByRole('checkbox', { name: /terms and conditions/i });
	expect(checkBox).not.toBeChecked();
});

test('Checkbox enables button when checked, disables when unchecked', () => {
	render(<SummaryForm />);

	const button = screen.getByRole('button', { name: /confirm order/i });
	const checkBox = screen.getByRole('checkbox', { name: /terms and conditions/i });

	userEvent.click(checkBox);
	expect(checkBox).toBeChecked();
	expect(button).toBeEnabled();

	userEvent.click(checkBox);
	expect(checkBox).not.toBeChecked();
	expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
	render(<SummaryForm />);
	// initially hidden
	const hiddenPopOver = screen.queryByText(/no ice cream will actually be delivered/i);
	expect(hiddenPopOver).not.toBeInTheDocument();
	// appears when mouseover
	const tnc = screen.getByText(/terms and conditions/i);
	userEvent.hover(tnc);
	const popOver = screen.queryByText(/no ice cream will actually be delivered/i);
	expect(popOver).toBeInTheDocument();
	// disappears on mouseout
	userEvent.unhover(tnc);
	await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i));
});
