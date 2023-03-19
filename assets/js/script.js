// id => idEl
// start-btn => startBtn


// Search button

// Modal popup

// Search results

// Favorites list

// Search history list

//another comment

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3a98a28e7dmsh1d83ce3a7680f1bp16bc55jsn1d6758dbbe6f',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};


// Title Search
let title = "Game of Thrones";
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
    


let loadTitleSearch = function(res) {
    console.log(res);

    for (let i = 0; i < 5; i++) {
        if (res[i].type === "movie") {
            // Title
            console.log(res[i].title);

            // Year
            console.log(`Year: ${res[i].year}`);
            

            // Runtime
            console.log(`${res[i].runtime} minutes`);

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