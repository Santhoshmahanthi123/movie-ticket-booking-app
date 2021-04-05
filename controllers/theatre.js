const Theatre = require("../models/theatres");
const Movie = require("../models/movies");
const moment = require("moment");
const addTheatre = async (req, res) => {
    console.log("Inside add Theatre controller");
    var date = req.body.date;
    var movie = await Movie.find({"_id":req.body.movie_playing});
    var movie_duration = movie[0].duration;
    // console.log("Movie",movie_duration);
    var hours = Math.floor(movie_duration / 60);  
    var minutes = Math.round(movie_duration % 60);

    var running_time =  null;
    console.log("Duration",minutes)
    if(minutes===0){
        running_time =  "0"+hours+"" + ":" +"0"+minutes+""; 
    }else{
        running_time =  "0"+hours+"" + ":" + minutes;
    }
    console.log("Starts at",req.body.starts_at);
    console.log("Running",running_time)
    var final_time =  moment.duration(req.body.starts_at).asMinutes() + moment.duration(running_time).asMinutes()
    // console.log("Final",final_time);
    var end_hours = Math.floor(final_time / 60);  
    var end_minutes = final_time % 60;
    var end_running_time = null;
    // console.log("Minutes",end_minutes);
    if(end_minutes===0){
        end_running_time =   end_hours + ":" +"0"+end_minutes+"";
    }else{
        end_running_time =  end_hours + ":" + end_minutes;
    }
    console.log("Ends at",end_running_time);
    var start_date_obj = ""+date+"T"+req.body.starts_at+":00Z";
    req.body.starts_at = new Date(start_date_obj);
    var end_date_obj = ""+date+"T"+end_running_time+":00Z";
    req.body.ends_at = new Date(end_date_obj);
    console.log("Ends",req.body.ends_at)
    const theatre = new Theatre(req.body);
    try {
      await theatre.save();
      res.status(200).json({message:"Theatre added successflly!",theatre,status:true });
    } catch (error) {
      res.status(500).json({ message: "Theatre addition failed", status: false, error:error.message});
    }
  };

  async function findAllTheatres(req, res) {
    console.log("Inside find All theatres controller");
    try {
      const theatres = await Theatre.find().populate('movie_playing');
      if (!theatres) {
        res.status(404).json({status:false, message: "Theatres doesn't exists in the database" });
      } else {
        return res.status(200).json({status:true, theatres });
      }
    } catch (err) {
      return res.status(500).json({status:false, message: err.message });
    }
  };

  async function findSeatsAvailableForShow(req, res) {
    console.log("Inside findSeatsAvailableForShow controller");
    try {
      var start_date_obj = ""+req.body.date+"T"+req.body.starts_at+":00Z";
      req.body.starts_at = new Date(start_date_obj);
      console.log("Starts at",req.body.starts_at)
      const theatres = await Theatre.find({"_id":req.params.show_id,"theatre_name":req.body.theatre_name,"starts_at":req.body.starts_at});
      if (theatres.length==0) {
        res.status(404).json({status:false, message: "Show doesn't exists" });
      } else {
        return res.status(200).json({status:true, available_seats: theatres[0].seats_available });
      }
    } catch (err) {
      return res.status(500).json({status:false, message: err.message });
    }
  };

  async function removeShow(req, res) {
    console.log("Inside removeShow controller");
    try {
      const theatres = await Theatre.findByIdAndDelete({ _id: req.params.id });
      if (!theatres) {
        res.status(404).json({status:false, message: "Show doesn't exists in the database" });
      } else {
        return res.status(200).json({status:true, message: "Show removed!" });
      }
    } catch (err) {
      return res.status(500).json({status:false, message: err.message });
    }
  };
  async function removeMovieFromTheatre(req, res) {
    console.log("Inside removeMovieFromTheatre controller");
  
    try {
      const movie = await Theatre.deleteMany({ "movie_playing": req.params.movie_id });
      console.log("movie",movie)
      if (!movie) {
        res.status(404).json({status:false, message: "Movie doesn't exists in the theatre" });
      } else {
        return res.status(200).json({status:true, message: "Movie removed!" });
      }
    } catch (err) {
      return res.status(500).json({status:false, message: err.message });
    }
  };

 async function updateTheatreDetails(req, res) {
    const keys = Object.keys(req.body);
    const allowedKeys = [
      "movie_id",
      "theatre_id",
      "price",
      "date",
      "starts_at"
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
    var date = req.body.date;
    var movie = await Movie.find({"_id":req.params.movie_id});
    var movie_duration = movie[0].duration;
    // console.log("Movie",movie_duration);
    var hours = Math.floor(movie_duration / 60);  
    var minutes = Math.round(movie_duration % 60);
    var running_time =  null;
    console.log("Duration",typeof(minutes))
    if(minutes===0){
        running_time =  "0"+hours+"" + ":" +"0"+minutes+""; 
    }else{
        running_time =  "0"+hours+"" + ":" + minutes;
    }
    console.log("Starts at",req.body.starts_at);
    // console.log("Running",running_time)
    var final_time =  moment.duration(req.body.starts_at).asMinutes() + moment.duration(running_time).asMinutes()
    // console.log("Final",final_time);
    var end_hours = Math.floor(final_time / 60);  
    var end_minutes = final_time % 60;
    var end_running_time = null;
    // console.log("Minutes",end_minutes);
    if(end_minutes===0){
        end_running_time =   end_hours + ":" +"0"+end_minutes+"";
    }else{
        end_running_time =  end_hours + ":" + end_minutes;
    }
    console.log("Ends at",end_running_time);
    var start_date_obj = ""+date+"T"+req.body.starts_at+":00Z";
    req.body.starts_at = new Date(start_date_obj);
    var end_date_obj = ""+date+"T"+end_running_time+":00Z";
    req.body.ends_at = new Date(end_date_obj);
   Theatre.findOne({ _id: req.params.theatre_id }, (err, theatre) => {
      if (err)
        return res.status(500).json({ status: false, message: "Error occured to update movie" });
      if (theatre) {
       theatre.movie_playing = (req.params.movie_id) ? req.params.movie_id :theatre.movie_playing;
       theatre.price = (req.body.price) ? req.body.price :theatre.price;
       theatre.starts_at = (req.body.starts_at) ? req.body.starts_at :theatre.starts_at;
       theatre.ends_at = (req.body.ends_at) ? req.body.ends_at :theatre.ends_at;
       theatre.save((err, result) => { //Update Password
          if (!err) {
            return res.status(200).json({ status: true, message: 'Theatre Updated Successfully!' });
          }
          else {
            return res.status(500).json({ status: false, message: 'Failed', error:err.message });
          }
        })
      } else {
        return res.status(500).json({ status: false, message: 'Failed' });
      }
    })
  };

  module.exports ={
    addTheatre,
    findAllTheatres,
    removeShow,
    updateTheatreDetails,
    removeMovieFromTheatre,
    findSeatsAvailableForShow
};