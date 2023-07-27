$(document).ready(function(){
  $("#state_selector").change(function(){
    let state_choice = $(this).val();
    get_park_aqi(state_choice)
  })
})

function plot_aqi(div, aqi_number){ 
  var data = [
      {
          type: "indicator",
          mode: "number+gauge",
          value: aqi_number,
          domain: { x: [0, 1], y: [0, 1] },
          title: { text: "<b>AQI</b>" },
          gauge: {
          shape: "bullet",
          axis: { 
              range: [null, 500],
              tickmode: "array", 
              tickvals: [25, 75, 125, 175, 250, 400], 
              ticktext: ['Good', 'Moderate', 'Unhealthy For Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'],
              tickangle: 20, 
              
          },
          steps: [
              { range: [0, 50], color: "green" },
              { range: [50, 100], color: "yellow" },
              { range: [100, 150], color: "orange"},
              { range: [150, 200], color: "red"},
              { range: [200, 300], color: "purple"},
              { range: [300,500], color: "maroon"}
          ],
          bar: {color: "blue"},
          }
      }
      ];

      var layout = { width: 600, height: 200 };
      var config = { responsive: true };

      return Plotly.newPlot(div, data, layout, config);
  };
