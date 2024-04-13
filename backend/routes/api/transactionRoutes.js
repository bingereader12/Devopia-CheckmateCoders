const express = require('express');
const router = express.Router();
const Transaction = require('../../models/transactions');

router.get('/inbound',auth, async (req, res) => {
    try{
        const outTrans = Transaction.find({ to: req.user.userId })
        res.status(200).json(outTrans);
    } catch(err){
        console.error("Error fetching transactions!", err);
        res.status(500).json({ message: "Error fetching transactions!" });
    }
});

router.get('/outbound',auth, async (req, res) => {
    try{
        const outTrans = Transaction.find({ from: req.user.userId })
        res.status(200).json(outTrans);
    } catch(err){
        console.error("Error fetching transactions!", err);
        res.status(500).json({ message: "Error fetching transactions!" });
    }
});

// router.post('/inbound',auth, async (req, res) => {
//     try{
//         const newTrans = {
//             paymentMethod: req.body.payMeth,
//             date: req.body.date,

//         }
//         const outTrans = Transaction.find({ from: req.user.userId })
//         res.status(200).json(outTrans);
//     } catch(err){
//         console.error("Error fetching transactions!", err);
//         res.status(500).json({ message: "Error fetching transactions!" });
//     }
// });