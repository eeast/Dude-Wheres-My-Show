// id => idEl
const posterEl = $('#movie-poster');
const titleEl = $('#movie-title');
const yearEl = $('#year');
const runtimeEl = $('#runtime');
const servicesEl = $('#services');
const trailerEl = $('#trailer');
// start-btn => startBtn

// Search button

// Search results

// Favorites list

// Search history list


// For modal
$(document).ready(function () {
  $(".modal").modal();
});

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': _APIKEY_,
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

// Title Search
let title = "Dude where's my car";
let country = "us";
let type = "";
let output_language = "en";
let searchInput = []

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
        $('#searchHist').append('<li>' + searchInput[i] + '</li>')
    }

}

addSearchHistory();

function addToFavorites(){
    var movieTitles = JSON.parse(localStorage.getItem('movie-title'))
    if (movieTitles){
        searchInput = movieTitles
    }
        let lastItem = searchInput[searchInput.length -1]
        console.log(lastItem)
        $('#favorites').append('<li>' + lastItem + '</li>')
}

$('#addFavorite').on('click', function() {
    addToFavorites();
})

let processTitleSearch = function () {
  results = JSON.parse(localStorage.getItem(title));
  if (results === null) {
    fetch(
      `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=${country}&type=${type}&output_language=${output_language}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem(title, JSON.stringify(response.result));
        loadTitleSearch(response.result);
      })
      .catch((err) => console.error(err));
  } else {
    loadTitleSearch(results);
  }
};

let loadTitleSearch = function (res) {
  console.log(res);

  // Youtube modal popup
  let youtubeID = res[0].youtubeTrailerVideoId;
  let youtubeLink = "https://www.youtube.com/embed/" + youtubeID;
  document.getElementById("YT-iframe").src = youtubeLink;

  for (let i = 0; i < 5; i++) {
    if (res[i].type === "movie") {
      // Title
      console.log(res[i].title);
let processTitleSearch = function(title, country, type, output_language) {
    console.log(title, country, type, output_language);
    results = JSON.parse(localStorage.getItem(title));
    if (results === null || results === undefined) {
        fetch(`https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=${country}&type=${type}&output_language=${output_language}`, options)
	    .then(response => response.json())
	    .then(response => {
            console.log(response);
            if (response.status == 200) {
                localStorage.setItem(title,JSON.stringify(response.result))
                loadTitleSearch(response.result)
            }
        })
	    .catch(err => console.error(err));
    } else {
        loadTitleSearch(results);
    }
}

// ***********************

// Advanced search button
$("#modal1-search-button").click(function () {
  var advancedTitle = $("#modal-input-text").val();
  var advancedCountry = $("#country-dropdown").val();
  var advancedType = $("#type-dropdown").val();
  var advancedLanguage = $("#language-dropdown").val();
  processTitleSearch(advancedTitle, advancedCountry, advancedType, advancedLanguage);
});

// ***********************

      // Year
      console.log(`Year: ${res[i].year}`);

    for (let i = 0; i < 1; i++) {
        if (res[i].type === "movie") {
            // Title
            console.log(res[i].title);
            titleEl.append(res[i].title);

            // Year
            console.log(`Year: ${res[i].year}`);
            yearEl.append(res[i].year);
            

            // Runtime
            console.log(`${res[i].runtime} minutes`);
            runtimeEl.append(`Runtime: ${res[i].runtime} min`);

            // Parsing the streaming services into a conscise (no duplicates) printable list
            const strServices = res[i].streamingInfo.us;
            if (strServices === undefined) {
                console.log("No Streaming Services Available...");
            } else {
                for (const property in strServices) {
                    let output = `${property}: `;
                    let typeSet = new Set();
                    for (let i = 0; i < strServices[property].length; i++) {
                        typeSet.add(strServices[property][i].type)
                    }
                    let typeArray = Array.from(typeSet);
                    for (let i = 0; i < typeArray.length; i++) {
                        output += typeArray[i];
                        if (i < typeArray.length - 1) {
                            output += ", ";
                        }
                    }
                    console.log(output);
                    if (output.includes('prime')) {
                        console.log("this movie has prime");   
                    } else if (output.includes('hulu')){
                        console.log("this movie has hulu");
                    } else if (output.includes('apple')){
                        console.log("this movie has apple");
                    } else if (output.includes('disney')){
                        console.log("this movie has disney")
                    } else if (output.includes('hbo')){
                        console.log("this movie has hbo")
                    } else if (output.includes('netflix')){
                        console.log("this movie has netflix");
                    } else if (output.includes('paramount')){
                        console.log("this movie has paramount");
                    } else {
                        console.log("this movie uses a no name service");
                    }
                }
            }

            // Trailer Link
            console.log(res[i].youtubeTrailerVideoLink);

            // Poster
            console.log(res[i].posterURLs[342]);
            posterEl.prepend(`<img id="movie-poster" src="${res[i].posterURLs[342]}" />`);
            
        } else if (res[i].type === "series") {
            // Title
            console.log(res[i].title);

            // Year
            if (res[i].firstAirYear === res[i].lastAirYear) {
                console.log(`On Air: ${res[i].firstAirYear}`);
            } else {
                console.log(`On Air: ${res[i].firstAirYear}-${res[i].lastAirYear}`);
            }

            // Number of Seasons
            console.log(`${res[i].seasonCount} seasons`);

            // Parsing the streaming services into a conscise (no duplicates) printable list
            for (let season of res[i].seasons) {
                console.log(`${season.title}`);
                const strServices = season.streamingInfo.us;
                if (strServices === undefined) {
                    console.log("No Streaming Services Available...");
                } else {
                    for (const property in strServices) {
                        let output = `${property}: `;
                        let typeSet = new Set();
                        for (let i = 0; i < strServices[property].length; i++) {
                            typeSet.add(strServices[property][i].type)
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
            }

            // Trailer Link
            console.log(res[i].youtubeTrailerVideoLink);

            // Poster
            console.log(res[i].posterURLs[342]);
        }
      }

      // Trailer Link
      console.log(res[i].youtubeTrailerVideoLink);

      // Poster
      console.log(res[i].posterURLs[342]);
    } else if (res[i].type === "series") {
      // Title
      console.log(res[i].title);

      // Year
      if (res[i].firstAirYear === res[i].lastAirYear) {
        console.log(`On Air: ${res[i].firstAirYear}`);
      } else {
        console.log(`On Air: ${res[i].firstAirYear}-${res[i].lastAirYear}`);
      }

      // Number of Seasons
      console.log(`${res[i].seasonCount} seasons`);

      // Parsing the streaming services into a conscise (no duplicates) printable list
      for (let season of res[i].seasons) {
        console.log(`${season.title}`);
        const strServices = season.streamingInfo.us;
        if (strServices === undefined) {
          console.log("No Streaming Services Available...");
        } else {
          for (const serviceProvider in strServices) {
            let output = `${serviceProvider}: `;
            let typeSet = new Set();
            for (let i = 0; i < strServices[serviceProvider].length; i++) {
              typeSet.add(strServices[serviceProvider][i].type);
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
      }

      // Trailer Link
      console.log(res[i].youtubeTrailerVideoLink);

      // Poster
      console.log(res[i].posterURLs[342]);
    }
  }
};

processTitleSearch();
processTitleSearch("Dude Where's My Car", "us", "movie", "en");
// searchHistory("Dude Where's My Car");

$(document).ready(function () {
  $("select").formSelect();
});
