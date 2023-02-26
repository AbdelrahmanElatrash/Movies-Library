const express=require('express');
const app=express();

const cors = require('cors');
app.use(cors());

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



const moviesRoutes=require('./router/movie');



app.use('/',moviesRoutes);

app.use(errorHandler);
app.use(invalidPathHandler);

module.exports=app ;