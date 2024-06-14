import { getConnectionReadPool } from "../../db/read";
import { User } from "../../types/user/userTypes";

export const getUserList = async (): Promise<User[]> => {
  const connection = await getConnectionReadPool();
  try {
    const getAllUserQuery = `
      select
        u.user_seq,
        u.role_seq,
        u.password,
        u.email,
        u.allow,
        u.reg_date,
        u.upd_date,
        u.del_date,
        r.role_name,
        r.code
      from user u
      left join role r on u.role_seq = r.role_seq
      where is_del = 'N' and allow = 'Y'`;

    const [userList] = await connection.query(getAllUserQuery);
    return userList as User[];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
