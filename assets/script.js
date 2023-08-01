$(document).ready(function(){
  $("#state_selector").change(function(){
    let state_choice = $(this).val();
    get_park_aqi(state_choice)
  })
})

function plot_aqi(div, aqi_number){
  let font_color = ""
  if(aqi_number < 50){
    font_color = "green"
  }else if(aqi_number <100){
    font_color = "darkgoldenrod"
  }else if(aqi_number<150){
    font_color = "darkorange"
  }else if(aqi_number<200){
    font_color = "red"
  }else if(aqi_number<300){
    font_color = "purple"
  }else if(aqi_number<500){
    font_color = "crimson"
  }else{
    font_color = "black"
  };
  const data = [
      {

          type: "indicator",
          mode: "number+gauge",
          value: aqi_number,
          domain: { x: [0, 1], y: [0, 1] },
          title: {text: "<b>AQI</b>"},
          gauge: {
          shape: "gauge",
          axis: { 
              range: [null, 500],
              tickmode: "array", 
              tickvals: [25, 75, 125, 175, 250, 400],
              ticktext: ['Good', 'Moderate', 'Sensitive', 'Unhealthy', 'Very Unhealthy', 'Hazardous'],
              tickangle: 18, 
          
          },
          steps: [
              { range: [0, 50], color: "green" },
              { range: [50, 100], color: "yellow" },
              { range: [100, 150], color: "orange"},
              { range: [150, 200], color: "red"},
              { range: [200, 300], color: "purple"},
              { range: [300,500], color: "maroon"}
          ],
          bar: {color: "white"},
          }
      }
      ];

      const layout = { width: 300, 
                     height: 200,
                     margin:{
                      t:70,
                      r:70,
                      l:60,
                      b:50
                     },
                     paper_bgcolor:"#b1f2ff",
                     font:{
                      color: font_color
                     }
      };
      const config = { responsive: true };

      return Plotly.newPlot(div, data, layout, config);
  };
