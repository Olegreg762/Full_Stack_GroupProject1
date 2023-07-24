var apiKeyNPS = "2mkTMIQYFuS0De5GcmaGvYCMzkMaxFIpeVMaHNmV"
var requestUrlNPS = `https://developer.nps.gov/api/v1/parks?stateCode=${State}&api_key=${apiKeyNPS}`
    fetch(requestUrlNPS)
    .then(function (response) {
      return response.json(); 
    })
    .then(function(data){
        console.log(data)
    })