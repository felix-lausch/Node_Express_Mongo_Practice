const express = require("express")
const auth = require("../middleware/auth")
const { Customer, validate } = require("../models/customer")
const router = express.Router();

router.get("/", async (req, res) => {
    const customers = await Customer.find().sort("name")
    res.send(customers)
})

router.post("/", auth, async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = new Customer({ 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone    
    })
    await customer.save()
    res.send(customer)
})

module.exports = router