const reviewDB = require('../reviewDB.js');
const Review = reviewDB.getModel();

module.exports =  async (req , res , next) => {

    // get ID from URL, find review, delete, redirect to main review page
    let id = req.body.id;
    let review = await Review.findById(id);

    if (!review){
        res.render('404');
    }
    else{
        await review.remove();
        res.redirect('/reviews')
    }
    
};

  