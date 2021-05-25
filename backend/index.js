const express = require('express');
const path = require('path');
const shortid = require('shortid');
const Razorpay = require('razorpay');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors("http://localhost:3000"));

const razorpay = new Razorpay({
	key_id: 'rzp_test_TX74ra0jdm8bWW',
	key_secret: '4bViRmAx5Aq6ndIp1X4yk4io'
})

app.get('/logo.svg', (req, res) => {
	res.sendFile(path.join(__dirname, 'logo.svg'))
})

// app.post('/verification', (req, res) => {
// 	// do a validation
// 	const secret = '12345678'

// 	console.log(req.body)

// 	const crypto = require('crypto')

// 	const shasum = crypto.createHmac('sha256', secret)
// 	shasum.update(JSON.stringify(req.body))
// 	const digest = shasum.digest('hex')

// 	console.log(digest, req.headers['x-razorpay-signature'])

// 	if (digest === req.headers['x-razorpay-signature']) {
// 		console.log('request is legit')
// 		// process it
// 		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
// 	} else {
// 		// pass it
// 	}
// 	res.json({ status: 'ok' })
// })

app.post('/razorpay', async (req, res) => {
	// console.log(res,"rrrrrrrrrrrrrrrrrrrrrrrrrrr");
	console.log(req.body.amount,"rrr");
	// var amt = req.body.
	const payment_capture = 1
	const amount = 11
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		// console.log(response, 'response111111111111')
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

app.listen(4242, () => {
	console.log('Listening on 4242')
})
