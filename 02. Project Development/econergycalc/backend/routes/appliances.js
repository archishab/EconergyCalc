const express = require('express');
const router = express.Router();
const Appliance = require("../models/Appliance");

// Create an appliance using: POST "/api/appliances/addappliance"
router.post(
    "/addappliance",
        (req, res) => {
        //create new appliance in db
        let appliance = Appliance.create({
            applianceType: req.body.applianceType,
            applianceName: req.body.applianceName,
            powerRating: req.body.powerRating,
            usageDuration: req.body.usageDuration,
            quantity: req.body.quantity
        });

        res.json({ appliance });
    });

module.exports = router;