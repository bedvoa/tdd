const express = require("express");
const app = express();
const logging = require("morgan");
const port = 8888;

app.use(logging("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/test", (req, res) => {
  res.send("Test");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
