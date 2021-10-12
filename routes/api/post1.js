const express = require('express');
const router = express.Router();
const retrv1 = require('./recordretrv1')

router.get('/', async (req,res) => {
    console.log("req recieved");
    res.send("Call Post method to send purchase data...");
})
router.post('/', async (req,res) => {
    retrv1((data) => {
        console.log("in post... objarrlength :" + data[0].custid);
        res.status(200).send(data);
    })

});


module.exports = router;