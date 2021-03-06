const ReviewDB = require('./reviewDB.js');

const Review = ReviewDB.getModel();

(async() => {

	await Review.deleteMany({});

	let review1 = new Review({
		reviewer: 'Henry',
		category: 'Movie',
		subject: 'Good Burger',
		body: 'This is the greatest movie ever made.',
		rating: 5
	}); 

	let review2 = new Review({
		reviewer: 'Joe',
		category: 'TV_Show',
		subject: 'Stranger Things',
		body: 'This was just an ok show, not sure what the hype is all about.',
		rating: 3
	}); 

	let review3 = new Review({
		reviewer: 'Sarah',
		category: 'Book',
		subject: 'The Giver',
		body: 'My favorite childhood book!  Highly recommended!',
		rating: 5
	});

	let review4 = new Review({
		reviewer: 'Henry',
		category: 'Video_Game',
		subject: 'Cyberpunk 2077',
		body: 'Cool game, but lots of bugs...',
		rating: 2
	});

	let review5 = new Review({
		reviewer: 'Henry',
		category: 'Book',
		subject: 'A Wrinkle in Time',
		body: 'I really did not like this book, story didnt make sense.',
		rating: 1
	});

	let review6 = new Review({
		reviewer: 'Sarah',
		category: 'Book',
		subject: 'A Brief History of Time',
		body: 'Awesome book by Stephen Hawking.  Very fascinating!',
		rating: 4
	});

	let review7 = new Review({
		reviewer: 'Dan',
		category: 'TV_Show',
		subject: 'Breaking Bad',
		body: 'Best show ever on netflix!!!',
		rating: 5
	});

	let review8 = new Review({
		reviewer: 'Andy',
		category: 'TV_Show',
		subject: 'Ozark',
		body: 'Very good show!  I binged the whole thing!',
		rating: 5
	});

	let review9 = new Review({
		reviewer: 'Rachel',
		category: 'Movie',
		subject: 'Star Wars: Rise of Skywalker',
		body: 'This was a good, but not perfect ending to the latest trilogy.',
		rating: 4
	});

	let review10 = new Review({
		reviewer: 'Henry',
		category: 'Video_Game',
		subject: 'Zelda: Breath of the Wild',
		body: 'Im a huge Zelda fan but I did not like this game.',
		rating: 2
	});

	let review11 = new Review({
		reviewer: 'Henry',
		category: 'Movie',
		subject: 'Star Wars: The Phantom Menace',
		body: 'This movie sucked.',
		rating: 1
	});

	let review12 = new Review({
		reviewer: 'Henry',
		category: 'Book',
		subject: 'War and Peace',
		body: 'This book was boring',
		rating: 1
	});

	let review13 = new Review({
		reviewer: 'Rachel',
		category: 'Movie',
		subject: 'War of the Worlds',
		body: 'Cool movie!',
		rating: 4
	});

	let review14 = new Review({
		reviewer: 'Andy',
		category: 'Video_Game',
		subject: 'Call of Duty - Warzone',
		body: 'Pretty fun shooter',
		rating: 3
	});

	await Promise.all([
			review1.save(),
			review2.save(),
			review3.save(),
			review4.save(),
			review5.save(),
			review6.save(),
			review7.save(),
			review8.save(),
			review9.save(),
			review10.save(),
			review11.save(),
			review12.save(),
			review13.save(),
			review14.save()
		]);

	let loadReviews = await Review.find({});

	console.log(loadReviews);

	process.exit();


})();












