const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    return res.status(401).json({ code: "unauthorized" });
  }
};

module.exports = { isNotLoggedIn };
