// jQuery function await to execute code until after page is loaded
$(document).ready(function(){
  // Event listener for the stateSelect for changes is the selected state
  $("#stateSelect").change(function(){
    // Set Value of variable to the selected state
    let state_choice = $(this).val();
    // Calls function in epa_api.js to request park data from that state
    get_park_aqi(state_choice)
  })
})
// Function for creating plot based on AQI number
function plot_aqi(div, aqi_number){
  // Variables to used by function
  let font_color = ""
  let title = "AQI"
  // Changes color of text based upon the AQI number
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
    // If no number is given to function it will set text color to black
    font_color = "black"
    // Sets title to be "N/A" for no data
    title = "N/A"
  };
  // Parameters for plot
  const data = [
      {

          type: "indicator",
          mode: "number+gauge",
          value: aqi_number,
          domain: { x: [0, 1], y: [0, 1] },
          title: {text: `<b>${title}</b>`},
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
          bar: {color: "black"},
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
                     paper_bgcolor:"#46b5ff",
                     font:{
                      color: font_color
                     }
      };
      const config = { responsive: true };
      // Creates plot in element id given by get_park_aqi
      return Plotly.newPlot(div, data, layout, config);
  };
