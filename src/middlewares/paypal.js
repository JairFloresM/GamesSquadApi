const paypal = require('@paypal/checkout-server-sdk');

const { db } = require('../database');
const jwt = require('jsonwebtoken');



paypalOrder = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decode = jwt.verify(token, process.env.JWT);
        const id = decode.id;

        let precioTotal = 0

        const carritoRef = db.collection('carrito');
        const carritoSnap = await carritoRef.where('usuario', '==', id).where('estado', '==', false).get()
        const carritoJuego = carritoSnap.docs.map(doc => { return { id: doc.id, ...doc.data() } });

        carritoJuego.map(async (juego) => {
            precioTotal += parseFloat(juego.precio)
        })

        let clientId = "Abuk2r61kD7NRK3SH2IN45QLu3e_v02fWguRBSG-l9xRn1uuqN5j2P5yClpTKD7vnYJHNr5rwc3sBkTY";
        let clientSecret = "EPbwdoe8k3tByfIqPXgDKGaf4XAJ9eF5UW96YIMyjdfY3BzElunNrzfLZiVm83ceQ9EYvcZ7kuTofhAK";
        // let environment = new paypal.core.SandboxEnvironment(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
        let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
        let client = new paypal.core.PayPalHttpClient(environment);

        // precioTotal = (precioTotal * 0.07)
        let request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: precioTotal
                    }
                }
            ]
        });

        const response = await client.execute(request);
        console.log(response);
        console.log(5);

        res.json({ id: response.result.id });

    } catch (error) {
        return res.status(401).json({ message: 'Orden cancelada' })
    }
}

module.exports = {
    paypalOrder
}

