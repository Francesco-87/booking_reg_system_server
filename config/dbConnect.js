const mysql = require("mysql");


//creating a database connection, passing in the needed login-data
const connectDB =

        mysql.createConnection({
            multipleStatements: true,
            host     : process.env.RDS_HOSTNAME,
            user     : process.env.RDS_USERNAME,
            password : process.env.RDS_PASSWORD,
            port     : process.env.RDS_PORT,
            database: 'registrationsystem'

        });

module.exports = connectDB
