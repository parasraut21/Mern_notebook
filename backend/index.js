 const express = require('express');
const { body, validationResult } = require('express-validator');
const BASE_URL = "http://localhost:5000";
const User = require('./models/User');
 const mongoose =require('mongoose');
 const PORT =  5000
 const bodyParser = require('body-parser');
 
 const cors = require('cors');
 
//mongoose.connect('mongodb://127.0.0.1:27017/login')
// mongoose.connect('your-connection-string', { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false, w: 'majority' });
const DB_URL = 'mongodb://0.0.0.0/notebook';
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

conn.once('open', () => {
    console.log("***********Mongo DB connected**********");
});
const app = express();
app.set("view engine","ejs");

app.get("/",(req,res)=>{
  res.render("index");
})

//cors

app.use(bodyParser.json());
app.use(cors());

//validation
var bcrypt = require('bcryptjs');

//token
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Parasisgoodb$oi"


app.post('/user', [
  body('name', 'Enter a valid name').isLength({ min: 1 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 1 }),
], async (req, res) => {
  let success=  false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    success = true;
    res.json({success, token })
    console.log(token)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 2) authenticate a user using post /login
app.post("/login",[  
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()],
  async (req,res)=>{
    let success=  false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=  false;
      return res.status(400).json({ success,errors: errors.array() });
    }
const {email,password} = req.body;
try {
  let user = await User.findOne({email});
  if(!user){
    success=  false;
    return res.status(400).json({success,errors:"Please try to login with correct login credentials"})
  }

  const comparePassword = await bcrypt.compare(password,user.password);
  if(!comparePassword){
    success=false;
    return res.status(400).json({success,errors:"Please try to login with correct login credentials"});
   
  }
  const data ={
    user:{
      id:user.id
    }
  }
   const token = jwt.sign(data,JWT_SECRET);
   success = true;
  res.json({success,token})

} catch (error) {
  console.error(error.message);
  res.status(500).send("something went wrong");
}

  })


// Route 3) get user details .
var fetchuser = require('./middleware/fetchuser') 
app.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


app.listen(PORT, () => {
  console.log(`iNotebook is listening on port http://localhost:${PORT}`)
})

//notes 
const dbconnect = require('./mongodb');
const Notes = require('./models/Notes');
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
app.get('/fetchallnotes', fetchuser, async (req, res) => {
 const notes = await Notes.find({user:req.user.id});
 res.json(notes);
})


// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
app.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 1 }),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 1 }),], async (req, res) => {
      try {
          const { title, description, tag } = req.body;

          // If there are errors, return Bad request and the errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
          const note = new Notes({
              title, description, tag, user: req.user.id
          })
          const savedNote = await note.save()

          res.json(savedNote)

      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required

app.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
      // Create a newNote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
app.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})


// app.post("/", async(req,res)=>{
//   const data = new User(req.body)
//   await data.save();
//   res.send(req.body);
//   res.send("saved");
//   })
  

//Available routes
//app.use('/api/auth',require('./routes/auth'))
// app.use('/api/notes',require('./routes/notes'))



// //middle ware
// const User = require("./models/User");
// app.use(express.json());
// //create user using : POST "/api/auth"  . Doesnt require auth
// app.post  ('/api/auth', async(req,res)=>{
//    const createdata = new User(req.body);
//    const result = await createdata.save();
//    res.send(result);
 
//   })



// //new // without mongoose
// const dbconnect = require('./mongodb')
// // const {MongoClient} = require('mongodb')
// // const url = "mongodb://0.0.0.0:27017";
// // const database ='paras';
// // const client = new MongoClient(url);

// // async function  dbconnect(){                      // this code is being transfered to mongodb file for separete connection file
// //   let result = await client.connect();
// //   let db = result.db(database);
// //  return  collection = db.collection("p");
// //   // let collection = db.collection("p");
// //   // let responce = await collection.find({}).toArray(); making another fil for this to keep collection separate .
// //   //      console.log(responce);
// // }

// //dbconnect(); returning promise so we can handle promise by two ways 1) async await 2) promise
// //console.warn(dbconnect()); //Promise { <pending> }

// // // 1) promise
// // dbconnect().then((resp)=>{
// //   //console.log(resp.find().toArray()); //Promise { <pending> }
// //   resp.find().toArray().then((data)=>{
// //     console.log(data); // will be getting actual mongodb data
// //   })
// // })

// // 2) async await 
// const main = async ()=>
// {
// let data = await dbconnect();
// data = await data.find().toArray();
// console.warn(data);
// } 

// main(); // will be getting actual data from mongodb

//new With mongoose


//yt
// const mongoose = require('mongoose');
// const main=async()=>{
//   await mongoose.connect("mongodb://127.0.0.1:27017/paras")
// const UserSchema = new mongoose.Schema({
//   name:String,email:String,password:String
//  } );
// const PersonModel = mongoose.model('p',UserSchema);
// let data = new PersonModel 
// (
// {name:"yoyo",email:"Parasrau511@gmail.com",password:"12356344242"}
// );
// let result = await data.save();
// console.log(result); // { _id: 641971ed90f7a730b00d489f, name: 'sonu', __v: 0 }
// }
//   main();