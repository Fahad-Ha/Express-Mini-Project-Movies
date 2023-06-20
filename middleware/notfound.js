module.exports = (req, res, next) => {
  return res.status(404).json({ messeage: "Page Not Found!" });
};
