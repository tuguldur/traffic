const check = (req, res, next) => {
  if (!req.user) res.status(401).json({ msg: "Алдаатай хүсэлт" });
  else next();
};
module.exports = check;
