import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
	render(<Options optionType="scoops" />);

	//make sure total starts at $0.00
	const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
	expect(scoopsSubtotal).toHaveTextContent('0.00');

	//update vanilla scoops to 1 and check subtotal
	const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '1');
	expect(scoopsSubtotal).toHaveTextContent('2.00');

	//update chocolate scoops to 2 and check subtotal
	const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, '2');
	expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when toppings change', async () => {
	render(<Options optionType="toppings" />);

	//make sure total starts at $0.00
	const subtotal = screen.getByText('Toppings total: $', { exact: false });
	expect(subtotal).toHaveTextContent('0.00');

	//check cherries topping and check subtotal
	const cherriesCB = await screen.findByRole('checkbox', { name: 'Cherries' });
	userEvent.click(cherriesCB);
	expect(subtotal).toHaveTextContent('1.50');

	//check M&M topping and check subtotal
	const mmCB = await screen.findByRole('checkbox', { name: 'M&Ms' });
	userEvent.click(mmCB);
	expect(subtotal).toHaveTextContent('3.00');

	//check Hot fudge topping and check subtotal
	const hotFudgeCB = await screen.findByRole('checkbox', { name: 'Hot fudge' });
	userEvent.click(hotFudgeCB);
	expect(subtotal).toHaveTextContent('4.50');

	//uncheck M&M topping and check subtotal
	userEvent.click(mmCB);
	expect(subtotal).toHaveTextContent('3.00');
});

describe('grand total', () => {
	// test.only('grand total starts at $0.00', () => {
	// 	render(<OrderEntry />);

	// 	const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
	// 	expect(grandTotal).toHaveTextContent('0.00');
	// });
	test('grand total updates properly if scoop is added first', async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
		expect(grandTotal).toHaveTextContent('0.00');

		const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '2');
		expect(grandTotal).toHaveTextContent('4.00');

		const cherriesCB = await screen.findByRole('checkbox', { name: 'Cherries' });
		userEvent.click(cherriesCB);
		expect(grandTotal).toHaveTextContent('5.50');
	});
	test('grand total updates properly if topping is added first', async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
		const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
		const cherriesCB = await screen.findByRole('checkbox', { name: 'Cherries' });

		userEvent.click(cherriesCB);
		expect(grandTotal).toHaveTextContent('1.50');
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '1');
		expect(grandTotal).toHaveTextContent('3.50');
	});
	test('grand total updates properly if an item is removed', async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
		const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
		const cherriesCB = await screen.findByRole('checkbox', { name: 'Cherries' });

		userEvent.click(cherriesCB);
		expect(grandTotal).toHaveTextContent('1.50');
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '1');
		expect(grandTotal).toHaveTextContent('3.50');
		userEvent.click(cherriesCB);
		expect(grandTotal).toHaveTextContent('2.00');
	});
});
