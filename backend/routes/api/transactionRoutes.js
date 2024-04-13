const express = require("express");
const router = express.Router();
const Transaction = require("../../models/transactions");
const auth = require( "../../middleware/auth");
router.get("/inbound", async (req, res) => {
  try {
    const outTrans = Transaction.find({ to: req.user.userId });
    res.status(200).json(outTrans);
  } catch (err) {
    console.error("Error fetching transactions!", err);
    res.status(500).json({ message: "Error fetching transactions!" });
  }
});

router.get("/outbound", async (req, res) => {
  try {
    const outTrans = Transaction.find({ from: req.user.userId });
    res.status(200).json(outTrans);
  } catch (err) {
    console.error("Error fetching transactions!", err);
    res.status(500).json({ message: "Error fetching transactions!" });
  }
});

router.post("/outbound", async (req, res) => {
  try {
    const newTrans = {
      paymentMethod: req.body.payMeth,
      date: req.body.date,
      from: req.user.userId,
      to: req.body.peerId,
      amount: req.body.amount,
    };
    const outTrans = Transaction.find({ from: req.user.userId });
    res.status(200).json(outTrans);
  } catch (err) {
    console.error("Error fetching transactions!", err);
    res.status(500).json({ message: "Error fetching transactions!" });
  }
});

router.post("/transactionDay", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { date } = req.body;
    // console.log(date)
    const allTransactions = await Transaction.find({ date });

    let inBoundAmount = 0;
    let outBoundAmount = 0;
    const allInbound = allTransactions.filter(
      (transaction) => transaction.to == userId
    );
    allInbound.forEach((transaction) => {
      inBoundAmount += transaction.amount;
    });

    const allOutBound = allTransactions.filter(
      (transaction) => transaction.from == userId
    );
    allOutBound.forEach((transaction) => {
      outBoundAmount += transaction.amount;
    });

    return res.status(200).json({ inBoundAmount, outBoundAmount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/transactionSevenDays", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { date, date1 } = req.body;
    // console.log(date)
    const allTransactions = await Transaction.find({ 
      date: {
        $gte: new Date(date), 
        $lt: new Date(date1)
    }
     });
    //  console.log(allTransactions)

    let inBoundAmount = 0;
    let outBoundAmount = 0;
    const allInbound = allTransactions.filter(
      (transaction) => transaction.to == userId
    );
    allInbound.forEach((transaction) => {
      inBoundAmount += transaction.amount;
    });

    const allOutBound = allTransactions.filter(
      (transaction) => transaction.from == userId
    );
    allOutBound.forEach((transaction) => {
      outBoundAmount += transaction.amount;
    });

    return res.status(200).json({ inBoundAmount, outBoundAmount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/outboundSevenDays",auth,async(req,res) => {
    try {
        // const outTrans = await Transaction.find({ from: req.user.userId });
        const outboundTrans = []
        for(let i=7;i>0;i--){
            var transTotal = 0;
            const date=new Date(Date.now() - 24*60*60*1000*(i-1))
            const date1=new Date(Date.now() - 24*60*60*1000*(i-2))
            const allTransactions = await Transaction.find({ 
                date: {
                  $gte: new Date(date), 
                  $lt: new Date(date1)
              }
               });
            allTransactions.filter((trans)=>{trans.from == req.user.userId})
            allTransactions.forEach((trans)=>{transTotal+=trans.amount})
            outboundTrans.push({name: date1, amt: transTotal})
        }

        res.status(200).json(outboundTrans);
    } catch (err) {
        console.error("Error fetching transactions!", err);
        res.status(500).json({ message: "Error fetching transactions!" });
    }
})

router.get("/cashTrans",auth,async(req,res)=>{
    try {
        const outTrans = await Transaction.find({ from: req.user.userId });
        const inTrans = await Transaction.find({ to: req.user.userId });
        var allTrans = []
        allTrans.push(...outTrans)
        allTrans.push(...inTrans)

        console.log(allTrans)

        var cashSum = 0
        var cashlessSum = 0
        allTrans.forEach((trans)=>{
            if(trans.paymentMethod == 'cash') cashSum+=trans.amount
            else cashlessSum+=trans.amount
        })

        res.status(200).json({cashSum,cashlessSum});
    } catch (err) {
        console.error("Error fetching transactions!", err);
        res.status(500).json({ message: "Error fetching transactions!" });
    }
})

module.exports = router;
