const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = 8000;

const apiRouter = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
