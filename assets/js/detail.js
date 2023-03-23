const posterEl = $("#poster");
const titleEl = $("#title");
const descriptionEl = $("#description");
const directorEl = $("#director");
const genreEl = $("#genre");
const metascoreEl = $("#metascore");
const userscoreEl = $("#userscore");
const releaseDateEl = $("#release-date");
const recentReviewsEl = $("#recent-reviews");
const recentUserReviewsEl = $("#recent-user-reviews");


const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
console.log(urlParams.get('title'));


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3a98a28e7dmsh1d83ce3a7680f1bp16bc55jsn1d6758dbbe6f',
		'X-RapidAPI-Host': 'ny-times-movie-reviews.p.rapidapi.com'
	}
};


let title = urlParams.get('title');
let requestURL = `https://ny-times-movie-reviews.p.rapidapi.com/reviews/search.json?api-key=${_APIKEY_NYT_}&query=${title}&order=by-opening-date`;


let fetchReviews = function() {
    fetch(requestURL, options)
	    .then(response => response.json())
	    .then(response => {
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem(title, JSON.stringify(response.result));
            }
        })
	    .catch(err => console.error(err));
};



let loadReviewStorage = function() {
    let res = localStorage.getItem(title);
    if (res === null) {
        fetchReviews(title)
    }
    loadHTML(res, loadStrAvail(title));
};


let loadHTML = function(nytReview, strAvail) {
    posterEl.attr('src', strAvail.posterURL[500]);
    titleEl.text(title);
    directorEl.text(`Director: ${strAvail.directors[0]}`);
    descriptionEl.text(`Description: ${strAvail.overview}`);
    let genre = "";
    for (let i = 0; i < strAvail.genres.length; i++) {
        genre += `${strAvail.genres[i].name}`;
        if (i < strAvail.genres.length - 1) {
            genre += ", ";
        }
    }
    genreEl.text(`Genre: ${genre}`);
    metascoreEl.text(`IMDB Score: ${strAvail.imdbRating} (${strAvail.imdbVoteCount} voters)`);
    releaseDateEl.text(`Released: ${strAvail.year}`);

    for(let i = 0; i < 3 || i < nytReview.length; i++) {
        let newReview = $("<div>").addClass("row");
        newReview.append($("<h5>").text(`Review: ${nytReview.display_title}`));
        newReview.append($("<p>").text(`${nytReview.headline}`));
        newReview.append($("<p>").html(nytReview.summary_short));
        recentReviewsEl.append(newReview);
    }
    for(let i = 0; i < 3; i++) {
        let newReview = $("<div>").addClass("row");
        newReview.append($("<h5>").text(`Reviewer: ${res.recentUserReviews[i].name}`));
        newReview.append($("<p>").text(`Grade: ${res.recentUserReviews[i].grade}`));
        newReview.append($("<p>").text(`"${res.recentUserReviews[i].body}"`));
        recentUserReviewsEl.append(newReview);
    }
};


let loadStrAvail = function(title) {
    return JSON.parse(localStorage.getItem(title));
};




loadReviewStorage();


// *** DEFUNCT METACRITIC API CODE ***

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': _APIKEY_,
// 		'X-RapidAPI-Host': 'metacriticapi.p.rapidapi.com'
// 	}
// };

// let type = "movies";
// let title = "the-lord-of-the-rings-the-return-of-the-king";
// let reviews = "true";

// let requestURL = `https://metacriticapi.p.rapidapi.com/movies/${title}?reviews=${reviews}`;


// let fetchReviews = function() {
//     fetch(requestURL, options)
// 	.then(response => response.json())
// 	.then(response => {
//         console.log(response);
//         if (response.status === 200) {
//             localStorage.setItem(title, JSON.stringify(response.result));
//         }
        
//     })
// 	.catch(err => console.error(err));
// };


// let loadHTML = function(res) {
//     posterEl.attr('src', res.thumbnailUrl);
//     titleEl.text(res.title);
//     directorEl.text(`Director: ${res.director}`);
//     descriptionEl.text(`Description: ${res.description}`);
//     genreEl.text(`Genre: ${res.genre}`);
//     metascoreEl.text(`MetaCritic Score: ${res.metaScore}`);
//     userscoreEl.text(`Users' Score: ${res.userScore}`);
//     releaseDateEl.text(`Released: ${dayjs(res.releaseDate).format("YYYY")}`);

//     // TODO: add elements to container on html, 3 from critics, 3 from users

//     for(let i = 0; i < 3; i++) {
//         let newReview = $("<div>").addClass("row");
//         newReview.append($("<h5>").text(`Reviewer: ${res.recentReviews[i].name}`));
//         newReview.append($("<p>").text(`Grade: ${res.recentReviews[i].grade}`));
//         newReview.append($("<p>").text(`"${res.recentReviews[i].body}"`));
//         recentReviewsEl.append(newReview);
//     }
//     for(let i = 0; i < 3; i++) {
//         let newReview = $("<div>").addClass("row");
//         newReview.append($("<h5>").text(`Reviewer: ${res.recentUserReviews[i].name}`));
//         newReview.append($("<p>").text(`Grade: ${res.recentUserReviews[i].grade}`));
//         newReview.append($("<p>").text(`"${res.recentUserReviews[i].body}"`));
//         recentUserReviewsEl.append(newReview);
//     }
// }