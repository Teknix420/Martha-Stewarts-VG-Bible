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


$('#search').click(function() {
  var gameName = $('#gamename').val();

  axios({
    url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': "8bf9fa37b1dfeca73818d322443b91fd",
    },
    data: 'search "' + gameName + '"; fields name, release_dates; limit 50;',
  })
    .then(response => {
        for(var i = 0; i < response.data.length; i++) {
          console.log(response.data[i].name);
        }
        console.log(response.data)
    })
    .catch(err => {
        console.error(err);
    });
})
// axios({
//   url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
//   method: 'POST',
//   headers: {
//       'Accept': 'application/json',
//       'user-key': "8bf9fa37b1dfeca73818d322443b91fd",
//   },
//   data: 'fields *; limit 100;',
// })
//   .then(response => {
//       console.log(response.data);
//   })
//   .catch(err => {
//       console.error(err);
//   });

// Console ID's
// Xbox One - 49, Xbox - 11, X360 - 12

// Genre ID's
//Fighting - 4, Shooter - 5, Puzzle - 9, Racing - 10, RTS - 11, RPG - 12, Simulator - 13, Sport - 14, Strategy - 15, Adventure - 31, Moba - 36

// Perspective ID's
// First Person - 1298937600, Third Person - 1298937600

// Age Rating values - should be removed
// E - 8, T - 10, M - 11

//time to beat