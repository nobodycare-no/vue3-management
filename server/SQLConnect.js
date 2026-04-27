const mysql = require('mysql')
const MySQLOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vue3_management'
}

const pool = mysql.createPool(MySQLOptions)

function SQLConnect(sql, arr, cb){
    pool.getConnection((err, connection) => {
        if(err){
            console.log(err)
            return
        }
        connection.query(sql, arr, (err, results) => {
            connection.release()
            if(err){
                console.log(err)
                return
            }
            cb(results)
        })
    })
}

module.exports = SQLConnect