const express = require('express');

let app = express();

app.use('/static', express.static('public'));

const form = require('./form-handling');
app.use('/form', form);

app.listen(9090, () => console.log("Listening on port 9090"));