class Database {
  close() {}
}

const throwError = (bool) => {
  const database = new Database();
  try {
    if (!bool) {
      throw new Error("Error: bool is false");
    }
    return true;
  } catch (error) {
    throw error;
  } finally {
    database.close();
  }
};

module.exports = { throwError, Database };
