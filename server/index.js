'use strict';
//modules imported here
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
var yandex_speech = require('yandex-speech');
var fs = require('fs');
const app = express();

const port = process.env.PORT || 4568;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//routes
app.post('/input', (req, res) => {
    const fileName = `${uuid()}.mp3`;
    const file = `public/${fileName}`;
    const text = req.body.text;

    yandex_speech.TTS({
        text,
        file,
    }, () => {
        console.log('Done');
        const message = 'Text SuccessFully Sent And Converted To Speech';
        res.json({ fileName, message })
    });
});

app.listen(port, () => {
    console.log(`server started at port ${port}`);
})