// const idEl = $(#'id')
const posterEl = $('#movie-poster');
const titleEl = $('#movie-title');
const yearEl = $('#year');
const runtimeEl = $('#runtime');
const servicesEl = $('#services');
const trailerEl = $('#trailer');


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': _APIKEY_,
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};


// *** Begin Title Search Section ***
let searchInput = []
let favorites = []

$('#main-search-button').on('click', function() {
    var selectEl = $('#main-search-input')
    if(selectEl.val().length > 0){
        var title = $("#main-search-input").val();
        processTitleSearch(title, "us", "", "en");
        searchInput.push(selectEl.val())
        localStorage.setItem("movie-title", JSON.stringify(searchInput))
        addSearchHistory();
    }
})

function addSearchHistory() {
    // $('#searchHist').append('<div>' + searchTerm['searchTerm'] + '</div>')
    var movieTitles = JSON.parse(localStorage.getItem('movie-title'))
    if (movieTitles){
        searchInput = movieTitles
    }
    $('#searchHist').empty()
    for (i=0; i < searchInput.length; i++){
        var button =$('<li><a class="waves-effect waves-light btn-small">' + searchInput[i] + '</a></li>')
        button.click(function(event){
            processTitleSearch($(event.target).text(), "us", "", "en")
        })
        $('#searchHist').append(button)
    }

}

addSearchHistory();

function addToFavorites(){
    let lastItem = searchInput[searchInput.length -1]
    favorites.push(lastItem)
    localStorage.setItem('Favorites', JSON.stringify(favorites))
    var button = $('<li><a class="waves-light btn-small">' + lastItem +'</a></li>')
    button.click(function(event){
        processTitleSearch($(event.target).text(), "us", "", "en");
    })
    $('#favorites').append(button)
}

$('#addFavorite').on('click', function() { 
    addToFavorites();
})

let processTitleSearch = function(title, country, type, output_language) {
    console.log(title, country, type, output_language);
    results = JSON.parse(localStorage.getItem(title));
    if (results === null || results === undefined) {
        fetch(`https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=${country}&type=${type}&output_language=${output_language}`, options)
	    .then(response => response.json())
	    .then(response => {
            console.log(response);
            if (response.hasOwnProperty('result')) {
                localStorage.setItem(title, JSON.stringify(response.result));
                loadTitleSearch(response.result);
            }
        })
	    .catch(err => console.error(err));
    } else {
        loadTitleSearch(results);
    }
}

$("#modal1-search-button").click(function () {
    var advancedTitle = $("#modal-input-text").val();
    var advancedCountry = $("#country-dropdown").val();
    var advancedType = $("#type-dropdown").val();
    var advancedLanguage = $("#language-dropdown").val();
    processTitleSearch(advancedTitle, advancedCountry, advancedType, advancedLanguage);
});

// *** End Title Search Section ***


// *** Begin Youtube Trailer Section ***

let loadYoutubeTrailer = function(youtubeID) {
    console.log(youtubeID);
    let youtubeLink = "https://www.youtube.com/embed/" + youtubeID;
    document.getElementById("YT-iframe").src = youtubeLink;
}

// *** End Youtube Trailer Section ***


// *** Begin Movie Streaming Section ***

let loadMovieStreaming = function(strServices) {
    for (const property in strServices) {
        let output = `${property}: `;
        let typeSet = new Set();
        for (let i = 0; i < strServices[property].length; i++) {
            typeSet.add(strServices[property][i].type);
        }
        let typeArray = Array.from(typeSet);
        for (let i = 0; i < typeArray.length; i++) {
                output += typeArray[i];
            if (i < typeArray.length - 1) {
                output += ", ";
            }
        }
        console.log(output);
        switch (true) {
            case output.includes('prime'):
                console.log("this movie has prime");
                break;
            case output.includes('hulu'):
                console.log("this movie has hulu");
                break;
            case output.includes('apple'):
                console.log("this movie has apple");
                break;
            case output.includes('disney'):
                console.log("this movie has disney");
                break;
            case output.includes('hbo'):
                console.log("this movie has hbo");
                break;
            case output.includes('netflix'):
                console.log("this movie has netflix");
                break;
            case output.includes('paramount'):
                console.log("this movie has paramount");
                break;
            default:
                console.log("this movie uses a no name service");
                break;
        }
    }
}

// *** End Movie Streaming Section ***


// *** Begin Series Streaming Section ***

let loadSeriesStreaming = function(strServices) {
    for (const property in strServices) {
        let output = `${property}: `;
        let typeSet = new Set();
        for (let i = 0; i < strServices[property].length; i++) {
            typeSet.add(strServices[property][i].type);
        }
        let typeArray = Array.from(typeSet);
        for (let i = 0; i < typeArray.length; i++) {
            output += typeArray[i];
            if (i < typeArray.length - 1) {
                output += ", ";
            }
        }
    console.log(output);
    }
}

// *** End Series Streaming Section ***


// *** Begin Movie Specific Loading Section ***

let loadMovie = function(movie) {
    // Year
    console.log(`Year: ${movie.year}`);
    yearEl.text(movie.year);

    // Runtime
    console.log(`${movie.runtime} minutes`);
    runtimeEl.text(`Runtime: ${movie.runtime} min`);

    // Parsing the streaming services into a concise (no duplicates) printable list
    const strServices = movie.streamingInfo.us;
    if (strServices === undefined) {
        console.log("No Streaming Services Available...");
    } else {
        loadMovieStreaming(strServices);
    }

    // Poster
    posterEl.html(`<img id="movie-poster" src="${movie.posterURLs[342]}" />`);
}

// *** End Movie Specific Loading Section


// *** Begin Series Specific Loading Section

let loadSeries = function(series) {
    // Year
    if (series.firstAirYear === series.lastAirYear) {
        console.log(`On Air: ${series.firstAirYear}`);
    } else {
        console.log(`On Air: ${series.firstAirYear}-${series.lastAirYear}`);
    }

    // Number of Seasons
    console.log(`${series.seasonCount} seasons`);

    // Parsing the streaming services into a conscise (no duplicates) printable list
    for (let season of series.seasons) {
        console.log(`${season.title}`);
        const strServices = season.streamingInfo.us;
        if (strServices === undefined) {
            console.log("No Streaming Services Available...");
        } else {
            loadSeriesStreaming(strServices);
        }
    }

    // Poster
    posterEl.html(`<img id="movie-poster" src="${series.posterURLs[342]}" />`);
}

// *** End Series Specific Loading Section ***


// *** Begin Loading Init Section ***

let loadTitleSearch = function (res) {
    console.log(res);
    console.log(res[0].youtubeTrailerVideoId);

    for (let i = 0; i < 1; i++) {
        // Title
        console.log(res[i].title);
        titleEl.text(res[i].title);

        // Youtube
        loadYoutubeTrailer(res[i].youtubeTrailerVideoId);

        if (res[i].type === "movie") {
            loadMovie(res[i]);
        } else if (res[i].type === "series") {
            loadSeries(res[i]);
        }
    }
}

// *** End Loading Init Section ***

// *** Default Page Load ***
processTitleSearch("Dude Where's My Car", "us", "movie", "en");


// *** Load on ready ***
$(document).ready(function () {
    $("select").formSelect();
});

$(document).ready(function () {
    $(".modal").modal();
});