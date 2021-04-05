const Movie = require("../models/movies");
const addMovie = async (req, res) => {
    console.log("Inside add movie controller");
    const movie = new Movie(req.body);
    try {
      await movie.save();
      res.status(200).json({message:"Movie added successflly!",movie,status:true });
    } catch (error) {
      res.status(500).json({ message: "Movie addition failed", status: false, error:error.message});
  
    }
  };

  async function findAllMovies(req, res) {
    console.log("Inside find All movies controller");
    try {
      const movies = await Movie.find();
      if (!movies) {
        res.status(404).json({status:false, message: "Movies doesn't exists in the database" });
      } else {
        return res.status(200).json({status:true, movies });
      }
    } catch (err) {
      return res.status(500).json({status:false, message: err.message });
    }
  };

  async function filterMovies(req, res) {
    console.log("Inside  filter movies controller");
    try {
        var obj = {}
      if(req.query.language) {
          obj = {
            "language":req.query.language
          }
      }
      if(req.query.genre){
        obj = {
            "genre":req.query.genre
          }
      }
      console.log("&&&&",obj)
      const movies = await Movie.find(obj);
      if (!movies) {
        res.status(404).json({status:false, message: "Movies not found on your search" });
      } else {
        return res.status(200).json({status:true, movies });
      }
    } catch (err) {
      return res.status(500).json({status:false, message: err.message });
    }
  };
  
  async function removeMovie(req, res) {
    console.log("Inside remove movie controller");
    const { id } = req.params;
    try {
      const remove_movie = await Movie.findByIdAndDelete({ _id: id });
      if (!remove_movie) {
        res.status(404).send({
          message: `Movie doesn't exists in the database.`,
          status: false
        });
      } else {
        return res.status(200).json({ message: `Movie deleted.`, status: true });
      }
    } catch (error) {
      res
        .status(500)
        .send({status:false, message: "Movie deletion failed", error: error.message });
    }
  };

  function updateMovieDetails(req, res) {
    const keys = Object.keys(req.body);
    const allowedKeys = [
      "movie_name",
      "genre",
      "language",
      "duration"
    ];
    const isValidKeys = keys.every((key) => {
      return allowedKeys.includes(key);
    });
    if (!isValidKeys) {
      return res.status(400).send({
        status: false,
        message: "Invalid Keys are not allowed",
        allowed_keys: allowedKeys
      });
    }
    movie.findOne({ _id: req.params.id }, (err, movie) => {
      if (err)
        return res.status(500).json({ status: false, message: "Error occured to update movie" });
      if (movie) {
        movie.movie_name = (req.body.movie_name) ? req.body.movie_name : movie.movie_name;
        movie.genre = (req.body.genre) ? req.body.genre : movie.genre;
        movie.language = (req.body.language) ? req.body.language : movie.language;
        movie.duration = (req.body.duration) ? req.body.duration : movie.duration;
        movie.save((err, result) => { //Update Password
          if (!err) {
            return res.status(200).json({ status: true, message: 'Movie Updated Successfully' });
          }
          else {
            return res.status(500).json({ status: false, message: 'Failed', err });
          }
        })
      } else {
        return res.status(500).json({ status: false, message: 'Failed' });
      }
    })
  };

module.exports ={
    addMovie,
    findAllMovies,
    removeMovie,
    updateMovieDetails,
    filterMovies
};