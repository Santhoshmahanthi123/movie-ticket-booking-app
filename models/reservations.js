const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservationSchema = new Schema(
    { 
      user_id:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
      theatre: { 
        type: Schema.Types.ObjectId,
        ref: 'Theatre',
        required:true
      },
      seats: {
        type: Number,
        required:true,
        default:1
      },
      booking_price: {
        type: Number,
        required:true
      },
      status: {
        type: Number,
        default:0
      },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
    },
  );

module.exports = mongoose.model("Reservation", reservationSchema);;