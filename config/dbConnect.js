const mysql = require("mysql");


//creating a database connection, passing in the needed login-data
const connectDB =

        mysql.createConnection({
            multipleStatements: true,
            user: 'adminUsername',
            host: 'rds-booking-reg-system.cippyxna0z9o.us-east-1.rds.amazonaws.com',
            password: 'Mira_1987',
            database: '`registrationsystem`'

        });

module.exports = connectDB
