const express = require('express');
const app = express();
const sql = require("mssql");

//Credentials
const sqlConfig = {
    user: 'sql7617080',
    password: 'viasK1CvkH',
    database: 'sql7617080',
    server: 'sql7.freesqldatabase.com',
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}
const config = {
    port: 3306
};

function dbCon(query) {
    async () => {
        try {
            await sql.connect(sqlConfig)
            const result = await sql.query(query)
            return result
        }
        catch (error) {
            console.log(error)
        }
    }
}

export {
    dbCon
}