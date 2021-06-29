import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
	//render app
	render(<App />);
	// add scoops and toppings
	const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '2');

	const cherriesCB = await screen.findByRole('checkbox', { name: 'Cherries' });
	userEvent.click(cherriesCB);

	// find and click order button
	const submitOrderButton = screen.getByRole('button', { name: /submit order/i });
	expect(submitOrderButton).toBeInTheDocument();
	userEvent.click(submitOrderButton);
	// check summary information based on order
	const summaryTitle = screen.getByRole('heading', { name: /order summary/i });
	expect(summaryTitle).toBeInTheDocument();
	const scoopsTotal = screen.getByRole('heading', { name: /^scoops: \$/i });
	expect(scoopsTotal).toHaveTextContent('4.00');
	const toppingsTotal = screen.getByRole('heading', { name: /^toppings: \$/i });
	expect(toppingsTotal).toHaveTextContent('1.50');
	const grandTotal = screen.getByRole('heading', { name: /^total: \$/i });
	expect(grandTotal).toHaveTextContent('5.50');

	expect(screen.getByText('2 Vanilla')).toBeInTheDocument();
	expect(screen.getByText('Cherries')).toBeInTheDocument();
	// accept tnc and click button to confirm order
	const summaryButton = screen.getByRole('button', { name: /confirm order/i });
	const summaryTnC = screen.getByRole('checkbox', { name: /terms and conditions/i });
	userEvent.click(summaryTnC);
	userEvent.click(summaryButton);
	// confirm order number on confirmation page
	// Expect "loading" to show
	const loading = screen.getByText(/loading/i);
	expect(loading).toBeInTheDocument();

	const confirmationTitle = await screen.findByRole('heading', { name: /thank you!/i });
	expect(confirmationTitle).toBeInTheDocument();

	// expect that loading has disappeared
	const notLoading = screen.queryByText('loading');
	expect(notLoading).not.toBeInTheDocument();

	const orderNumber = await screen.findByText(/order number/i);
	expect(orderNumber).toBeInTheDocument();
	// click "new order" button on confirmation page
	const newOrderButton = screen.getByRole('button', { name: /new order/i });
	userEvent.click(newOrderButton);
	// check that scoops and toppings subtotals have been reset
	const entryTitle = await screen.findByRole('heading', { name: /design your sundae!/i });
	expect(entryTitle).toBeInTheDocument();

	const newScoopsTotal = screen.getByText('Scoops total: $0.00');
	expect(newScoopsTotal).toBeInTheDocument();
	const newToppingsTotal = screen.getByText('Toppings total: $0.00');
	expect(newToppingsTotal).toBeInTheDocument();
	// do we need to await anything to avoid test errors?
	await screen.findByRole('spinbutton', { name: 'Vanilla' });
	await screen.findByRole('checkbox', { name: 'Cherries' });
});
