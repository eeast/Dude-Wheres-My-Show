// id => idEl
const posterEl = $('#movie-poster');
const titleEl = $('#movie-title');
const yearEl = $('#year');
const runtimeEl = $('#runtime');
const servicesEl = $('#services');
const trailerEl = $('#trailer');
// start-btn => startBtn


// Search button

// Modal popup

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



let processTitleSearch = function() {
    results = JSON.parse(localStorage.getItem(title));
    if (results === null) {
        fetch(`https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=${country}&type=${type}&output_language=${output_language}`, options)
	    .then(response => response.json())
	    .then(response => {
            localStorage.setItem(title,JSON.stringify(response.result))
            loadTitleSearch(response.result)
        })
	    .catch(err => console.error(err));
    } else {
        loadTitleSearch(results);
    }
}

//creates local storage for search history and logs titles in console from searchHistoryArr
const searchHistory = function() { 
let searchHistory = localStorage.getItem('searchHistory');
let searchHistoryArr = searchHistory ? JSON.parse(searchHistory) : [];

const index = searchHistoryArr.indexOf(title);
if (index !== -1) {
  searchHistoryArr.splice(index, 1);
}
searchHistoryArr.unshift(title);

localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));

for(let i = 0;i < searchHistoryArr.length ;i++){
    console.log(`this is from local storage at index ${i}: ${searchHistoryArr[i]}`);
   };
}

let loadTitleSearch = function(res) {
    console.log(res);

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
}

processTitleSearch()
searchHistory()