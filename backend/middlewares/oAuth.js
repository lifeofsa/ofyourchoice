const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "not Authorized as an admin" });
  }
};

module.exports = admin;
