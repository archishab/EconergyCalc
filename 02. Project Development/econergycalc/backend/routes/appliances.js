const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Appliance = require("../models/Appliance");
const ApplianceUsage = require("../models/Usage");

// ROUTE 1: Fetch user's appliances : GET "/api/appliances/fetchallappliance". Login required
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
    body(
      "energyStarCompliant",
      "Energy Star Compliant cannot be empty"
    ).exists(),
    body("active", "Active cannot be empty").exists(),
  ],

  async (req, res) => {
    try {
      const {
        applianceType,
        applianceName,
        powerRating,
        energyStarCompliant,
        active,
      } = req.body;

      //if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const appliance = new Appliance({
        applianceType,
        applianceName,
        powerRating,
        energyStarCompliant,
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
  const {
    applianceType,
    applianceName,
    powerRating,
    energyStarCompliant,
    active,
  } = req.body;
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
    if (energyStarCompliant) {
      newAppliance.energyStarCompliant = energyStarCompliant;
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

// ROUTE 5: Add usage for appliance : POST "/api/appliances/usage". Login required
router.post("/usage", async (req, res) => {
  try {
    const { user, appliance, duration, energyConsumed } = req.body;

    const newUsage = new ApplianceUsage({
      user,
      appliance,
      duration,
      energyConsumed,
    });

    await newUsage.save();
    res.status(201).send("Usage recorded successfully");
  } catch (error) {
    res.status(500).send("Error recording usage");
  }
});

// ROUTE 6: Fetch daily energy consumption : GET "/api/appliances/energy-consumption". Login required
router.get("/energy-consumption", fetchuser, async (req, res) => {
  try {
    const appliance = await ApplianceUsage.find({ user: req.user.id });

    res.json(appliance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 7: Get recommendations based on appliances added : GET "/api/appliances/getrecommendations". Login required
router.get("/getrecommendations", fetchuser, async (req, res) => {
  try {
    const appliances = await Appliance.find({ user: req.user.id });

    const recommendations = appliances.map((appliance) => {
      if (!appliance.energyStarCompliant) {
        recommendations.push(`You have indicated that ${appliance.applianceName} is not Energy Star Compliant. Consider replacing it with a more energy-efficient alternative.`);
      }
      
      if (appliance.powerRating > someThresholdValue) {
        recommendations.push(`The ${appliance.applianceName} has a high power rating. Using it during off-peak hours could reduce your energy bills.`);
      }

      if (appliance.active && !appliance.energyStarCompliant) {
        recommendations.push(`Since ${appliance.applianceName} is frequently used and not energy compliant, investing in a new model could lead to long-term savings.`);
      }
    });

    res.json({ recommendations, appliances });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

function escapeRegExp(string) {
  // This function will escape all regex special characters for safe insertion into a RegExp
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ROUTE 8: Fetch appliance detail using model number : GET "/api/appliances/findappliance". Login required
router.get("/findappliance/:modelNumber", async (req, res) => {
  let results = [];
  fs.createReadStream(
    "/Users/archishabhattacharya/Library/CloudStorage/OneDrive-Personal/Documents/School/University of Regina/13. Fall 2023/ENSE 405/Project/EconergyCalc/02. Project Development/econergycalc/backend/routes/data/ApplianceDB_2023.csv"
  )
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // The user input model number
    const userInputModel = req.params.modelNumber;

    // Find the first matching appliance where the .csv file model regex matches the user input
    const appliance = results.find(appliance => {
      // Create a regex pattern from the .csv file model, replacing wildcard characters and escaping regex special characters
      const modelRegexPattern = '^' + escapeRegExp(appliance.Model).replace(/\\\*/g, '.*').replace(/\\\#/g, '.{1}') + '$';
      const modelRegex = new RegExp(modelRegexPattern, 'i');
      return modelRegex.test(userInputModel);
    });
    
    if (appliance) {
      res.json(appliance);
    } else {
      res.status(404).send('Appliance not found');
    }
  });
});



module.exports = router;
