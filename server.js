const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const mongoUrl = process.env.DATABASE;

mongoose
  .connect(mongoUrl)
  .then((con) => console.log("DB connected sucessfully"));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`joyfully listening on port ${port}`);
});
