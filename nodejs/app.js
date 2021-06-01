const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://MasimovMavlan:restart987@cluster0.zxvxm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/", apiRoutes);

app.listen(8000, () => {
  console.log(`Connected`);
});
