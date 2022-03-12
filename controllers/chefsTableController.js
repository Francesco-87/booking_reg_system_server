const db = require('../config/dbConnect');


const handleChefsTable = async (req, res) => {

    const date = req.query.date;
console.log(date)


    db.query("Select registrationsystem.customers.*, registrationsystem.allergens.*, registrationsystem.booking.* from registrationsystem.customers join registrationsystem.allergens on (customers.idCustomer = allergens.idCustomer) join registrationsystem.booking on (customers.idCustomer = booking.idCustomer and Date(booking_date) =  Date(?)) order by customer_name;", [date], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

module.exports = {handleChefsTable}