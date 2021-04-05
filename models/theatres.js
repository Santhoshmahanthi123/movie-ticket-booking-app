const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const theatreSchema = new Schema(
    {
      theatre_name: { type: String, trim: true, required: true },
      location: {
        type: String,
        required: true,
        trim: true
      },
      landmark: {
        type: String,
        required: true,
        trim: true
      },
      movie_playing:{ 
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required:true
      },
      seats_available:{ 
        type: Number,
        required: true,
        default:0
      },
      price:{ 
        type: Number,
        required: true,
        default:0
      },
      starts_at:{ 
        type:  Date,
        required: true,
        unique:true,
        default: Date.now()
      },
      ends_at:{ 
        type:  Date,
        required: true,
        default: Date.now()
      },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
  
    },
  
  );

module.exports = mongoose.model("Theatre", theatreSchema);;