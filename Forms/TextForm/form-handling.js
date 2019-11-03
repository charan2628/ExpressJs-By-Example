const express = require('express');
/**
 * BODY PARSER
 * Provides parsers for
 * 
 * Json (application/json), 
 * Raw (application/octet-stream),
 * Text body (text/plain), 
 * URL encoded (application/x-www-from-urlencoded)
 */
const bodyParser = require('body-parser');

let router = express.Router();
/**
 * URL ENCODED PARSER TO HANDLE FORM DATA
 * limiting to 9 parameters
 */
router.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 10
}));

router.post('/', function(req, res) {
    res.send(req.body);
});

module.exports = router;