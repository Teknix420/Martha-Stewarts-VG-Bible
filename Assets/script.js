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
  
    console.log($('#genre').val());
    console.log($('#console').val());
    console.log($('#perspective').val());
    console.log($('#gamenumber').val());
    console.log($('#gamenumberresultsreturn').val());
    
})


$('#search').click(function() {
  var gameName = $('#gamename').val();
  let resultsAmount = $('#gamenumber').val()
  $('#results-container').attr('class', '')
  $('#main-container').attr('class', 'hide')
  axios({
    url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': "8bf9fa37b1dfeca73818d322443b91fd",
    },
    data: 'search "' + gameName + '"; fields name, release_dates.human, genres.name, cover.url, similar_games.name, time_to_beat.normally, summary, age_ratings.rating, platforms.name; limit 50;',
  })
    .then(response => {
        for(var i = 0; i < response.data.length; i++) {
          console.log(response.data[i].name);
          console.log(response.data)
          let gameTitle = $('<h5>')
          gameTitle.text(response.data[i].name)
          let searchImg = $('<img>')
          let imgDiv = $('<div>')
          let gameSummary = $('<p>')
          let availableConsoles = $('<p>')
          let consoleArray = []
          let ageRating = $('<p>')
          var ratingArray = [];
          if (response.data[i].age_ratings != undefined) {
            for(var k = 0; k < response.data[i].age_ratings.length; k++) {
              var rating = '';
              if (response.data[i].age_ratings[k].rating === 1) {
                rating = 'Three';
              } else if (response.data[i].age_ratings[k].rating === 2) {
                rating = 'Seven';
              } else if (response.data[i].age_ratings[k].rating === 3) {
                rating = 'Twelve';
              } else if (response.data[i].age_ratings[k].rating === 4) {
                rating = 'Sixteen';
              } else if (response.data[i].age_ratings[k].rating === 5) {
                rating = 'Eighteen';
              } else if (response.data[i].age_ratings[k].rating === 6) {
                rating = 'RP';
              } else if (response.data[i].age_ratings[k].rating === 7) {
                rating = 'EC';
              } else if (response.data[i].age_ratings[k].rating === 8) {
                rating = 'E';
              } else if (response.data[i].age_ratings[k].rating === 9) {
                rating = 'E10';
              } else if (response.data[i].age_ratings[k].rating === 10) {
                rating = 'T';
              } else if (response.data[i].age_ratings[k].rating === 11) {
                rating = 'M';
              } else if (response.data[i].age_ratings[k].rating === 12) {
                rating = 'AO';
              };
              ratingArray.push(' ' + rating);
            };
          };
          if (response.data[i].platforms != undefined) {
            for (let j = 0; j < response.data[i].platforms.length; j++) {
              console.log(response.data[i].platforms[j].name)
              let name = response.data[i].platforms[j].name
              consoleArray.push(' ' + name)
            }
          }
          ageRating.text('ESRB/PEGI Rating: ' + ratingArray.toString())
          availableConsoles.text('Available Consoles: ' + consoleArray.toString())
          gameSummary.text(response.data[i].summary)
          imgDiv.attr('class', 'row')
          if (response.data[i].cover.url != undefined) {
          searchImg.attr('src', 'https://' + response.data[i].cover.url)
          }
          imgDiv.append(gameTitle, searchImg, gameSummary,availableConsoles, ageRating)
          $('#card-panel').append(imgDiv)
        }
        
    })
    .catch(err => {
        console.error(err);
    });
    // axios({
    //   url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers",
    //   method: 'POST',
    //   headers: {
    //       'Accept': 'application/json',
    //       'user-key': "8bf9fa37b1dfeca73818d322443b91fd",
    //   },
    //   data: 'search "' + gameName + '"; fields *;',
    // })
    //   .then(response => {
    //       // for(var i = 0; i < response.data.length; i++) {
    //       //   console.log(response.data[i].url);
    //       // }
    //       console.log(response.data)
          
    //   })
    //   .catch(err => {
    //       console.error(err);
    //   });
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