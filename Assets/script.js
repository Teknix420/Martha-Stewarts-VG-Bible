// API Key: 8bf9fa37b1dfeca73818d322443b91fd
// Request URL: https://api-v3.igdb.com\
// const axios = require('axios');
 
// Make a request for a user with a given ID
// axios.get('/user?ID=12345')
// .then(function (response) {
//   // handle success
//   console.log(response);
// })
// .catch(function (error) {
//   // handle error
//   console.log(error);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();
  });

  $('#submit').click(function() {
    
      console.log($('.selected').text());
  })