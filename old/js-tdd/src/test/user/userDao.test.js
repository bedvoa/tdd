import { pool } from "../../db/index.js";
import { responseDao } from "../../dto/index.js";
import { getUserByIdDao } from "../../dao/userDao.js";

// 외부 모듈 mocking
jest.mock("../../dto/index.js", () => ({
  responseDao: jest.fn(),
}));

jest.mock("../../dao/userDao.js", () => ({
  getUserByIdDao: jest.fn(),
}));

jest.mock("../../db/index.js", () => {
  return {
    pool: {
      getConnection: jest.fn(),
    },
  };
});

describe("userDao", () => {
  it("should return success response by getUserByIdDao", async () => {
    /** given */
    const params = { userSeq: 1 };
    const mockRows = [
      {
        user_seq: 1,
        email: "test",
        create_at: "2024-05-07",
        update_at: "2024-05-07",
      },
    ];
    const mockResponse = { success: true, data: mockRows, error: null };
    const connection = {
      query: jest.fn().mockReturnValue([mockRows]),
      release: jest.fn(),
    };
    pool.getConnection.mockResolvedValue(connection);
    responseDao.mockReturnValue(mockResponse);

    /** when */
    const result = await getUserByIdDao(params);

    /** then */
    expect(pool.getConnection).toBeCalledTimes(1);
    expect(connection.query).toBeCalledTimes(1);
    expect(connection.release).toBeCalledTimes(1);
    expect(responseDao).toBeCalledTimes(1);
    expect(result).toEqual(mockResponse);
  });
});
