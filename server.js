
import {Movies } from "./modules.js";
import express from 'express';
import data from"./data/data.json" assert { type: "json" } ;

const app = express()

import cors from 'cors';

app.use(cors());



// ####################################################################################################

  




// #######  home page  #############################################################
app.get('/', (req, res,next) => {

    
      let result=data.moviesData.map((item)=>{
      let newMovie=new Movies(item.id,item.title,item.posterPath,item.overview);
      console.log(newMovie);
      return newMovie ;
}) 
    res.json({result})
    

  
  })


// ########  favorite page  ######################################################
app.get('/favorite', (req, res,next) => {
    res.send("Welcome to Favorite Page")
});



// ###########  error handler   ######################################################

const errorHandler = (err, req, res,next)=> {
  // Error handling middleware functionality
  console.error(err.stack)
  res.status(err.status || 500);
  res.json({err:{"status":500,
             'message':"internal server error"}
    
})
}


const invalidPathHandler = (req, res) => {
  res.status(404)
  res.json({error:{status:404,
                'message':'not found'}
                 })
  
}

app.use(errorHandler);
app.use(invalidPathHandler);


// #####################################################
const PORT=3000;
app.listen(PORT,()=>{
      console.log("hello world");
  })