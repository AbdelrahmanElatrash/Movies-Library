const express=require('express');
const router=express.Router();
const pg=require('pg');

//  database connection ................................................

require('dotenv').config({ path: '.dotenv' });
const dataBaseURL=process.env.DATABASE_URL
const client = new pg.Client(dataBaseURL);  //'postgres://a@127.0.0.1:5432/moviesdb'
// console.log(dataBaseURL);

client.connect();
//  ###  routes   #############################################################
//  get all movies ........................................................
router.get('/',(req,res,next)=>{

    const sql='SELECT * FROM movies'
    client.query(sql)
    .then((data)=>{
        res.send(data.rows);
    })
    .catch((err)=>{
        next(err);
    })

})

//  get movie by id .........................................................
router.get('/:id',(req,res,next)=>{
    let id=req.params.id;
    const sql=`SELECT * FROM movies WHERE id=${id}`
    client.query(sql)
    .then((data)=>{
        
        res.status(200).json({"movie":data.rows})
    })
    .catch((err)=>{
        next(err);
    })
})

// post new movie   .....................................................
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

//  delete movie by id  ............................................................
router.delete('/:id',(req,res,next)=>{
    let id=req.params.id ;
    console.log(id);
    const sql=`DELETE FROM movies WHERE id=${id} ;`;

    client.query(sql)
    .then((data)=>{
        res.status(200).send("data wase deleted");
                              
    })
    .catch((err)=>{
        next(err);
    })
})

// edit movie by id ..................................................................
router.put('/:id',(req,res,next)=>{
    let id=req.params.id ;
    let data=req.body;
    console.log(data);
    let title=data.title;
    let release_date=data.relaseDate;
    let posterPath=data.posterPath;
    let overview=data.overVewo;

    const sql=`UPDATE movies SET title='${title}',release_date='${release_date}',posterPath='${posterPath}',overview='${overview}' WHERE id=${id} ;`;
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


//  exporting module  ...................................................
module.exports=router ;