const db = require('../config/dbConnect');




const handleAllergenSearch = async (req, res) => {

    const idCustomer = req.query.idCustomerAxios;

    db.query("Select * from registrationsystem.allergens where idCustomer = ?;", [idCustomer], (err, result) =>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })


}

const handleAllergenUpdate = async (req, res) => {

    const celery = req.body.allergens[0];
    const crustaceans = req.body.allergens[1];
    const egg = req.body.allergens[2];
    const fish = req.body.allergens[3];
    const gluten = req.body.allergens[4];
    const lupin = req.body.allergens[5];
    const milk = req.body.allergens[6];
    const molluscs = req.body.allergens[7];
    const mustard = req.body.allergens[8];
    const nuts = req.body.allergens[9];
    const peanuts = req.body.allergens[10];
    const sesame = req.body.allergens[11];
    const soy = req.body.allergens[12];
    const sulphites = req.body.allergens[13];
    const idCustomer = req.body.allergens[14];



   // const idCustomer = req.query.idCustomer;
   db.query("UPDATE registrationsystem.allergens SET celery = ?, crustaceans = ?, egg = ?, fish = ?, gluten = ?, lupin = ?, milk = ?, molluscs = ?, mustard = ?, nuts = ?, peanuts = ?, sesame = ?, soy = ?, sulphites = ? WHERE idCustomer = ?;", [
       celery, crustaceans, egg, fish, gluten, lupin, milk, molluscs, mustard, nuts, peanuts, sesame, soy, sulphites, idCustomer
   ], (err, result) => {
       if (err) {
           console.log(err);
       } else {
           res.send(result);
       }
   })
}

module.exports = {
    handleAllergenSearch,
    handleAllergenUpdate
}