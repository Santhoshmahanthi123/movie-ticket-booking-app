const Booking = require("../models/reservations");
const Theatre = require("../models/theatres");
const bookTicket = async (req, res) => {
    console.log("Inside bookTicket controller");
    try {
    const shows = await Theatre.find({"_id":req.body.theatre})
    console.log("booked shows",shows[0].seats_available);
    if(shows[0].seats_available >= req.body.seats){
        req.body.booking_price = req.body.seats * shows[0].price;
        req.body.status = 1;
            
    }
    const ticket = new Booking(req.body);
    const ticket_booked = await ticket.save();
    if(ticket_booked){
        var remaining_seats = shows[0].seats_available - ticket_booked.seats;
        console.log("Remaining",remaining_seats)
        var seat_update =  await Theatre.updateOne({"_id":req.body.theatre},{ $set: { seats_available: remaining_seats }});
        console.log("update seat",seat_update);
        if(seat_update.nModified===1){
            res.status(200).json({message:"Ticket booked successflly!",ticket,status:true });
        }else{
            res.status(200).json({message:"Seats not available!",ticket,status:true }); 
        }
    }
    } catch (error) {
      res.status(500).json({ message: "Seats not available", status: false});
  
    }
  };

  async function cancelBooking(req, res) {
    console.log("Inside remove movie controller");
    try {
      const cancel_booking = await Booking.findByIdAndDelete({ _id: req.params.booking_id });
      if (!cancel_booking) {
        res.status(404).send({
          message: `Ticket doesn't exists in the database.`,
          status: false
        });
      } else {
        return res.status(200).json({ message: `Booking Cancelled.`, status: true });
      }
    } catch (error) {
      res
        .status(500)
        .send({status:false, message: "Cancellation failed", error: error.message });
    }
  };

  async function findAllBookings(req, res) {
    console.log("Inside findAllBookings controller");
    try {
      const bookings = await Booking.find();
      if (!bookings) {
        res.status(404).send({
          message: `Booking doesn't exists in the database.`,
          status: false
        });
      } else {
        return res.status(200).json({ status: true,bookings });
      }
    } catch (error) {
      res
        .status(500)
        .send({status:false, message: "Bookings fetching failed", error: error.message });
    }
  };

  async function findUserBookings(req, res) {
    console.log("Inside findUserBookings controller");
    try {
      const bookings = await Booking.find({"user_id":req.params.user_id});
      if (!bookings) {
        res.status(404).send({
          message: `User doesn't have any bookings.`,
          status: false
        });
      } else {
        return res.status(200).json({ status: true,bookings });
      }
    } catch (error) {
      res
        .status(500)
        .send({status:false, message: "Bookings fetching failed", error: error.message });
    }
  };

  module.exports ={
    bookTicket,
    cancelBooking,
    findAllBookings,
    findUserBookings
  };