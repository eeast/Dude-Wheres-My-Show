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


$('#clearSearch').on('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('movie-title');
    $('#searchHist').empty()
})

$('#main-search-button').on('click', function() {
    var selectEl = $('#main-search-input')
    if(selectEl.val().length > 0 && searchInput.includes(selectEl.val()) === false){
        var title = $("#main-search-input").val();
        processTitleSearch(title, "us", "", "en");
        searchInput.push(selectEl.val())
        localStorage.setItem("movie-title", JSON.stringify(searchInput))
        addSearchHistory();
    }
})

function addSearchHistory() {
    var movieTitles = JSON.parse(localStorage.getItem('movie-title'))
    if (movieTitles){
        searchInput = movieTitles
    }
    $('#searchHist').empty()
    for (i=0; i < searchInput.length; i++){
        var button =$('<li><a class="waves-effect waves-light btn-small history-btn">' + searchInput[i] + '</a></li>')
        button.click(function(event){
            processTitleSearch($(event.target).text(), "us", "", "en")
            searchInput.push(searchInput.splice(searchInput.indexOf($(event.target).text()),1)[0])
            localStorage.setItem("movie-title", JSON.stringify(searchInput))
        })
        $('#searchHist').append(button)
    }
    
}
function saveToFavorites() {
    var searchInput = JSON.parse(localStorage.getItem('movie-title'))
    if (searchInput){
        let lastItem = searchInput[searchInput.length -1]
        if(favorites.includes(lastItem) === false){
            favorites.push(lastItem)
            localStorage.setItem('favorites', JSON.stringify(favorites))
            loadFavorites();
        }
    }
}


function loadFavorites(){
    favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites){
        console.log(favorites)
        $('#favorites').empty()
        for(i=0; i < favorites.length; i++) {
            var button = $('<li><a class="waves-light btn-small favorites-btn">' + favorites[i] + '</a></li>')
            button.click(function(event){
                processTitleSearch($(event.target).text(), "us", "", "en");
            })
            $('#favorites').append(button)
        }
    } else {
        favorites = []
    }
}

$('#addFavorite').on('click', function() { 
    saveToFavorites();
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
                console.log(response.result[0].title)
                localStorage.setItem(response.result[0].title, JSON.stringify(response.result));
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

    var selectEl = $("#modal-input-text");
    if (selectEl.val().length > 0) {
      advancedTitle;
      searchInput.push(advancedTitle);
      localStorage.setItem("movie-title", JSON.stringify(searchInput));
      addSearchHistory();
    }
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
    servicesEl.html('');
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
        console.log("this is output",output);
        // switch (true) {
        //     case output.includes('prime'):
        //         console.log("this movie has prime");
        //         servicesEl.append('<a href="https://www.amazon.com/Prime-Video/"><img src= "./streaming-service-icons/Amazon-Prime-Video.jpg" alt="Amazon Prime Video" style="width:100px; height:100px"></a>')
                
        //     case output.includes('hulu'):
        //         console.log("this movie has hulu");
        //         servicesEl.append('<a href="https://www.hulu.com/"><img src= "./streaming-service-icons/hulu-icon.jpg" alt="Hulu" style="width:100px; height:100px"></a>');
                
        //     case output.includes('apple'):
        //         console.log("this movie has apple");
        //         servicesEl.append('<a href="https://www.apple.com/apple-tv-plus/"><img src= "./streaming-service-icons/Apple-TV-Logo.png" alt="Apple TV Plus" style="width:100px; height:100px"></a>');
                
        //     case output.includes('disney'):
        //         console.log("this movie has disney");
        //         servicesEl.append('<a href="https://www.disneyplus.com/"><img src= "./streaming-service-icons/disney-plus-icon.png" alt="Disney Plus" style="width:100px; height:100px"></a>');
                
        //     case output.includes('hbo'):
        //         console.log("this movie has hbo");
        //         servicesEl.append('<a href="https://www.hbomax.com/"><img src= "./streaming-service-icons/hbo-max-icon.png" alt="HBO Max" style="width:100px; height:100px"></a>');
                
        //     case output.includes('netflix'):
        //         console.log("this movie has netflix");
        //         servicesEl.append('<a href="https://www.netflix.com/"><img src= "./streaming-service-icons/netflix-icon.png" alt="Netflix" style="width:100px; height:100px"></a>');
                
        //     case output.includes('paramount'):
        //         console.log("this movie has paramount");
        //         servicesEl.append('<a href="https://www.paramountplus.com/"><img src= "./streaming-service-icons/paramount-plus-icon.png" alt="Paramount Plus" style="width:100px; height:100px"></a>');
                
        //     default:
        //         console.log("this movie uses a no name service");
        //         break;
        // }

        if (output.includes('prime')) {
            console.log("this movie has prime");
            servicesEl.append('<a href="https://www.amazon.com/Prime-Video/"><img src= "./streaming-service-icons/Amazon-Prime-Video.jpg" alt="Amazon Prime Video" style="width:100px; height:100px"></a>')
        }
        else if (output.includes('hulu')) {
            console.log("this movie has hulu");
            servicesEl.append('<a href="https://www.hulu.com/"><img src= "./streaming-service-icons/hulu-icon.jpg" alt="Hulu" style="width:100px; height:100px"></a>');
        }
        else if (output.includes('apple')) {
            console.log("this movie has apple");
            servicesEl.append('<a href="https://www.apple.com/apple-tv-plus/"><img src= "./streaming-service-icons/Apple-TV-Logo.png" alt="Apple TV Plus" style="width:100px; height:100px"></a>');
        }
        else if (output.includes('disney')) {
            console.log("this movie has disney");
            servicesEl.append('<a href="https://www.disneyplus.com/"><img src= "./streaming-service-icons/disney-plus-icon.png" alt="Disney Plus" style="width:100px; height:100px"></a>');
        }
        else if (output.includes('hbo')) {
            console.log("this movie has hbo");
            servicesEl.append('<a href="https://www.hbomax.com/"><img src= "./streaming-service-icons/hbo-max-icon.png" alt="HBO Max" style="width:100px; height:100px"></a>');
        }
        else if (output.includes('netflix')) {
            console.log("this movie has netflix");
            servicesEl.append('<a href="https://www.netflix.com/"><img src= "./streaming-service-icons/netflix-icon.png" alt="Netflix" style="width:100px; height:100px"></a>');
        }
        else if (output.includes('paramount')) {
            console.log("this movie has paramount");
            servicesEl.append('<a href="https://www.paramountplus.com/"><img src= "./streaming-service-icons/paramount-plus-icon.png" alt="Paramount Plus" style="width:100px; height:100px"></a>');
        }
        else {
            console.log("this show/movie is using another service")
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
    $("#movie-poster").on('click', function() {
        let currentTitle = movie.title;
        window.location.replace(`detail.html?index=${0}&title=${currentTitle}`);
    })
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
addSearchHistory();
loadFavorites();

// *** Load on ready ***
$(document).ready(function () {
    $("select").formSelect();
});

$(document).ready(function () {
    $(".modal").modal();
});

// Maybe we can add the advanced search history to append advanced searched movies to the aside as well, and can be added to favorites