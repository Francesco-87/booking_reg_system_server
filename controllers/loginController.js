const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('../config/dbConnect')

ACCESS_TOKEN_SECRET = "jwtSecret";
REFRESH_TOKEN_SECRET = "SecretRefreshJWT";

//the get function to get data from the database for the login

const handleLogin = async (req, res) => {


            const eMail = req.body.eMail;
            const password = req.body.password;

    if (!eMail || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

//checking for different users chefs/customer
            if (eMail.toString().includes("customer")) {
                try{
                    db.query("Select * from registrationsystem.customers where customer_eMail = ?;",
                        [eMail],
                        (err, result) => {
                            if (err) {
                                res.send({err: err})
                            }
                            //if a result is available, check for password
                            if (result.length > 0) {

                                bcrypt.compare(password, result[0].customer_password, (error, response) => {
                                    if (response) {
                                        const idResult = result[0].idCustomer;
                                        const accessToken = jwt.sign({idResult}, ACCESS_TOKEN_SECRET, {
                                            expiresIn: '15m',
                                        }); //setting the accessToken
                                        const role = 1050;

                                        const refreshToken = jwt.sign({idResult}, REFRESH_TOKEN_SECRET, {
                                            expiresIn: '1d',
                                        }); //setting the refreshToken

                                        res.cookie('jwt', refreshToken, {httpOnly:true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000}); //setting the cookie

                                        res.json({auth: true, token: accessToken, roles: role, result: result}); //passing auth, token, and result to the frontend

                                        // updating the database with a new refreshToken
                                        db.query("UPDATE registrationsystem.customers SET customer_refreshToken = ? WHERE idCustomer = ?;", [refreshToken, idResult],
                                            (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                            })
                                    } else {
                                        res.json({auth: false, message: "Wrong username/ password combination!"})
                                    }
                                });

                            } else {
                                res.json({auth: false, message: "No User exists"})
                            }
                        });
                }catch (e) {
                    console.log(e)
                }

            }else if (eMail.toString().includes("chef")) {

                try {
                    db.query("Select * from registrationsystem.chefs where chef_eMail = ?",
                        [eMail],
                        (err, result) => {
                            if (err) {
                                res.send({err: err})
                            }
                            //if a result is available, check for password
                            if (result.length > 0) {

                                bcrypt.compare(password, result[0].chef_password, (error, response) => {
                                    if (response) {
                                        const idResult = result[0].idChef;
                                        const accessToken = jwt.sign({idResult}, ACCESS_TOKEN_SECRET, {
                                            expiresIn: '15m',
                                        });//setting the accessToken
                                        const role = 2050;
                                        const refreshToken = jwt.sign({idResult}, REFRESH_TOKEN_SECRET, {
                                            expiresIn: '1d',
                                        });//setting the refreshToken

                                        res.cookie('jwt', refreshToken, {httpOnly:true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});//setting the cookie

                                        res.json({auth: true, token: accessToken, roles: role, result: result})//passing auth, token, and result to the frontend

                                        // updating the database with a new refreshToken
                                        db.query("UPDATE registrationsystem.chefs SET chef_refreshToken = ? WHERE idChef = ?;", [refreshToken, idResult],
                                            (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                            })
                                    } else {
                                        res.json({auth: false, message: "Wrong username/ password combination!"})
                                    }
                                });

                            } else {
                                res.json({auth: false, message: "No User exists"})


                            }
                        });
                }catch (e) {
                    console.log(3)
                }

            }
}

module.exports = {handleLogin}