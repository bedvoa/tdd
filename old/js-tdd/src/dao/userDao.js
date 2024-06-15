import { pool } from "../db/index.js";
import { responseDao } from "../dto/index.js";

export const getUserByIdDao = async (params) => {
  const connection = await pool.getConnection();
  try {
    const getUserByIdQuery = `
      select user_seq
           , email
           , create_at
           , update_at
        from users
       where user_seq = ${params.userSeq} 
         and del_yn = 'n';`;
    const [rows] = await connection.query(getUserByIdQuery);
    return responseDao(true, rows, null);
  } catch (error) {
    return new Error("error");
  } finally {
    connection.release();
  }
};

export const getUserByEmailDao = async (params) => {
  const connection = await pool.getConnection();
  try {
    const getUserByEmailQuery = `
      select user_seq
        from users
       where email = '${params.email}' 
         and del_yn = 'n';`;
    const [rows] = await connection.query(getUserByEmailQuery);
    return responseDao(true, rows, null);
  } catch (error) {
    return new Error("error");
  } finally {
    connection.release();
  }
};

export const createUserDao = async (params) => {
  const connection = await pool.getConnection();
  try {
    const createUserQuery = `
      insert into users (
        email
      , password
      , del_yn
      , create_at
      , update_at
      ) values (
        '${params.email}'
      , '${params.password}'
      , '${params.del_yn}'
      , '${params.created_at}'
      , '${params.updated_at}'
      );`;

    const [rows] = await connection.query(createUserQuery);
    return responseDao(true, rows, null);
  } catch (error) {
    return new Error("error");
  } finally {
    connection.release();
  }
};

export const getAllUsersDao = async () => {
  const connection = await pool.getConnection();
  try {
    const getAllUsersQuery = `
      select user_seq
           , email
           , create_at
           , update_at
        from users
       where del_yn = 'n';`;
    const [rows] = await connection.query(getAllUsersQuery);
    return responseDao(true, rows, null);
  } catch (error) {
    return new Error("error");
  } finally {
    connection.release();
  }
};

export const getUserByEmailOrNameDao = async (params) => {
  const connection = await pool.getConnection();
  try {
    const getUserByEmailOrNameQuery = `
      select user_seq
           , email
           , create_at
           , update_at
        from users
       where del_yn = '${params.delYn}'
         and ${params.flag} = '${params.condition}';`;
    const [rows] = await connection.query(getUserByEmailOrNameQuery);
    return responseDao(true, rows, null);
  } catch (error) {
    return new Error("error");
  } finally {
    connection.release();
  }
};
