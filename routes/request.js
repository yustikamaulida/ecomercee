const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/provinces', (req, res) => {
    fetch('https://api.rajaongkir.com/starter/province', {
        headers: {
            'Content-Type': 'application/json',
            key: '71f085a8d8a588f354c2ccf67fe02937'
        },
    })
        .then(res => res.json())
        .then(dataJson => {
            if (dataJson.rajaongkir.status === 200) {
                res.status(200).json(dataJson)
            } else {
                res.status(400).json(dataJson.status.description)
            }
        });
})

router.get('/cities', (req, res) => {
    fetch('https://api.rajaongkir.com/starter/city', {
        headers: {
            'Content-Type': 'application/json',
            key: '71f085a8d8a588f354c2ccf67fe02937'
        },
    })
        .then(res => res.json())
        .then(dataJson => {
            if (dataJson.rajaongkir.status === 200) {
                res.status(200).json(dataJson)
            } else {
                res.status(400).json(dataJson.status.description)
            }
        });
})

router.post('/cost', (req, res) => {
    const data = req.body;

    fetch('https://api.rajaongkir.com/starter/cost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            key: '71f085a8d8a588f354c2ccf67fe02937'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(dataJson => res.status(200).json(dataJson));
})



module.exports = router;