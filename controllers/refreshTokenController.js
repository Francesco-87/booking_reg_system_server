const jwt = require('jsonwebtoken');
const db = require('../config/dbConnect')

ACCESS_TOKEN_SECRET = "jwtSecret";
REFRESH_TOKEN_SECRET = "SecretRefreshJWT";

//the get function to get data from the database for the refreshToken and setting a new accessToken
const handleRefreshToken = async (req, res) => {



//checking for cookies
            const cookies = req.cookies


//cookies not available
            if (!cookies.jwt) return(res.sendStatus(401))


            const refreshToken = cookies.jwt;

            db.query("Select * from registrationsystem.customers where customer_refreshToken = ?; SELECT * FROM registrationsystem.chefs WHERE chef_refreshToken = ?;",
                [refreshToken, refreshToken],
                (err, result) => {
                    if (err) {
                        res.send({err: err})
                    }

                    if (result.length > 0) {

                        //evaluate jwt
                        jwt.verify(
                            refreshToken,
                            REFRESH_TOKEN_SECRET,
                            (err, decoded) => {

                                if(result[0].length > 0){
                                    if (err || result[0][0].idCustomer != decoded.idResult) return res.sendStatus(403);
                                    const accessToken = jwt.sign(
                                        {"idUser": decoded.idResult},
                                        ACCESS_TOKEN_SECRET,
                                        {expiresIn: '15m'}
                                    );
                                    const roles = 1050;
                                    res.json({roles, accessToken, result: result[0]});
                                }
                                if(result[1].length > 0){
                                    if (err || result[1][0].idChef != decoded.idResult) return res.sendStatus(403);
                                    const accessToken = jwt.sign(
                                        {"idUser": decoded.idResult},
                                        ACCESS_TOKEN_SECRET,
                                        {expiresIn: '15m'}
                                    );
                                    const roles = 2050;
                                    res.json({roles, accessToken, result: result[1]});
                                }

                            }
                        );
                    }
                }
            )

}
module.exports = { handleRefreshToken }