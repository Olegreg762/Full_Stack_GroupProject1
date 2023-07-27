np_api_key = "qP8l7vELmn3qUfkuBwVesPUGqCAsmRHzcZU5XDOd"
epa_api = "1B3DD7E3-FE66-40BD-9FF9-456CD1849D19"

function get_park_aqi (input){
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${input}&api_key=${np_api_key}`;
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            for( let r = 0; r < $("a").length; r++){
                $(".Results-Container .result").remove()
                
            }
            for(let i = 0; i < data.data.length; i++){
                if(data.data[i].designation !== "National Historic Trail"){
                    $(`#result${i}`).append($(`#resultsList`));
                    $(`<div class = "is-flex is-justify-content-space-between card box result">
                        <a href="${data.data[i].url}" class="" id="park_url${i}">${data.data[i].fullName}</a>
                        <img src =${data.data[i].images[0].url} alt= "image of the national park" width = "200" height = "200">
                        <p>${data.data[i].description}</p>
                        <a href= ${data.data[i].directionsUrl}>Directions</a>
                        <span id="aqi_number${i}"></span>
                        </div>`).insertAfter($(`#resultsList`));
                const epa_url = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${data.data[i].latitude}&longitude=${data.data[i].longitude}&distance=50&API_KEY=${epa_api}`
            fetch(epa_url)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    if(data[0] == null){
                        $(`#aqi_number${i}`).text(` No Data Avaliable`)
                    }else{
                        $(`#aqi_number${i}`).text(` Air Quality ${data[0].AQI} ${data[0].Category.Name}`)
                    }
                })
            }}
        })
    };
  
 