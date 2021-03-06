const reviewDB = require('../reviewDB.js');
const Review = reviewDB.getModel();

module.exports = async (req , res , next) => {
 
    // get values from add new review form
    let reviewer = req.body.reviewer;
    let category = req.body.category;
    let subject = req.body.subject;
    let body = req.body.body;
    let rating = req.body.rating;

    // create new review
    let review = new Review({
        reviewer: reviewer,
        category: category,
        subject: subject,
        body: body,
        rating: rating
    })

    // save review and redirect to display page
    await review.save();
    res.redirect('/reviews');
  };
