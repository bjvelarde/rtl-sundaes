import { rest } from 'msw';

export const handlers = [
	rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
		return res(
			ctx.json([
				{ name: 'Chocolate', imagePath: '/images/chocolate.png' },
				{ name: 'Vanilla', imagePath: '/images/vanilla.jpg' }
			])
		);
	}),
	rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
		return res(
			ctx.json([
				{ name: 'Cherries', imagePath: '/images/cherries.png' },
				{ name: 'M&Ms', imagePath: '/images/m-and-ms.jpg' },
				{ name: 'Hot fudge', imagePath: '/images/hot-fudge.jpg' }
			])
		);
	}),
	rest.post('http://localhost:3030/order', (req, res, ctx) => {
		return res(ctx.json({ orderNumber: 123455676 }));
	})
];
