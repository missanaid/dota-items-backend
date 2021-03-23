const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("./src/db/config");
const { updateUser } = require("./src/controllers/auth");

const app = express();

dbConnection();

app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/animals", require("./src/routes/animals"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
