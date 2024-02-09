const
express = require ('express')
database= require('./database')

// init app & middleware
const app = express();
database();
// db connection
let db;
// connectToDb ((err) => {
// if (!err) {
// app. listen(3000, () => {
// console. log('app listening on port 3000')
// })
// db=getDb()
// }
// })