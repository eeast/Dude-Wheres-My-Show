const posterEl = $("#poster");
const titleEl = $("#title");
const descriptionEl = $("#description");
const directorEl = $("#director");
const genreEl = $("#genre");
const imdbScoreEl = $("#imdbScore");
const userscoreEl = $("#userscore");
const releaseDateEl = $("#release-date");
const recentReviewsEl = $("#recent-reviews");
const recentUserReviewsEl = $("#recent-user-reviews");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '01deecf6cfmsh459b04bfafe4ea2p119498jsn337913ee3ea6',
		'X-RapidAPI-Host': 'ny-times-movie-reviews.p.rapidapi.com'
	}
};


let fetchReviews = function(title) {
    fetch(requestURL, options)
	    .then(response => response.json())
	    .then(response => {
            console.log(response);
            if (response.status === "OK") {
                localStorage.setItem(`Review->${title}`, JSON.stringify(response.results));
                loadHTML(response.results, loadStrAvail(title))
            }
        })
	    .catch(err => console.error(err));
};



let loadReviewStorage = function(title) {
    let res = JSON.parse(localStorage.getItem(`Review->${title}`));
    if (res === null) {
        fetchReviews(title);
    } else {
        loadHTML(res, loadStrAvail(title));
    }
};


let loadHTML = function(nytReview, strAvail) {
    console.log(nytReview);
    selected = strAvail[urlParams.get('index')];
    console.log(selected);

    posterEl.attr('src', selected.posterURLs[500]);
    titleEl.text(selected.title);
    if (selected.type === "movie") {
        directorEl.text(`Director: ${selected.directors[0]}`);
    } else {
        let creators = "";
        for (let i = 0; i < selected.creators.length; i++) {
            creators += `${selected.creators[i].name}`;
            if (i < selected.creators.length - 1) {
                creators += ", ";
            }
        }
        genreEl.text(`Creators: ${creators}`);
    }
    
    descriptionEl.text(`Description: ${selected.overview}`);
    let genre = "";
    for (let i = 0; i < selected.genres.length; i++) {
        genre += `${selected.genres[i].name}`;
        if (i < selected.genres.length - 1) {
            genre += ", ";
        }
    }
    genreEl.text(`Genre: ${genre}`);
    imdbScoreEl.text(`IMDB Score: ${selected.imdbRating} (${selected.imdbVoteCount} voters)`);
    if (selected.type === "movie") {
        releaseDateEl.text(`Released: ${selected.year}`);
    } else {
        releaseDateEl.text(`On Air: ${selected.firstAirYear} - ${selected.lastAirYear}`);
    }

    if (nytReview) {
        for(let i = 0; i < 3 && i < nytReview.length; i++) {
            console.log(nytReview[i].display_title);
            console.log(selected.title);
            if (nytReview[i].display_title === selected.title) {
                let newReview = $("<div>").addClass("row");
                newReview.append($("<h5>").text(`Review: ${nytReview[i].display_title}`));
                newReview.append($("<p>").html(`"${nytReview[i].summary_short}"`));
                newReview.append($("<p>").text(`-- ${nytReview[i].byline}`));
                newReview.append($("<div>").addClass("row right-align").append($("<a>").text("Read Full Article").attr('href', nytReview[i].link.url).attr('style','text-align: right;')));
                recentReviewsEl.append(newReview);
            }
        }
    }
    console.log(recentReviewsEl.size());
    if(recentReviewsEl.children().size() === 0) {
        recentReviewsEl.append($("<h5>").text(`😒 No Review Found from the New York Times.`));
    }
};


let loadStrAvail = function(title) {
    return JSON.parse(localStorage.getItem(title));
};



let titleURL = urlParams.get('title');
let strAvailResponse = loadStrAvail(titleURL);
let requestURL = `https://ny-times-movie-reviews.p.rapidapi.com/reviews/search.json?api-key=slI8i6532JxFn1hICjkNmQ1Qvq8arvJ7&query=${strAvailResponse[0].title}&order=by-opening-date`;
loadReviewStorage(strAvailResponse[0].title);


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