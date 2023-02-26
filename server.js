
import {Movies } from "./modules.js";
import express from 'express';
import data from"./data/data.json" assert { type: "json" } ;

const app = express()

import cors from 'cors';

app.use(cors());



// ####################################################################################################

  




// #######  home page  #############################################################
app.get('/', (req, res) => {

    
    let result=data.moviesData.map((item)=>{
      let newMovie=new Movies(item.id,item.title,item.posterPath,item.overview);
      console.log(newMovie);
      return newMovie ;
}) 
    res.json({result})
    

  
  })


// ########  favorite page  ######################################################
app.get('/favorite', (req, res) => {
    res.send("Welcome to Favorite Page")
});



// ###########  error handler   ######################################################

app.use((req, res, next) => {
  const error=new Error('not foun');
  error.status=404;
  next(error);
  });

app.use((error, req, res, next) => {

    console.error(error.stack)
    res.status(error.status || 500);
    res.json({
            error:{message:' sorry internal server error'}
    })
  });

// #####################################################
const PORT=3000;
app.listen(PORT,()=>{
      console.log("hello world");
  })