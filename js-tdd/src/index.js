import express from "express";
import UserRouter from "./routers/user.js";

const app = express();
const PORT = 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
