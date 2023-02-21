const express = require('express')
const app = express()


// #######  home page  #############################################################
app.get('/', (req, res) => {

    res.json({ "title": "Spider-Man: No Way Home",
    "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."

    })
  })


// ########  favorite page  ######################################################
app.get('/favorite', (req, res) => {
    res.send("Welcome to Favorite Page")
});



// ###########  error handler   ######################################################

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(404).send('page not found error')
  });


const PORT=3000;
app.listen(PORT,()=>{
    console.log("hello world");
})