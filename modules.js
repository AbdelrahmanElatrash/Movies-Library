

class Movies{
    constructor(id,title,release_date,posterPath,overview){
        this.id=id;
        this.title=title;
        this.release_date=release_date;
        this.posterPath=posterPath;
        this.overview=overview
    }
    // renderFormat(){
    //     let dataJson=json({
    //         "id":this.id,
    //         "title":this.title,
    //         "poster_path":this.poster_path,
    //         "overview":this.overview
    //     })
    //     return dataJson ;
    // }

};

// function Movie(id,title,poster_path,overview){
//     this.id=id;
//     this.title=title;
//     this.poster_path=poster_path;
//     this.overview=overview
// }

// console.log(spiderMan);

// export  {Movies} ;
module.exports=Movies;