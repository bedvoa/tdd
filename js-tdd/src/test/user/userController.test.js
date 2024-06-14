import bcrypt from "bcrypt";
import moment from "moment";
import {
  getUserByIdController,
  createUserController,
  getAllUsers,
  getUserByEmailOrName,
} from "../../controllers/userController.js";
import {
  getUserByIdDao,
  createUserDao,
  getUserByEmailDao,
  getAllUsersDao,
  getUserByEmailOrNameDao,
} from "../../dao/userDao.js";
import { createMockReqRes } from "../../utils/createMockReqRes.js";
import { responseController, responseDao } from "../../dto/index.js";

// 외부 모듈 mocking
jest.mock("../../dao/userDao.js"); // userDao.js 모듈을 mocking
jest.mock("../../dto/index.js"); // index.js 모듈을 mocking
jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashedPassword"),
}));
jest.mock("moment", () => () => ({
  format: jest.fn().mockReturnValue("2024-03-03 18:00"),
}));

describe("User Controller", () => {
  describe("createUser", () => {
    beforeEach(() => {
      // mocking 함수 초기화
      jest.clearAllMocks();
    });
    it("should return 400 status code if invalid input", async () => {
      /** given */
      // req, res 객체 생성
      // 예상 결과 값 생성
      const { req, res } = createMockReqRes("", "");
      const expectValue = {
        code: 400,
        success: false,
        message: "Invalid input",
      };

      // 호출 할 함수들 mocking
      responseController.mockReturnValue(expectValue);

      /** when */
      await createUserController(req, res);

      /** then */
      expect(responseController).toBeCalledWith(
        400,
        false,
        null,
        "Invalid input"
      );
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith(expectValue);
      expect(createUserDao).not.toBeCalled();
    });
    it("should return 400 status code if user already exists", async () => {
      /** given */
      // req, res 객체 생성
      // 예상 결과 값 생성
      const { req, res } = createMockReqRes("testjin@test.com", "testjin");
      const { email, password } = req.body;
      const result = {
        code: 400,
        success: false,
        message: "User already exists",
      };

      // 호출 할 함수들 mocking
      // getUserByEmailDao 함수가 호출되면 mockResolvedValue로 반환 값 설정
      // responseController 함수가 호출되면 mockReturnValue로 반환 값 설정
      getUserByEmailDao.mockResolvedValue({ rows: [{ email }] });
      responseController.mockReturnValue(result);

      /** when */
      await createUserController(req, res);

      /** then */
      expect(getUserByEmailDao).toBeCalledWith({ email });
      expect(responseController).toBeCalledWith(
        400,
        false,
        null,
        "User already exists"
      );
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith(result);
      expect(createUserDao).not.toBeCalled();
    });
    it("should return 200 status code if success", async () => {
      /** given */
      // req, res 객체 생성
      // 예상 결과 값 생성
      const { req, res } = createMockReqRes("test3@test.com", "test3");
      const expectValue = {
        code: 200,
        success: true,
      };

      // 호출 할 함수들 mocking
      responseController.mockReturnValue(expectValue); // 동기 함수는 mockReturnValue로 반환 값 설정
      getUserByEmailDao.mockResolvedValue({ rows: [] }); // 비동기 함수는 mockResolvedValue로 반환 값 설정
      createUserDao.mockResolvedValue({ success: true });

      /** when */
      await createUserController(req, res);

      /** then */
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expectValue);
      expect(createUserDao).toBeCalled();
    });
    it("should return 500 status code if error", async () => {
      /** given */
      const { req, res } = createMockReqRes("test3@test.com", "test3");
      const payload = {
        email: req.body.email,
        password: "hashedPassword",
        del_yn: "n",
        created_at: moment().format("YYYY-MM-DD HH:mm"),
        updated_at: moment().format("YYYY-MM-DD HH:mm"),
      };
      const responseExpectValue = {
        code: 500,
        success: false,
        message: "error",
      };

      // 호출 할 함수들 mocking
      createUserDao.mockRejectedValue(new Error("error"));
      responseController.mockReturnValue(responseExpectValue);

      /** when */
      await createUserController(req, res);

      /** then */
      expect(createUserDao).toBeCalled();
      expect(createUserDao).toBeCalledTimes(1);
      expect(createUserDao).toBeCalledWith(payload);
      expect(responseController).toBeCalledWith(500, false, null, "error");
      expect(createUserDao).rejects.toThrow("error");
    });
  });

  describe("getUserById", () => {
    beforeEach(() => {
      // mocking 함수 초기화
      jest.clearAllMocks();
    });
    it("should return 200 status code", async () => {
      const { req, res } = createMockReqRes("", "", 1);
      const result = {
        success: true,
        message: "success",
        rows: [
          {
            id: 1,
            name: "test",
          },
        ],
      };

      getUserByIdDao.mockResolvedValue(result);
      responseController.mockReturnValue(result);

      await getUserByIdController(req, res);

      expect(getUserByIdDao).toBeCalledWith({ userSeq: req.params.id });
      expect(responseController).toBeCalledWith(
        200,
        true,
        result.rows,
        "success"
      );
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(result);
    });
    it("should return 500 status code if fail", async () => {
      const { req, res } = createMockReqRes("", "", 1);
      const result = {
        success: false,
        rows: [],
        message: "fail",
      };

      getUserByIdDao.mockResolvedValue(result);
      responseController.mockReturnValue(result);

      await getUserByIdController(req, res);

      expect(getUserByIdDao).toBeCalledWith({ userSeq: req.params.id });
      expect(responseController).toBeCalledWith(500, false, null, "fail");
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith(result);
    });
    it("should return 500 status code if error", async () => {
      /** given */
      const { req, res } = createMockReqRes("", "", "test");
      const payload = { userSeq: req.params.id };
      const responseExpectValue = {
        code: 500,
        success: false,
        message: "error",
      };

      // 호출 할 함수들 mocking
      getUserByIdDao.mockRejectedValue(new Error("error"));
      responseController.mockReturnValue(responseExpectValue);

      /** when */
      await getUserByIdController(req, res);

      /** then */
      expect(getUserByIdDao).toBeCalled();
      expect(getUserByIdDao).toBeCalledTimes(1);
      expect(getUserByIdDao).toBeCalledWith(payload);
      expect(getUserByIdDao).rejects.toThrow("error");
      expect(responseController).toBeCalledWith(500, false, null, "error");
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith(responseExpectValue);
    });
  });

  describe("getUserByEmailOrName", () => {
    beforeEach(() => {
      // mocking 함수 초기화
      jest.clearAllMocks();
    });
    it("should return 200 status code if success", async () => {
      /** given */
      const { req, res } = createMockReqRes("", "", 0, "test", undefined);
      const { e: email, n: name } = req.query;
      const resExpectValue = {
        code: 200,
        success: true,
        message: "success",
        rows: [{ id: 1, name: "test" }],
      };
      const daoExpectValue = {
        rows: [{ id: 1, name: "test" }],
        success: true,
      };
      const payload = {
        delYn: "n",
        flag: email ? "email" : "name",
        condition: email ? email : name,
      };

      // 호출 할 함수들 mocking
      getUserByEmailOrNameDao.mockResolvedValue(daoExpectValue);
      responseDao.mockReturnValue(daoExpectValue);
      responseController.mockReturnValue(resExpectValue);

      /** when */
      await getUserByEmailOrName(req, res);

      /** then */
      expect(getUserByEmailOrNameDao).toBeCalled();
      expect(getUserByEmailOrNameDao).toBeCalledTimes(1);
      expect(getUserByEmailOrNameDao).toBeCalledWith(payload);
      expect(responseController).toBeCalledWith(
        200,
        true,
        daoExpectValue.rows,
        "success"
      );
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(resExpectValue);
    });
    it("should return 500 status code if error", async () => {
      /** given */
      const { req, res } = createMockReqRes();
      const { e: email, n: name } = req.query;
      const resExpectValue = {
        code: 500,
        success: false,
        message: "error",
      };
      const payload = {
        delYn: "n",
        flag: email ? "email" : "name",
        condition: email ? email : name,
      };

      // 호출 할 함수들 mocking
      getUserByEmailOrNameDao.mockRejectedValue(new Error("error"));
      responseController.mockReturnValue(resExpectValue);

      /** when */
      await getUserByEmailOrName(req, res);

      /** then */
      expect(getUserByEmailOrNameDao).toBeCalled();
      expect(getUserByEmailOrNameDao).toBeCalledTimes(1);
      expect(getUserByEmailOrNameDao).toBeCalledWith(payload);
      expect(getUserByEmailOrNameDao).rejects.toThrow("error");
      expect(responseController).toBeCalledWith(500, false, null, "error");
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith(resExpectValue);
    });
  });

  describe("getAllUsers", () => {
    beforeEach(() => {
      // mocking 함수 초기화
      jest.clearAllMocks();
    });
    it("should return 200 status if success", async () => {
      /** given */
      // req, res 객체 생성
      const { req, res } = createMockReqRes();
      const expectValue = {
        code: 200,
        success: true,
        message: "success",
        rows: [
          { id: 1, name: "test" },
          { id: 2, name: "test2" },
          { id: 3, name: "test3" },
        ],
      };

      // 호출 할 함수들 mocking
      responseController.mockReturnValue(expectValue);

      /** when */
      await getAllUsers(req, res);

      /** then */
      expect(res.json).toBeCalledWith(expectValue);
      expect(res.status).toBeCalledWith(200);
      expect(getAllUsersDao).toBeCalled();
    });
    it("should return 200 status if success but there is an empty list", async () => {
      /** given */
      // req, res 객체 생성
      const { req, res } = createMockReqRes();
      const expectValue = {
        code: 200,
        success: true,
        message: "success",
        rows: [],
      };

      // 호출 할 함수들 mocking
      responseController.mockReturnValue(expectValue);

      /** when */
      await getAllUsers(req, res);

      /** then */
      expect(res.json).toBeCalledWith(expectValue);
      expect(res.status).toBeCalledWith(200);
      expect(getAllUsersDao).toBeCalled();
    });
  });
});
