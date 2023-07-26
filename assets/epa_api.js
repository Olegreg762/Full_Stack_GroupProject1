let aqi = "";
np_api_key = "qP8l7vELmn3qUfkuBwVesPUGqCAsmRHzcZU5XDOd"
epa_api = "1B3DD7E3-FE66-40BD-9FF9-456CD1849D19"

function get_park_aqi (input){
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${input}&api_key=${np_api_key}`;
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            
            for(let i = 0; i < data.data.length; i++){
                if(data.data[i].designation !== "National Historic Trail"){
                    $(`#result${i}`).insertAfter($(`#resultsList`));
                    $(`<a href="${data.data[i].url}" class="card box" id="park_url${i}">${data.data[i].fullName}<span id="aqi_number${i}"></span></a>`).insertAfter($(`#resultsList`));
                const epa_url = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${data.data[i].latitude}&longitude=${data.data[i].longitude}&distance=50&API_KEY=1B3DD7E3-FE66-40BD-9FF9-456CD1849D19`
            fetch(epa_url)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    if(data[0] == null){
                        $(`#aqi_number${i}`).text(`: No Data Avaliable`)
                    }else{
                        $(`#aqi_number${i}`).text(`: Air Quality ${data[0].AQI} ${data[0].Category.Name}`)
                    }
                })
            }}
        })
  };
  
 