const express = require("express")
const { Customer, validate } = require("../models/customer")
const router = express.Router();

router.get("/", async (req, res) => {
    const customers = await Customer.find().sort("name")
    res.send(customers)
})

router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let customer = new Customer({ 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone    
    })
    customer = await customer.save()
    res.send(customer)
})

module.exports = router