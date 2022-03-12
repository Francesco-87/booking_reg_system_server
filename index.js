const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;


const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const verifyJWT = require('./middleware/verifyJWT');

const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');


//credentials and cookies
app.use(credentials);

//to read from own server
app.use(cors(corsOptions));

//handle urlencoded from data
app.use(express.urlencoded({extended: false}));

//middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


//routes
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/chefsTable', require('./routes/chefsTable'));
app.use('/allergens', require('./routes/allergens'));
app.use('/booking', require('./routes/booking'));

app.use(verifyJWT);




//Specifying which port to use
app.listen(PORT, () => {
    console.log('Running Server on Port: ' + PORT);
})

