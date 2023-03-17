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
let title = "cool runnings";
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
    console.log(res[0]);
    console.log(res[0].streamingInfo.us);
    const strServices = res[0].streamingInfo.us;
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

processTitleSearch()

// Basic Search
// let showType = "";
// let searchKey = "the big lebowski";

// let requestURL = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime%2Chulu%2Capple&output_language=en&show_type=${showType}&keyword=${searchKey}`

// fetch(requestURL, options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));