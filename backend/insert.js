const dbconnect = require('./mongodb');

const insertOne = async ()=>{
   // console.log("insert");
   const db = await dbconnect();
  // console.log(db); //Promise { <pending> } // after adding async await will be getting actual data
  const result = await db.insertOne(
      {name:"paras" , email:"gucklone69@gmail.com"}  // single data insertion 
    //formultiple data use array
//  [ 
//         {name:"Gucklone" , email:"gucklone69@gmail.com"},
//         {name:"Gulli" , email:"gulli69@gmail.com"}
//     ]
  )
  //console.log(result);// details 
  if(result.acknowledged){
      console.log("Data Inserted");
  }
  else{
      console.log("Error");
  }
}
insertOne();