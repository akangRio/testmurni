if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const Controller = require("./controllers/controller");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", Controller.register);
app.post("/login", Controller.login);
app.get("/data", Controller.viewData);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

module.exports = app;
