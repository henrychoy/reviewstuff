const reviewDB = require('../reviewDB.js');
const Review = reviewDB.getModel();

module.exports = async (req , res , next) => {

    // get ID from URL and find review to edit
    let id = req.params.id;
    let review = await Review.findById(id);

    // set category dropdown
    let movie, tv, book, game
    if (review.category === "Movie"){
        movie = 'selected'
    }
    if (review.category === "TV_Show"){
        tv = 'selected'
    }
    if (review.category === "Book"){
        book = 'selected'
    }
    if (review.category === "Video_Game"){
        game = 'selected'
    }

    // set stars radio buttons
    let star5, star4, star3, star2, star1
    if (review.rating === 5){
        star5 = "checked"
    }
    if (review.rating === 4){
        star4 = "checked"
    }
    if (review.rating === 3){
        star3 = "checked"
    }
    if (review.rating === 2){
        star2 = "checked"
    }
    if (review.rating === 1){
        star1 = "checked"
    }

    // values to be used on edit page
    res.render('editReviewView',
           {title: "Edit a Review",
            reviewer: review.reviewer,
            movie: movie,
            tv: tv,
            book: book,
            game: game,
            subject: review.subject,
            body: review.body,
            rating: review.rating,
            id: review._id,
            star5: star5,
            star4: star4,
            star3: star3,
            star2: star2,
            star1: star1,})
    
};

