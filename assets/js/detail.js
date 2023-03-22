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

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': _APIKEY_,
		'X-RapidAPI-Host': 'metacriticapi.p.rapidapi.com'
	}
};

let type = "movies";
let title = "the-lord-of-the-rings-the-return-of-the-king";
let reviews = "true";

let requestURL = `https://metacriticapi.p.rapidapi.com/movies/${title}?reviews=${reviews}`;


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
        res = {
            director:"Peter Jackson",
            title:"The Lord of the Rings: The Return of the King",
            description:"Sauron's forces have laid siege to Minas Tirith, the capital of Gondor, in their efforts to eliminate the race of men. The once-great kingdom, watched over by a fading steward, has never been in more desperate need of its king. But can Aragorn (Viggo Mortensen) answer the call of his heritage and become what he was born to be? In no small measure, the fate of Middle-earth rests on his broad shoulders. [New Line Cinema]",
            genre:"Action, Adventure, Fantasy",
            thumbnailUrl:"https://static.metacritic.com/images/products/movies/1/cd58fe33df13cc2b3d1d813845bbbc7f-250h.jpg",
            metaScore:94,
            userScore:91,
            releaseDate:"2003-12-17T00:00:00",
            recentReviews: [{
                name:"Joe Morgenstern",
                date:null,
                grade:100,
                body:"The invisible wizard Peter Jackson makes use of every scene to show us the meaning of magnificence. Never has a filmmaker aimed higher, or achieved more."
            }, {
                name:"Lisa Schwarzbaum",
                date:null,
                grade:100,
                body:"The conclusion of Peter Jackson's masterwork is passionate and literate, detailed and expansive, and it's conceived with a risk-taking flair for old-fashioned movie magic at its most precious."
            }, {
                name:"William Arnold",
                date:null,
                grade:100,
                body:"First and foremost, it soars because its grand design and numerous story problems were worked out half a century ago by a guy named Tolkien, and Jackson was smart enough to realize this."
            }, {
                name:"Michael Wilmington",
                date:null,
                grade:100,
                body:"Like all great fantasies and epics, this one leaves you with the sense that its wonders are real, its dreams are palpable."
            }, {
                name:"Alan Morrison",
                date:null,
                grade:100,
                body:"Those who have walked beside these heroes every step of the way on such a long journey deserve the emotional pay-off as well as the action peaks, and they will be genuinely touched as the final credits roll."
            }, {
                name:"Roger Ebert",
                date:null,
                grade:88,
                body:"There is little enough psychological depth anywhere in the films, actually, and they exist mostly as surface, gesture, archetype and spectacle. They do that magnificently well, but one feels at the end that nothing actual and human has been at stake."
            }, {
                name:"David Sterritt",
                date:null,
                grade:50,
                body:"Add a lot of dull acting -- except Sir Ian McKellen and Andy Serkis -- and you have an uneven movie with yawns aplenty."
            }],
            recentUserReviews: [{
                name:"Naurbereth",
                date:"2018-06-15T00:00:00",
                grade:100,
                body:"This review contains spoilers, click expand to view. People who give this movie a negative review have probably not seen the movies or have very bad taste. The Return of the King concludes this epic saga originally by J.R.R Tolkien and created by Peter Jackson. From the beginning to the end the movie is superb. First of all the actors there are som many talented actors who like Ian Mckellen, Viggo Mortensen, Cate Blanchett, David Wenham, Elijah Wood, Andy Serkis.. The list goes on and on. Everyone plays their parts spot on. The sets are absolutely beautiful and very much like i imagined them as a book reader. The music by Howard Shore is a fantastic masterpiece and undoubtedly the best movie score ever made (well worth of the oscars). The script is very well written and the movie never gets its low point, there is constantly something happening. I have to say im a huge Tolkien fan and i really think even if there was some differences from the books i think all of the movie adaptions made justice to the books. Last of all if i don't want to go on forever praising the movie is talking about 'The Battle of the Pelennor Fields'. This scene is the absolutely most beautiful scene i have ever seen, heard and felt on the big screen. From the arrival of the Rohirrim and seeing Minas Tirith under siege by this great evil army, Theodens speech, 'Deeeatth' and then the charge. There simply is no word to describe the epic ness of this scene. Well done Peter Jackson and i don't think the Amazon series can do anything measuring up to this."
            }, {
                name:"WheelzFourReelz",
                date:"2014-12-29T00:00:00",
                grade:100,
                body:"The trilogy ends with the best film, in my opinion. Everything about this movie is done perfectly, like the other previous films, but this movie adds in even more heart, even more action, and even more character development. All those aspects, combined with an ending that made me cry, definitely makes this a shining example of what films should strive to accomplish; an epic in every sense of the word. This is my favorite movie of all time."
            }, {
                name:"JawsPapi87",
                date:"2011-08-09T00:00:00",
                grade:100,
                body:"It's a perfect epic. There's not one false step. The battles are incredible, the characters just as fun as ever. This movie is basically flawless. One of the best ever"
            }, {
                name:"Dom007",
                date:"2021-03-05T00:00:00",
                grade:100,
                body:"The film marks the end of arguably the greatest film trilogy ever made. This will remain as one of the greatest movies ever with some of the best scenes ever."
            }, {
                name:"davenbettridge",
                date:"2012-02-06T00:00:00",
                grade:100,
                body:"An epic conclusion to one of the best movie trilogies of all time. Great characters, action scenes and a story that we cared for. The Lord of the Rings delivered to the hype and although its cheesy at times it makes up with it with its charm. Masterpiece."
            }, {
                name:"Scorpion",
                date:"2013-05-19T00:00:00",
                grade:100,
                body:"The beginning is may seem a little fast, playing various information to the public, but the rest is perfect, and ends in a phenomenal trilogy Peter Jacson, besides revolutionize the industry of special effects, it proves that it has special effects like mixing first and an epic story in a single film."
            }, {
                name:"LegionODorkS",
                date:"2003-12-19T00:00:00",
                grade:0,
                body:"This ZERO is for the pinheads rating this movie as 'BEST MOVIE EVER'. Yes, if you've seen only three movies in your life-- including the first two installments of this outrageously overrated series-- than yes, FANBOY, this is the best picture ever. If, on the other hand, you're over 3 years old, you may have seen... oh... I don't know... 200 better films, conservatively? Let me guess: George W. Bushole.. best President EVER?!? I thought so..."
            }]
        }
    }
    loadHTML(res);
};


