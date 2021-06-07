const role = (...roles) => {
  return (request, response, next) => {
    const { user } = request;
    if (user && roles.includes(user.role)) next();
    else response.status(403).json({ message: "Эрхгүй" });
  };
};
module.exports = role;
