const check = (predicate, onSuccess, onFail) => {
  predicate() ? onSuccess("yes") : onFail("no");
};

module.exports = check;
