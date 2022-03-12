const db = require("../config/dbConnect");

//retrieving all the bookings of a customer with id.
const handleGetBooking = async (req, res) => {

    const id = req.query.idCustomer

        db.query("SElECT * FROM registrationsystem.booking where idCustomer = ?;", [id], (err, result) => {
            if (err) {
                console.log(err);
            }else{
                res.send(result)
            }

        })

}


//first delete all bookings where id, then insert all the bookings in the array.
const handleBookingUpdate = async (req, res) => {

    const booking = req.body.bookingNew
    const id = req.body.id


    for (let i = 0; i < booking.length; i++) {

        db.query("DELETE from booking where idCustomer = ?;", [id], (err, res) => {
            if(err){
                console.log(err)
            }
        })
    }

    for (let i = 0; i < booking.length; i++) {


            db.query("INSERT IGNORE INTO registrationsystem.booking (idCustomer, booking_date, booking_status) VALUES (?, ?, true);", [id, booking[i]], (err, result) =>{
                if (err) {
                    console.log(err);
                }
            })
        }

    }


module.exports = {
    handleBookingGet: handleGetBooking,
    handleBookingUpdate
}