import { getUserList } from "../../../dao/user/userReadDao";
import { getConnectionReadPool } from "../../../db/read";
import { User } from "../../../types/user/userTypes";

describe("User DAO", () => {
  describe("getUserList", () => {
    let connection: any;

    beforeAll(async () => {
      connection = await getConnectionReadPool();
    });

    afterAll(async () => {
      connection.release();
    });

    it("should return an array of User objects", async () => {
      const userList = await getUserList();
      expect(Array.isArray(userList)).toBe(true);
      expect(userList.length).toBeGreaterThan(0);
      expect(userList[0]).toMatchObject<User[]>(
        expect.objectContaining({
          user_seq: expect.any(Number),
          role_seq: expect.any(Number),
          password: expect.any(String),
          email: expect.any(String),
          allow: expect.any(String),
          role_name: expect.any(String),
          code: expect.any(String),
          reg_date: expect.any(Date),
          upd_date: expect.any(Date),
          del_date: expect.any(Date),
        })
      );
    });

    it("should throw an error when an error occurs in the try block", async () => {
      try {
        await getUserList();
        fail("getUserList should throw an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