let loadHTML = function(res) {
    posterEl.attr('src', res.thumbnailUrl);
    titleEl.text(res.title);
    directorEl.text(`Director: ${res.director}`);
    descriptionEl.text(`Description: ${res.description}`);
    genreEl.text(`Genre: ${res.genre}`);
    metascoreEl.text(`MetaCritic Score: ${res.metaScore}`);
    userscoreEl.text(`Users' Score: ${res.userScore}`);
    releaseDateEl.text(`Released: ${dayjs(res.releaseDate).format("YYYY")}`);

    // TODO: add elements to container on html, 3 from critics, 3 from users

    for(let i = 0; i < 3; i++) {
        let newReview = $("<div>").addClass("row");
        newReview.append($("<h5>").text(`Reviewer: ${res.recentReviews[i].name}`));
        newReview.append($("<p>").text(`Grade: ${res.recentReviews[i].grade}`));
        newReview.append($("<p>").text(`"${res.recentReviews[i].body}"`));
        recentReviewsEl.append(newReview);
    }
    for(let i = 0; i < 3; i++) {
        let newReview = $("<div>").addClass("row");
        newReview.append($("<h5>").text(`Reviewer: ${res.recentUserReviews[i].name}`));
        newReview.append($("<p>").text(`Grade: ${res.recentUserReviews[i].grade}`));
        newReview.append($("<p>").text(`"${res.recentUserReviews[i].body}"`));
        recentUserReviewsEl.append(newReview);
    }
}

loadReviewStorage();




