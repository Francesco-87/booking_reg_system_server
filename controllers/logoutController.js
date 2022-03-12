const db = require('../config/dbConnect')


//logout
    const handleLogout = async (req, res) => {

//on client, also delete the accessToken
  const cookies = req.cookies;

 if (!cookies?.jwt) return res.sendStatus(204); //no content available
      

        const refreshToken = cookies.jwt;

//is refreshToken in db
                db.query("UPDATE registrationsystem.customers SET customer_refreshToken = null WHERE customer_refreshToken = ?; UPDATE  registrationsystem.chefs SET chef_refreshToken = null WHERE chef_refreshToken = ?;",
                    [refreshToken, refreshToken],
                    (err, result) => {
                        if (err) {
                            res.send({err: err})
                        }
                        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true, }); //secure: true - only serves on https
                        res.sendStatus(204);
                    }

                );
            }
module.exports = {handleLogout}