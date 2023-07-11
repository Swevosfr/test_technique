require("dotenv").config();
const express = require("express");
const app = express();
const port = 8089;
const mongoose = require("mongoose");
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/product", require("./routes/product"));

//connexion à la base de données
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//message serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
