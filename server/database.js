// ..recupera a conexão com o banco de dados postgresql
const { Client } = require("pg");
// ..recupera as informações da variável de ambiente
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

client.connect();

exports.execute = function (query, values) {
    return new Promise(function (resolve, reject) {
        // ..executa a comunicação com o db de acordo com a solicitação (select, insert, etc.)
        client.query(query,values, function (error,res) {
            if (error) {
                // ..se der BO ele retorna o erro, caso contrário as linhas de resposta
                reject(error);
            } else {
                resolve(res.rows);
            }
        })
    });
};

// return new Promise(funcion(resolve, reject) {
//     client.query(query, values, function (err, res) {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(res.rows);
//         }
//     });
// });