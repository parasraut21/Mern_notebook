const express = require('express')
const dbconnect = require('./mongodb');
const app = express();


// Get data from databsse using api
app.get('/', async (req,resp)=>{
    let data = await dbconnect();
    data = await data.find().toArray();
    console.log(data);
   // resp.send({name:"Gucklone"});
   resp.send(data);
})


app.use(express.json());
app.post  ('/', async(req,res)=>{
   // console.log(req.body);//{ name: 'Konoharam' }
//    const createdata = new User(req.body);
//    const result = await createdata.save();
   //res.send(result);
 //  res.send({name:"Kali charan"})   //  "name": "Kali charan"
 let data = await dbconnect();
 let result = await data.insertOne(req.body);
 res.send(req.body);
  })



app.listen(5000);