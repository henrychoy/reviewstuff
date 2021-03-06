Henry Choy
Review Stuff Web App

Instructions
Run "npm install" to install the node dependency modules.
Run "initDB" to load some sample reviews (optional).
Run "server" and in a browser go to "http://localhost:3000/reviews"
To get data using API in json/XML/HTML format, use Postman and use URL:
http://localhost:3000/api?category=&reviewer=&subject=&sort=

available API query values:
category = movie, tv_show, book, video_game
reviewer = name of reviewer you're searching for
subject = name of subject you're searching for
sort = ascending, descending

Overview
"Review Stuff!" is a web app that allows you to read and write reviews.
It is built using node, handlebars, mongoDB.

Works Cited
For the star hover behavior in the add and edit review screens, I used
code from this site: https://codepen.io/hesguru/pen/BaybqXv?editors=1100

