require('dotenv').config();
	
var config = {  
	server: process.env.DB_SERVER,  //update me
	port: process.env.DB_PORT.toINT,
	authentication: {
		type: 'default',
		options: {
			userName: process.env.DB_USER, //update me
			password: process.env.DB_PASS  //update me
		}
	},
	options: {
	   // If you are on Microsoft Azure, you need encryption:
		encrypt: true,
		database: process.env.DB_NAME  //update me
	}
};  
	
const sql = require('mssql')

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))
	
module.exports = {
  sql, poolPromise
}