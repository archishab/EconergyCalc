const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const Appliance = require("../models/Appliance");

// Create an appliance using: POST "/api/appliances/addappliance"
router.post(
    "/addappliance", [
        body("appliance", "Appliance cannot be empty").isLength({min: 1}),
        body("applianceType", "Appliance Type cannot be empty").isLength({min: 1}),
        body("applianceName", "Appliance Name cannot be empty").isLength({min: 1}),
        body("powerRating", "Power Rating cannot be empty").isLength({min: 1}),
        body("quantity", "Quantity cannot be empty").isLength({min: 1}),
    ],
        (req, res) => {
        //create new appliance in db
        let appliance = Appliance.create({
            applianceType: req.body.applianceType,
            applianceName: req.body.applianceName,
            powerRating: req.body.powerRating,
            usageDuration: req.body.usageDuration,
            quantity: req.body.quantity,
            energyStarCompliant: req.body.energyStarCompliant
        });

        res.json({ appliance });
    });

module.exports = router;