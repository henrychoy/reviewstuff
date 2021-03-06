var express = require('express');
var router = express.Router();

const reviewDB = require('../reviewDB.js');
const Review = reviewDB.getModel();

const Handlebars = require('handlebars');

// other modules
let displayReviews = require("./displayReviews");
let addReview = require("./addReview");
let saveReview = require("./saveReview");
let editReview = require("./editReview");
let saveAfterEdit = require("./saveAfterEdit");
let deleteReview = require("./deleteReview");
let deleteReviewAfterConfirm = require("./deleteReviewAfterConfirm");
let metrics = require("./metrics");

// router specs
router.get('/', function(req, res, next) {
  res.redirect('/reviews');
});

router.get('/reviews', displayReviews);
router.post('/reviews', displayReviews);
router.get('/reviews/reviewer/:reviewer', displayReviews);

router.get('/reviews/add', addReview);
router.post('/reviews/add', saveReview);

router.get('/reviews/edit/:id', editReview);
router.post('/reviews/edit/', saveAfterEdit);

router.get('/reviews/delete/:id', deleteReview);
router.post('/reviews/delete', deleteReviewAfterConfirm);

router.get('/reviews/metrics', metrics);
router.post('/reviews/metrics', metrics);

// REST API endpoints - use URL http://localhost:3000/api?category=&reviewer=&subject=&sort=
router.get('/api', async function(req,res){

  let reviews;
  let categoryName;
  let numberAll;
  let numberCategory;

  if (!req.query.category){
    categoryName = "All";
  }
  else{
    categoryName = req.query.category;
  }
 

  let filterAll, filterMovie, filterTV, filterBook, filterGame;
  if (req.query.category === "All" || req.query.category === "all"){
      filterAll = 'selected'
  }
  if (req.query.category === "Movie" || req.query.category === "movie"){
      filterMovie = 'selected'
  }
  if (req.query.category === "TV_Show" || req.query.category === "tv_show" || req.query.category === "tv"){
      filterTV = 'selected'
  }
  if (req.query.category === "Book" || req.query.category === "book"){
      filterBook = 'selected'
  }
  if (req.query.category === "video_game" || req.query.category === "Video_Game" || req.query.category === "game"){
      filterGame = 'selected'
  }


  // get query from URL, disregard exact match and upper/lower case
  let category = new RegExp(req.query.category, 'i');
  let reviewer = new RegExp(req.query.reviewer, 'i');
  let subject = new RegExp(req.query.subject, 'i');

  reviews = await Review.find({subject: {$regex: subject}, reviewer: {$regex: reviewer}, category: {$regex: category}})
  if (!req.query.category){
    numberAll = reviews.length;
  }
  else{
    numberCategory = reviews.length;
  }


  let results = reviews.map( rev => {
    return {
      id: rev._id,
      reviewer: rev.reviewer,
      category: rev.category,
      subject: rev.subject,
      body: rev.body,
      rating: rev.rating
    }
  });


  let highest, lowest
  if (req.query.sort === "descending"){
      highest = 'selected'
  }
  if (req.query.sort === "ascending"){
      lowest = 'selected'
  }

  if (req.query.sort === "ascending"){
      results.sort(function(a, b){
          return a.rating - b.rating
      })
  }
  if (req.query.sort === "descending"){
      results.sort(function(a, b){
          return b.rating - a.rating
      })
  }


  res.format({
    'application/json': () => {
      res.json(results);
    },

    'application/xml': () => {
      let xml =
          '<?xml version="1.0"?>\n' +
          `<reviews category=${categoryName} reviewer=${req.query.reviewer} subject=${req.query.subject} sort=${req.query.sort}>\n` +
          results.map((c) => {
            return `   <entry category="${c.category}" reviewer="${c.reviewer}" subject="${c.subject}" body="${c.body}" rating="${c.rating}" />`
      }).join('\n') + '\n</reviews>\n';

      res.type('application/xml');
      res.send(xml);
    },

    'text/html': () => {
        res.type('text/html');
        res.render('displayReviewsView',
            {title:"List of Reviews",
              data:results,
              filterCategory: categoryName,
              numberAll: numberAll,
              numberCategory: numberCategory,
              css: css,
              filterAll: filterAll,
              filterMovie: filterMovie,
              filterTV: filterTV,
              filterBook: filterBook,
              filterGame: filterGame,
              highest: highest,
              lowest: lowest,
              findSubject: req.query.subject,
              findReviewer: req.query.reviewer
              })
    }

  })

});

// remove underscore from TV_Show and Video_Game
Handlebars.registerHelper("displayCategory", (category)=>{
  if(category === "TV_Show" || category === "tv_show" || category === "tv"){
      return "TV Show";
  }
  if(category === "Video_Game" || category === "video_game" || category === "game"){
      return "Video Game";
  }
  if(category === "Movie" || category === "movie" || category === "Book" || category === "book"){
      return category;
  }
  else{
    return "All"
}
})

// take rating and display css stars
Handlebars.registerHelper("stars", (rating)=>{
  if (rating === 5){
    return "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n"
  }
  if (rating === 4){
    return "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star unchecked\"></span>"
  }
  if (rating === 3){
    return "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star unchecked\"></span>" +
        "<span class=\"fa fa-star unchecked\"></span>"
  }
  if (rating === 2){
    return "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star unchecked\"></span>" +
        "<span class=\"fa fa-star unchecked\"></span>" +
        "<span class=\"fa fa-star unchecked\"></span>"
  }
  if (rating === 1){
    return "<span class=\"fa fa-star checked\"></span>\n" +
        "<span class=\"fa fa-star unchecked\"></span>" +
        "<span class=\"fa fa-star unchecked\"></span>" +
        "<span class=\"fa fa-star unchecked\"></span>" +
        "<span class=\"fa fa-star unchecked\"></span>"
  }
})

// this CSS is needed because when viewing the HTML in postman, it doesn't grab the CSS file
let css = "<style> body{\n" +
    "    background-color: #d0e6ff;\n" +
    "    font-family: Verdana, sans-serif;\n" +
    "}\n" +
    "\n" +
    "main{\n" +
    "    background-color: white;\n" +
    "    margin: 1em auto 3em auto;\n" +
    "    width: 50%;\n" +
    "    padding: 1em;\n" +
    "}\n" +
    "\n" +
    ".checked {\n" +
    "    color: orange;\n" +
    "}\n" +
    "\n" +
    ".unchecked {\n" +
    "    padding-right: 4px;\n" +
    "}\n" +
    "\n" +
    "button{\n" +
    "    padding: .5em;\n" +
    "    font-size: larger;\n" +
    "    background-color: #eaffce;\n" +
    "\n" +
    "    margin-bottom: 1em;\n" +
    "}\n" +
    "\n" +
    "button:hover{\n" +
    "    background-color: lightblue;\n" +
    "    transition: .25s;\n" +
    "} </style>"

module.exports = router;
