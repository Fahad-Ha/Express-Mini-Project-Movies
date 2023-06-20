module.exports = (err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ messeage: err.messeage || "Internal Server Error" });
};
