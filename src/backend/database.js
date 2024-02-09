// const mongoose = require('mongoose')

// connectMonggose =() =>{
//   mongoose. connect ("mongodb+srv://root:root@contactskeeper.lf9uf.mongodb.net/?retryWrites=true&w=majority",
// {

//   useNewUrlParser: true
//   })
//   .then ((e)=>console.log("Connected to Mongodb =>> E-comm") )
//   .catch((e)=>{console. log("Not Connect Mongodb"); console.log(e) ;})
//   }


// connectMonggose();

const mongoose = require('mongoose');

// const env = require('./env.json');

class DbUtil {
    static async dbConnect() {
        try {
            console.log('Enter DbUtil - dbConnect');
            await mongoose.connect(`mongodb+srv://new:test234@jobhire.ix7mfjp.mongodb.net/`);
            console.log('Mongo DB connected....');
            console.log('Exit DbUtil - dbConnect');
        } catch (err) {
            console.log('Error DbUtil - dbConnect', err);
            process.exit(1);
        }
    }
}
DbUtil.dbConnect();
module.exports = DbUtil;