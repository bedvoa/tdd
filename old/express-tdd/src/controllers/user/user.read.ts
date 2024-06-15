import { NextFunction, Request, Response } from "express";
import { getUserList } from "../../dao/user/userReadDao";

export class UserController {
  constructor() {}
  public getUserList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userList = await getUserList();
      res.status(200).json(userList);
    } catch (error) {
      next(error);
    }
  };
}
