const bcrypt = require('bcrypt');
const saltRound = 10;
const db = require('../config/dbConnect')

//The post function to insert chefs and customers data into the database(tables);
//separetad by controlling the email adress with a if-else
const handleRegister = async (req, res) => {

        const name = req.body.name
        const surname = req.body.surname
        const birthday = req.body.birthday
        const eMail = req.body.eMail
        const phone = req.body.phone
        const password = req.body.password


    //Hashing the password

        bcrypt.hash(password, saltRound, (err, hash) => {
            if (err) {
                console.log(err)
            }

            if (eMail.toString().includes("customer")) {

                db.query("INSERT INTO registrationsystem.customers (customer_name, customer_surname, customer_birthday, customer_eMail, customer_phone, customer_password) VALUES(?,?,?,?,?,?); INSERT INTO registrationsystem.allergens (`idCustomer`)VALUES (LAST_INSERT_ID());",
                    [name, surname, birthday, eMail, phone, hash],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("VALUES INSERTED")
                        }
                    }
                );
            } else if (eMail.toString().includes("chef")) {

                db.query("INSERT INTO registrationsystem.chefs (chef_name, chef_surname, chef_birthday, chef_eMail, chef_phone, chef_password) VALUES(?,?,?,?,?,?);",
                    [name, surname, birthday, eMail, phone, hash], (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("VALUES INSERTED")
                        }
                    }
                );
            }


        });

}

const handlePersonalUpdate = async (req, res) => {

    const name = req.body.name
    const surname = req.body.surname
    const birthday = req.body.birthday
    const eMail = req.body.eMail
    const phone = req.body.phone
    const password = req.body.password
    const id = req.body.id

//Hashing the password

    bcrypt.hash(password, saltRound, (err, hash) => {
        if (err) {
            console.log(err)
        }

        if (eMail.toString().includes("customer")) {

            db.query("UPDATE registrationsystem.customers SET customer_name=?, customer_surname=?, customer_birthday=?, customer_eMail=?, customer_phone=?, customer_password=? WHERE idCustomer=?;",
                [name, surname, birthday, eMail, phone, hash, id],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("VALUES UPDATED")
                    }
                }
            );
        }else if (eMail.toString().includes("chef")) {

            db.query("UPDATE registrationsystem.chefs SET chef_name=?, chef_surname=?, chef_birthday=?, chef_eMail=?, chef_phone=?, chef_password=? WHERE idChef= ?;",
                [name, surname, birthday, eMail, phone, hash, id], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("VALUES UPDATED")
                    }
                }
            );
        }


    });

}


module.exports = {
    handleRegister,
    handlePersonalUpdate
}