const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const theatreSchema = new Schema(
    {
      movie_name: { type: String, trim: true, unique:true, required: true },
      genre: {
        type: String,
        trim: true,
        default:null
      },
      language:{
        type: String,
        trim: true,
        default:null  
      },
      duration:{ 
        type: Number,
        required:true
      },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
  
    },
  
  );

module.exports = mongoose.model("Movie", theatreSchema);;