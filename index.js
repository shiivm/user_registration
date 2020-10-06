const express = require("express");
const path = require("path");

if (!(process.env.NODE_ENV && process.env.NODE_ENV == "production")) {
  require("dotenv").config();
}
require("./config/dbConnection");

const user = require("./routes/api/user");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", user);
app.all("*", (req, res) =>
  /* res.status(404).json({
    code: 'page-not-found',
    title: 'Page not found',
    description: '404 Page Not Found!!.',
  }) */
  res.status(404).send('<h1>404 Page Not Found!!</h1>')
);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
