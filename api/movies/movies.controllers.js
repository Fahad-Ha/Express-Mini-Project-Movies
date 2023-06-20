const Movie = require("../../models/Movie");

exports.fetchMovie = async (movieId) => {
  const foundMovie = await Movie.findById(movieId);
  return foundMovie;
};

exports.moviesGet = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

exports.moviesCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.posterImage = `${req.file.path.replace("\\", "/")}`;
    }
    const movies = await Movie.create(req.body);
    res.status(201).json(movies);
  } catch (error) {
    next(error);
  }
};

exports.moviesDelete = async (req, res, next) => {
  try {
    req.movie.deleteOne();
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.moviesUpdate = async (req, res, next) => {
  try {
    await req.movie.updateOne(req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.moviesRatings = async (req, res, next) => {
  try {
    // await req.movie.updateOne({
    //   ratings: [...req.movie.ratings, req.body.ratings],
    // });
    if (req.body.ratings > 0 && req.body.ratings <= 10) {
      await req.movie.updateOne({
        $push: { ratings: req.body.ratings },
      });
      return res.status(204).end();
    }
    return res.json("please add a rating between 0 and 10");
  } catch (error) {
    return next(error);
  }
};
