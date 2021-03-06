const reviewDB = require('../reviewDB.js');
const Review = reviewDB.getModel();
const Handlebars = require('handlebars');

// display reviews
module.exports = async (req , res , next) => {

    // set category dropdown if already filtered
    let filterAll, filterMovie, filterTV, filterBook, filterGame;
    if (req.body.filter === "All"){
        filterAll = 'selected'
    }
    if (req.body.filter === "Movie" || req.query.category === "Movie"){
        filterMovie = 'selected'
    }
    if (req.body.filter === "TV_Show" || req.query.category === "TV_Show"){
        filterTV = 'selected'
    }
    if (req.body.filter === "Book" || req.query.category === "Book"){
        filterBook = 'selected'
    }
    if (req.body.filter === "Video_Game" || req.query.category === "Video_Game"){
        filterGame = 'selected'
    }

    let reviews;
    let numberAll, numberCategory;

    // regex for findSubject to find closest and disregard case
    let regex = new RegExp(req.body.findSubject, 'i')

    // get reviewer from URL, regex will find closest and disregard case
    let currentReviewer = req.params.reviewer;
    let regexReviewer = new RegExp(req.params.reviewer);
    if (req.body.findReviewer){
        regexReviewer = new RegExp(req.body.findReviewer, 'i')
        currentReviewer = req.body.findReviewer
    }


    let filterCategory;

    // if not filtering category, search by subject and/or reviewer
    if ((!req.body.filter || req.body.filter === "All") && !req.query.category){
        reviews = await Review.find({subject: {$regex: regex}, reviewer: {$regex: regexReviewer}});
        req.body.filter = "All";
        numberAll = reviews.length;
        filterCategory = "All";
    }
    // else search by category, subject, and reviewer
    else{
        if(req.query.category){
            filterCategory = req.query.category;
        }
        else{
            filterCategory = req.body.filter;
        }

        reviews = await Review.find({category: filterCategory, subject: {$regex: regex}, reviewer: {$regex: regexReviewer}})
        numberCategory = reviews.length;
    }

    // map reviews to "results"
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

    // sort by rating logic
    let highest, lowest
    if (req.body.sort === "Highest First"){
        highest = 'selected'
    }
    if (req.body.sort === "Lowest First"){
        lowest = 'selected'
    }

    if (req.body.sort === "Lowest First"){
        results.sort(function(a, b){
            return a.rating - b.rating
        })
    }
    if (req.body.sort === "Highest First"){
        results.sort(function(a, b){
            return b.rating - a.rating
        })
    }

    // remove the underscore from TV_Show and Video_Game
    Handlebars.registerHelper("displayCategory", (category)=>{
        if(category === "TV_Show"){
            return "TV Show";
        }
        if(category === "Video_Game"){
            return "Video Game";
        }
        if(category === "Movie" || category === "Book"){
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

    // values to be used on display page
    res.render('displayReviewsView',
            {title:"List of Reviews",
             data:results,
             filterCategory: filterCategory,
             filterAll: filterAll,
             filterMovie: filterMovie,
             filterTV: filterTV,
             filterBook: filterBook,
             filterGame: filterGame,
             highest: highest,
             lowest: lowest,
             findSubject: req.body.findSubject,
             findReviewer: currentReviewer,
             numberAll: numberAll,
             numberCategory: numberCategory});
        
};
