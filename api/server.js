const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({ extended: true })
);
const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Stack application.  >> REACT CODING CHALLENGE API :)" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/sector.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`***********************************************`);
  console.log(`Server is running on port ${PORT}.`);
  console.log(`***********************************************`);
});
