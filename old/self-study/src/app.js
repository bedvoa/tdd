const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const productRouter = require("./routers/products");
const PORT = process.env.SERVER_PORT;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", [productRouter]);

app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}`);
});
