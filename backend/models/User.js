const mongoose = require('mongoose');
// //const {Schema} = mongoose;

// const main=async()=>{
//   await mongoose.connect("mongodb://0.0.0.0:27017/paras")
// const UserSchema = new mongoose.Schema({
//   name:{
//     type:String,
//   }
//   });
// const PersonModel = mongoose.model('p',UserSchema);
// let data = new PersonModel ({name:'sonu'});
// let result = await data.save();
// console.log(result);
// }
//   main();

const Userschema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})
const User = mongoose.model('user',Userschema)
User.createIndexes();
module.exports =  User