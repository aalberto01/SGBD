const express = require('express')
const app = express()
const port = 3000
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;



var config = {
    server: '65.49.81.163',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', // update me
            password: 'Grupo2020' // update me
        }
    },
    options: {
        // database: 'proyecto_final',
        database: 'Reservations',
        port: 4001,
        trustServerCertificate:true,
        rowCollectionOnRequestCompletion :true
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});

app.get('/', (req, res) => {
    var respuesta = (resultado) => {
        res.send(resultado);
    }
    Read(respuesta);
    // res.send('No se pudo')
});

function Read(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        'select * from client;',
        function (err, rowCount, rows) {
            if (err) {
                callback(err);
            } 
            else {
                console.log(rowCount + ' row(s) returned');
                callback(rows);
            }
        });

    // Execute SQL statement
    connection.execSql(request);
}
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))