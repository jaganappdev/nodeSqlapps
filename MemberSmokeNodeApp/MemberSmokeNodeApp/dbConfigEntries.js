const sql = require('mssql/msnodesqlv8')

//By default, Node -> SQL server auth

const conn_uat = new sql.ConnectionPool({
    database: 'EBM',
    server: 'vegauat',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    },
    //to execute multiple Queries at a time
    multipleStatements: true
});


const conn_test = new sql.ConnectionPool({
    database: 'EBM',
    server: 'vegatest',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    },
    multipleStatements: true
});

const conn_dev = new sql.ConnectionPool({
    database: 'EBM',
    server: 'vegadev',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    },
    multipleStatements: true
});


module.exports = function (msg) {

    if (msg == 'uat') {  return conn_uat; }
    else if (msg == 'test') { return conn_test;  }
    else { return conn_dev; }
    
}