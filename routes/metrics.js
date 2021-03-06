const reviewDB = require('../reviewDB.js');
const Review = reviewDB.getModel();
const Handlebars = require('handlebars');


module.exports = async (req , res , next) => {

    reviews = await Review.find({});

    let countMovie = 0;
    let countTV = 0;
    let countBook = 0;
    let countGame = 0;
    let countAll = reviews.length;

    let arrayMovie = [];
    let arrayTV = [];
    let arrayBook = [];
    let arrayGame = [];
    let arrayAll = [];

    // count review categories and unique reviewers
    for (let i = 0; i < reviews.length; i ++){
        if (reviews[i].category === "Movie"){
            countMovie ++;
            if (!arrayMovie.includes(reviews[i].reviewer)){
                arrayMovie.push(reviews[i].reviewer);
            }
        }
        if (reviews[i].category === "TV_Show"){
            countTV ++;
            if (!arrayTV.includes(reviews[i].reviewer)){
                arrayTV.push(reviews[i].reviewer);
            }
        }
        if (reviews[i].category === "Book"){
            countBook ++;
            if (!arrayBook.includes(reviews[i].reviewer)){
                arrayBook.push(reviews[i].reviewer);
            }
        }
        if (reviews[i].category === "Video_Game"){
            countGame ++;
            if (!arrayGame.includes(reviews[i].reviewer)){
                arrayGame.push(reviews[i].reviewer);
            }
        }

        if(!arrayAll.includes(reviews[i].reviewer)){
            arrayAll.push(reviews[i].reviewer)
        }

    }
    

    let movieReviewers = arrayMovie.length;
    let tvReviewers = arrayTV.length;
    let bookReviewers = arrayBook.length;
    let gameReviewers = arrayGame.length;
    let allReviewers = arrayAll.length

    // values used on the page
    res.render('metrics',
            {title:"Metrics",
             countMovie: countMovie,
             countTV: countTV,
             countBook: countBook,
             countGame: countGame,
             countAll: countAll,
             movieReviewers: movieReviewers,
             tvReviewers: tvReviewers,
             bookReviewers: bookReviewers,
             gameReviewers: gameReviewers,
             allReviewers: allReviewers,
             arrayAll: arrayAll});
        
};
