import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

// const popover = (
//   <Popover id="popover-basic">
//     <Popover.Title as="h3">Popover right</Popover.Title>
//     <Popover.Content>
//       And here's some <strong>amazing</strong> content. It's very engaging.
//       right?
//     </Popover.Content>
//   </Popover>
// );

// const Example = () => (
//   <OverlayTrigger trigger="click" placement="right" overlay={popover}>
//     <Button variant="success">Click me to see</Button>
//   </OverlayTrigger>
// );
export default function SummaryForm() {
	const [ tcChecked, setTcChecked ] = useState(false);

	const popover = (
		<Popover id="popover-basic">
			<Popover.Content>No ice cream will actually be delivered</Popover.Content>
		</Popover>
	);

	const checkBoxLabel = (
		<span>
			I agree to
			<OverlayTrigger placement="right" overlay={popover}>
				<span style={{ color: 'blue' }}>Terms and Conditions</span>
			</OverlayTrigger>
		</span>
	);

	return (
		<Form>
			<Form.Group controlId="terms-and-conditions">
				<Form.Check
					type="checkbox"
					checked={tcChecked}
					onChange={(e) => setTcChecked(e.target.checked)}
					label={checkBoxLabel}
				/>
				<Button variant="primary" type="submit" disabled={!tcChecked}>
					Confirm Order
				</Button>
			</Form.Group>
		</Form>
	);
}
