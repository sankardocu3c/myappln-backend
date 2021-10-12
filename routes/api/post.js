const express = require('express');
const router = express.Router();
const retrv = require('./recordretrv')

router.get('/', async (req,res) => {
    console.log("req recieved");
    res.send("Call Post method to send customer data...");
})
router.post('/', async (req,res) => {
    retrv((data) => {
        console.log("in post... objarrlength :" + data[0].custid);
        res.status(200).send(data);
    })

});


module.exports = router;