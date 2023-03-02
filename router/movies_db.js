const express=require('express');
const router=express.Router();
const pg=require('pg');

//  database connection ................................................

require('dotenv').config({ path: '.dotenv' });
const dataBaseURL=process.env.DATABASE_URL
const client = new pg.Client(dataBaseURL);  //'postgres://a@127.0.0.1:5432/moviesdb'
// console.log(dataBaseURL);

client.connect();
//   routes   ..............................................................

router.get('/',(req,res,next)=>{
    client.query('SELECT * FROM movies')
    .then((data)=>{
        res.send(data.rows);
    })
    .catch((err)=>{
        next(err);
    })

})


router.post('/',(req,res,next)=>{
    let data=req.body;
    console.log(data);
    
    let title=data.title;
    let release_date=data.relaseDate;
    let posterPath=data.posterPath;
    let overview=data.overVewo;

    const sql=`INSERT INTO movies (title,release_date,posterPath,overview) VALUES('${title}','${release_date}','${posterPath}','${overview}');`
    client.query(sql)
    .then((data)=>{
        res.status(200).json({"data":{"title":title,
                                      "release_date":release_date,
                                      "posterPath":posterPath,
                                      "overview":overview
    }
})
    })
    .catch((err)=>{
        next(err);
    })
    
    
})





module.exports=router ;