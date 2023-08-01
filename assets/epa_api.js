// Api-keys
np_api_key = "qP8l7vELmn3qUfkuBwVesPUGqCAsmRHzcZU5XDOd"
epa_api = "21DF2C57-020A-44AC-9755-F079CDA18E1C"
epa_api2= "1B3DD7E3-FE66-40BD-9FF9-456CD1849D19"

// function for getting info for parka
function get_park_aqi (input){
    // url for NPS API
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${input}&api_key=${np_api_key}`;
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            // For to remove previous results
            for( let r = 0; r < $("a").length; r++){
                $(".Results-Container .result").remove() 
            }
            // For loop to dynamically create divs for the infromation on the chosen parks
            for(let i = 0; i < data.data.length; i++){
                if(data.data[i].designation !== "National Historic Trail"){
                    $(`#result${i}`).append($(`#resultsList`));
                    // Main card for each div
                    $(`<div id = "results-card" class = "is-flex is-justify-content-space-between is-align-items-center has-background-info card box result" onclick="location.href='${data.data[i].url}';">
                        <!-- Displays name of park -->
                        <h2 class="has-text-white mx-2" id = "park-title">${data.data[i].fullName}</h2></p>
                        <!-- Image for park -->
                        <img src =${data.data[i].images[0].url} class="mx-2 park-img" alt= "image of the national park" width = "200" height = "200">
                        <!-- Description of the park -->
                        <p class= "mx-2 has-text-white">${data.data[i].description}</p>
                        <!-- Creates button for the directions to the park -->
                        <a href= ${data.data[i].directionsUrl} class="mx-2 has-text-info-light button is-outlined" id = "directions" >Directions </a>
                        <!-- AQI number and category with plot -->
                        <span class="aqi-number level-right mx-2 has-text-warning is-flex-direction-column" id="aqi_number${i}"></span>
                        <!-- Everything is insert after the id resultsList -->
                        </div>`).insertAfter($(`#resultsList`));
                    // AirNow EPA API URL
                const epa_url = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${data.data[i].latitude}&longitude=${data.data[i].longitude}&distance=50&API_KEY=${epa_api}`
                // function to query api
                fetch(epa_url)
                    .then(function(response){
                        // If reponse not 200 this block runs and the error will console log
                        if(response.status !== 200){
                            // Second API for airnow will be used to make the same request
                            console.log("Second Key Used")
                            const epa_url2 = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${data.data[i].latitude}&longitude=${data.data[i].longitude}&distance=50&API_KEY=${epa_api2}`
                            return fetch(epa_url2)
                                .then(function(response){
                                    return response.json()
                                })
                        }
                        return response.json();
                })
                // Creates text for the Air Quality in chosen park
                .then(function(data){
                    // If the response is null then there isn't a monitering station at that park
                    if(data[0] == null){
                        // Sets text to "No Data Avaliable"
                        $(`#aqi_number${i}`).text(` No Data Avaliable`)
                        // Call plot_aqi function in script.js to set with no data
                        plot_aqi(`aqi_number${i}`, "No Data") 
                    }else{
                        // Sets Text to the Air Qaulity category for chosen park
                         $(`#aqi_number${i}`).text(` Air Quality ${data[0].Category.Name}`)
                        //  Calls plot_aqi function in script.js and sets the value to the AQI number
                         plot_aqi(`aqi_number${i}`, data[0].AQI) 
                    }
                })
            }}
        })
    };
    