$(document).ready(function(){
  $("#state_selector").change(function(){
    let state_choice = $(this).val();
    $(document).trigger(get_park_aqi(state_choice))
  })
})