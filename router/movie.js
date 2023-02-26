const express=require('express');
const router=express.Router();
const axios = require('axios');
const data = require('./../data/data.json');
const Movies = require('./../modules')


require('dotenv').config({ path: '.dotenv' });
const APIKEY = process.env.APIKEY


// ##########################################################################
router.get('/', (req, res) => {


    let result = data.moviesData.map((item) => {
      let newMovie = new Movies(item.id, item.title, item.posterPath, item.overview);
      console.log(newMovie);
      return newMovie;
    })
    res.json({ result })
})

router.get('/favorite', (req, res) => {
    res.send("Welcome to Favorite Page")
  });


// ####### trending page #############################################################
router.get('/trending', (req, res,next) => {
    try {
      const trendingURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}`;
      axios.get(trendingURL)
        .then((result) => {
  
          
          let movieResult = result.data.results;
          let finalResult = movieResult.map((item) => {
            let singleMovie = new Movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
            return singleMovie;
          }
          );
          
          res.send(finalResult);
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
  
    }
    catch (err) {
      next(err);
    }
  
  })
  
  // ########### search a movie ######################################################
  router.get('/search/:movie_name', (reg, res,next) => {
    let movieName=reg.params.movie_name
    // console.log(movieName);
    try {
      const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${movieName}`;
      axios.get(searchURL)
      .then((result) => {
          // console.log(result.data.results);
          let movieResult=result.data.results
          if(movieResult.length>0){
            
            // console.log(movieResult.length);
            let finalResult = movieResult.map((item) => {
            let singleMovie = new Movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
            return singleMovie;
          }
          );
          res.send(finalResult);
          }else{res.json({'messag':`no much found as ${movieName}`})}
          
        })
  
        .catch ((err) => {
          console.log(err);
          
        })
  
    }
    catch (err) {
      next(err)
    }
  
  });
  
  // ####### popular movie   #########################################################3
  router.get('/popular', (req, res, next) => {
    try {
      const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`;
      axios.get(popularURL)
        .then((result) => {
  
          
          let movieResult = result.data.results;
          let finalResult = movieResult.map((item) => {
            let singleMovie = new Movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
            return singleMovie;
          }
          );
          
          res.send(finalResult);
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
  
    }
    catch (err) {
      next(err);
    }
  
  })
  // ###########  get spesific movie   ################################################
  router.get('/discover', (reg, res,next) => {
    
    try {
      const searchURL = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`;
      axios.get(searchURL)
      .then((result) => {
          
          let movieResult=result.data.results
          let finalResult = movieResult.map((item) => {
            let singleMovie = new Movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
            return singleMovie;
          }
          );
          
          res.send(finalResult);
        })
  
        .catch ((err) => {
          console.log(err);
          next(err)
        })
  
    }
    catch (err) {
      next(err);
    }
  
  });

module.exports=router ;