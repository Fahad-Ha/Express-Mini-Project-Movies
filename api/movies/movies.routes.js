const express = require("express");
const router = express.Router();
const uploader = require("../../middleware/uploader");
const {
  moviesCreate,
  moviesGet,
  moviesUpdate,
  fetchMovie,
  moviesDelete,
  moviesRatings,
} = require("./movies.controllers");

router.param("movieId", async (req, res, next, movieId) => {
  try {
    const foundMovie = await fetchMovie(movieId);
    if (!foundMovie) {
      next({ status: 404, message: "Movie Not Found" });
    }
    req.movie = foundMovie;
    next();
  } catch (err) {
    next(err);
  }
});

router.get("/", moviesGet);
router.post("/add-movie", uploader.single("posterImage"), moviesCreate);

router.delete("/:movieId", moviesDelete);
router.put("/:movieId", uploader.single("posterImage"), moviesUpdate);

router.put("/:movieId/add-rating", moviesRatings);

module.exports = router;
