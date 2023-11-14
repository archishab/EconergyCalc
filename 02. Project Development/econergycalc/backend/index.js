const connectToMongo = require("./db");
var cors = require('cors')

connectToMongo()
  .then(() => {
    console.log("Database initialization completed.");
  })
  .catch((error) => {
    console.error("Error during database initialization:", error);
  });

const express = require("express");
const app = express();
app.use(cors())
const port = 3030;

app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/appliances", require("./routes/appliances.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
