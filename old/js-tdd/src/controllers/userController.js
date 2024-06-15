import bcrypt from "bcrypt";
import moment from "moment";
import {
  createUserDao,
  getAllUsersDao,
  getUserByEmailDao,
  getUserByEmailOrNameDao,
  getUserByIdDao,
} from "../dao/userDao.js";
import { responseController } from "../dto/index.js";

// read
export const getUserByIdController = async (req, res) => {
  try {
    const { id: userSeq } = req.params;
    const result = await getUserByIdDao({ userSeq });

    if (!result.success) {
      return res
        .status(500)
        .json(responseController(500, result.success, null, "fail"));
    }

    res
      .status(200)
      .json(responseController(200, result.success, result.rows, "success"));
  } catch (error) {
    res.status(500).json(responseController(500, false, null, "error"));
  }
};

// user create
export const createUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return res
        .status(400)
        .json(responseController(400, false, null, "Invalid input"));
    }
    const isExistUser = await getUserByEmailDao({ email });
    if (isExistUser.rows.length > 0) {
      return res
        .status(400)
        .json(responseController(400, false, null, "User already exists"));
    }
    const payload = {
      email,
      password: await bcrypt.hash(password, 10),
      del_yn: "n",
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    };
    const result = await createUserDao(payload);
    res.status(200).json(responseController(200, result.success, result.rows));
  } catch (error) {
    res.status(500).json(responseController(500, false, null, "error"));
  }
};

// all read
export const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersDao();
    res
      .status(200)
      .json(responseController(200, result.success, result.rows, "success"));
  } catch (error) {
    res.status(500).json(responseController(500, false, null, "error"));
  }
};

// user read by email or name
export const getUserByEmailOrName = async (req, res) => {
  try {
    const { e: eamil, n: name } = req.query;
    const payload = {
      delYn: "n",
      flag: eamil ? "email" : "name",
      condition: eamil ? eamil : name,
    };
    const result = await getUserByEmailOrNameDao(payload);
    res
      .status(200)
      .json(responseController(200, result.success, result.rows, "success"));
  } catch (error) {
    res.status(500).json(responseController(500, false, null, "error"));
  }
};
