import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderSummary({ setOrderPhase }) {
	const [ orderDetails ] = useOrderDetails();

	const scoopArray = Array.from(orderDetails.scoops.entries());
	const scoopList = scoopArray.map(([ key, value ]) => (
		<li key={key}>
			{value} {key}
		</li>
	));

	const toppingArray = Array.from(orderDetails.toppings.entries());
	const toppingList = toppingArray.map(([ key, value ]) => <li key={key}>{key}</li>);

	return (
		<div>
			<h1>Order Summary</h1>
			<h2>Scoops: {orderDetails.totals['scoops']}</h2>
			<ul>{scoopList}</ul>
			<h2>Toppings: {orderDetails.totals['toppings']}</h2>
			<ul>{toppingList}</ul>
			<h2>Total: {orderDetails.totals['grandTotal']}</h2>
			<SummaryForm setOrderPhase={setOrderPhase} />
		</div>
	);
}
