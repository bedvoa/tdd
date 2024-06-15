/**
 *
 * @param {boolean} result
 * @param {Array<string>} rows
 * @param {*} error
 * @returns {{result: boolean, rows: Array<string>} | {result: boolean, error: *}}
 */
export const responseDao = (result, rows, error) => {
  if (result) {
    return {
      success: result,
      rows,
    };
  }
  return {
    error,
    success: result,
  };
};

/**
 *
 * @param {number} code
 * @param {boolean} result
 * @param {Array<string>} rows
 * @param {*} error
 * @returns
 */
export const responseController = (code, result, rows, message) => {
  if (result) {
    return {
      code,
      success: result,
      rows,
      message,
    };
  }
  return {
    code,
    success: result,
    message,
  };
};
