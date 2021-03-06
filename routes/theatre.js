const express = require("express");
const router = express.Router();
const theatreController = require("../controllers/theatre");
const auth = require("../middlewares/user-auth");
router.post("/",auth.isAdmin,theatreController.addTheatre);
router.get("/theatres",theatreController.findAllTheatres);
router.delete("/show/:id",auth.isAdmin,theatreController.removeShow);
router.delete("/movie/:movie_id",auth.isAdmin,theatreController.removeMovieFromTheatre);
router.put("/:theatre_id/movie/:movie_id",auth.isAdmin,theatreController.updateTheatreDetails);
router.get("/seats-available/:show_id",theatreController.findSeatsAvailableForShow);
module.exports = router;