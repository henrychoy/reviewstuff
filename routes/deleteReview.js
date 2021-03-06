const reviewDB = require('../reviewDB.js');
const Review = reviewDB.getModel();

module.exports = async (req , res , next) => {

    // get ID from URL, find review, render delete page
    let id = req.params.id;
    let review = await Review.findById(id);

    res.render('deleteReviewView',
        {title: "Delete Review?",
         reviewer: review.reviewer,
         category: review.category,
         subject: review.subject,
        body: review.body,
         rating: review.rating,
         id: review._id
      })


  };

  