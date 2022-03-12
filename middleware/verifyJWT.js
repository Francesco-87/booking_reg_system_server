const jwt = require("jsonwebtoken");


//Verifying the authentication

const verifyJWT = function (req, res, next) {
    const authHeader = req.header.authorization || req.header.Authorization;

    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.send(403) //invalid token
            req.idUser = decoded.idResult;
            next();

        })
}
module.exports = verifyJWT