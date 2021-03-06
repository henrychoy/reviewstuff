const reviewDB = require('../reviewDB.js');
const Review = reviewDB.getModel();

module.exports = async (req , res , next) => {

    // get ID from URL, and all fields from edit page
    let id = req.body.id;
    let newReviewer = req.body.reviewer;
    let newCategory = req.body.category;
    let newSubject = req.body.subject;
    let newBody = req.body.body;
    let newRating = req.body.rating;

    // find review, set new values from edit form
    let review = await Review.findById(id);
    review.reviewer = newReviewer;
    review.category = newCategory;
    review.subject = newSubject;
    review.body = newBody;
    review.rating = newRating;

    // save review, redirect to display page
    await review.save();
    res.redirect('/reviews')

 };
