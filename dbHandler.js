const express = require('express');
const app = express();
const sql = require("mysql");

//Credentials
const mysqlConnection = sql.createConnection({
  host       : 'sql7.freesqldatabase.com',
  user       : 'sql7617080',
  password   : 'viasK1CvkH',
  database   : 'sql7617080'
});


function dbCon(dbQuery)
{
  mysqlConnection.query(dbQuery, function(error, result) {
    if (error) {
      throw error
    }
    else {
      data = result
      console.log('Query = ' +  dbQuery + ', Result = ' + data)
      return result
    }
  })
}



exports =
{
 dbCon,
 mysqlConnection
}