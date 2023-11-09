const express = require("express");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Appliance = require("../models/Appliance");

// ROUTE 1: Fetch user's appliances : POST "/api/appliances/fetchallappliance". Login required
router.get("/fetchallappliance", fetchuser, async (req, res) => {
  try {
    const appliance = await Appliance.find({ user: req.user.id });
    
    res.json(appliance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new appliance : POST "/api/appliances/addappliance". Login required
router.post(
  "/addappliance",
  fetchuser,
  [
    body("applianceType", "Appliance Type cannot be empty").isLength({
      min: 1,
    }),
    body("applianceName", "Appliance Name cannot be empty").isLength({
      min: 1,
    }),
    body("powerRating", "Power Rating cannot be empty").isLength({ min: 1 }),
    body("quantity", "Quantity cannot be empty").isLength({ min: 1 }),
    body("active", "Active cannot be empty").exists(),
  ],

  async (req, res) => {
    try {
      const { applianceType, applianceName, powerRating, quantity, active } =
        req.body;

      //if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const appliance = new Appliance({
        applianceType,
        applianceName,
        powerRating,
        quantity,
        active,
        user: req.user.id,
      });
      const savedAppliance = await appliance.save();

      res.json(savedAppliance);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update existing appliance : PUT "/api/appliances/updateappliance". Login required
router.put("/updateappliance/:id", fetchuser, async (req, res) => {
  const { applianceType, applianceName, powerRating, quantity, active } =
    req.body;
  try {
    const newAppliance = {};
    if (applianceType) {
      newAppliance.applianceType = applianceType;
    }
    if (applianceName) {
      newAppliance.applianceName = applianceName;
    }
    if (powerRating) {
      newAppliance.powerRating = powerRating;
    }
    if (quantity) {
      newAppliance.quantity = quantity;
    }
    if (active) {
      newAppliance.active = active;
    }

    //Find appliance to be updated and update it
    let appliance = await Appliance.findById(req.params.id);
    if (!appliance) {
      return res.status(404).send("Not Found");
    }

    //Allow update only if user owns the appliance
    if (appliance.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    appliance = await Appliance.findByIdAndUpdate(
      req.params.id,
      { $set: newAppliance },
      { new: true }
    );
    res.json({ appliance });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete existing appliance : DELETE "/api/appliances/deleteappliance". Login required
router.delete("/deleteappliance/:id", fetchuser, async (req, res) => {
  try {
    //Find appliance to be deleted and delete it
    let appliance = await Appliance.findById(req.params.id);
    if (!appliance) {
      return res.status(404).send("Not Found");
    }

    //Allow deletion only if user owns the appliance
    if (appliance.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    appliance = await Appliance.findByIdAndDelete(req.params.id);
    res.json({
      Success: "Appliance has been deleted successfully",
      appliance: appliance,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 5: Log appliance usage : POST "/api/appliances/logusage/:id". Login required
router.post("/logusage/:id", fetchuser, [
  body("duration", "Duration must be a positive number").isNumeric().isLength({ min: 1 }),
  // You can also validate the date if you want the user to be able to backdate entries
], async (req, res) => {
  try {
    const { duration } = req.body;
    const id = req.params.id;

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the appliance and add a new usage log
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res.status(404).send("Appliance not found");
    }

    // Check if the user is the owner of the appliance
    if (appliance.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    // Add the new usage log
    appliance.usageLogs.push({ duration });
    await appliance.save();

    res.json(appliance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
