import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderConfirmation({ setOrderPhase }) {
	const [ , , resetOrder ] = useOrderDetails();
	const [ orderNumber, setOrderNumber ] = useState(null);

	useEffect(() => {
		axios
			.post(`http://localhost:3030/order`)
			.then((response) => {
				setOrderNumber(response.data.orderNumber);
			})
			.catch((error) => {
				console.log('Error!!!!!', error);
			});
	}, []);

	function handleClick() {
		resetOrder();
		setOrderPhase('entry');
	}

	if (orderNumber) {
		return (
			<div>
				<h1>Thank you!</h1>
				<p>Your order number is {orderNumber}</p>
				<Button variant="primary" onClick={handleClick}>
					New Order
				</Button>
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
}
