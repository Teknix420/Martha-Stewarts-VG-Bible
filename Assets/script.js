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

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems, 'options');
});

$(document).ready(function () {
  $('select').formSelect();
});

$('#gamename').keypress(function (event) {
  if (event.keyCode === 13) {
    $('#search').click();
  }
});

$('#gamenumber').keypress(function (event) {
  if (event.keyCode === 13) {
    $('#findagame').click();
  }
});

$('#findagame').click(function () {

  $('#search-results-header').text('Finding you a random game...');
  $('#loading-bar').attr('class', 'progress');
  $('#results-container').attr('class', '');
  $('#main-container').attr('class', 'hide');

  let genreArray = $('#genre').val();
  let genreSelection;
  genreSelection = genreArray.toString();
  let platformSelection = $('#platform').val();
  let perspectiveArray = $('#perspective').val();
  let perspectiveSelection;
  perspectiveSelection = perspectiveArray.toString();
  let resultSelection = $('#gamenumber').val();

  axios({

    url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': "8bf9fa37b1dfeca73818d322443b91fd",

    },

    data: 'where genres = [' + genreSelection + '] & platforms = (' + platformSelection + ') & player_perspectives = (' + perspectiveSelection + '); fields name, release_dates.human, genres.name, cover.url, similar_games.name, time_to_beat.normally, summary, age_ratings.rating, platforms.name; limit 500;',

    }).then(responsegit  => {

    if (response.data.length === 0) {

      $('#search-results-header').text('No Search Results! Please Try Again!');
      $('#loading-bar').attr('class', 'hide');

    } else if (resultSelection < response.data.length) {

      $('#search-results-header').text('Random Games');
      $('#loading-bar').attr('class', 'hide');

      for (let i = 0; i < resultSelection; i++) {

        let randomPick = response.data[Math.floor(Math.random() * response.data.length)];
        const removeArray = response.data.indexOf(randomPick);

        if (removeArray > -1) {
          response.data.splice(removeArray, 1);
        };

        let pageBreak = $('<br>');
        let pageBreak2 = $('<br>');
        let pageBreak3 = $('<br>');
        let pageBreak4 = $('<br>');
        let gameTitle = $('<h5>');
        gameTitle.attr('class', 'header');
        let gameGenre = $('<p>');
        gameTitle.text(randomPick.name);
        let searchImg = $('<img>');
        let imgDiv = $('<div>');

        imgDiv.attr('class', 'card-image title-img');
        let textDiv = $('<div>');
        textDiv.attr('class', 'card-stacked');
        let textContentDiv = $('<div>');
        textContentDiv.attr('class', 'card-content');
        let horizontalCardDiv = $('<div>');
        horizontalCardDiv.attr('class', 'card horizontal');
        let gameSummary = $('<p>');
        let availableConsoles = $('<p>');
        let consoleArray = [];
        let ageRating = $('<p>');
        var ratingArray = [];
        let similarGamesContent = $('<p>');
        let similarGamesArray = [];

        if (randomPick.similar_games != undefined) {
          for (let l = 0; l < randomPick.similar_games.length; l++) {
            let similarGames = randomPick.similar_games[l].name
            similarGamesArray.push(' ' + similarGames)
          }
        }

        if (randomPick.age_ratings != undefined) {

          for (let k = 0; k < randomPick.age_ratings.length; k++) {

            let rating = '';
            if (randomPick.age_ratings[k].rating === 1) {
              rating = 'Three';
            } else if (randomPick.age_ratings[k].rating === 2) {
              rating = 'Seven';
            } else if (randomPick.age_ratings[k].rating === 3) {
              rating = 'Twelve';
            } else if (randomPick.age_ratings[k].rating === 4) {
              rating = 'Sixteen';
            } else if (randomPick.age_ratings[k].rating === 5) {
              rating = 'Eighteen';
            } else if (randomPick.age_ratings[k].rating === 6) {
              rating = 'RP';
            } else if (randomPick.age_ratings[k].rating === 7) {
              rating = 'EC';
            } else if (randomPick.age_ratings[k].rating === 8) {
              rating = 'E';
            } else if (randomPick.age_ratings[k].rating === 9) {
              rating = 'E10';
            } else if (randomPick.age_ratings[k].rating === 10) {
              rating = 'T';
            } else if (randomPick.age_ratings[k].rating === 11) {
              rating = 'M';
            } else if (randomPick.age_ratings[k].rating === 12) {
              rating = 'AO';
            };
            ratingArray.push(' ' + rating);

          };
          
        };

        if (randomPick.platforms != undefined) {

          for (let j = 0; j < randomPick.platforms.length; j++) {

            let name = randomPick.platforms[j].name;
            consoleArray.push(' ' + name);

          };

        };

        ageRating.text('ESRB/PEGI Rating: ' + ratingArray.toString());
        availableConsoles.text('Available Consoles: ' + consoleArray.toString());
        similarGamesContent.text('Similar Games: ' + similarGamesArray.toString() + ' ');
        gameSummary.text(randomPick.summary);

        if (randomPick.cover != undefined) {

          searchImg.attr('src', 'https://' + randomPick.cover.url.replace('t_thumb', 't_cover_big'));

        };

        imgDiv.append(searchImg);
        textContentDiv.append(gameTitle, gameGenre, pageBreak2, gameSummary, pageBreak3, availableConsoles, pageBreak4, ageRating, pageBreak, similarGamesContent);
        textDiv.append(textContentDiv);
        horizontalCardDiv.append(imgDiv, textDiv);
        $('#card-panel').append(horizontalCardDiv);

      };

    } else if (resultSelection > response.data.length) {

      $('#search-results-header').text('Random Games');
      $('#loading-bar').attr('class', 'hide');

      for (let i = 0; i < response.data.length; i++) {

        let pageBreak = $('<br>');
        let pageBreak2 = $('<br>');
        let pageBreak3 = $('<br>');
        let pageBreak4 = $('<br>');
        let gameTitle = $('<h5>');
        gameTitle.attr('class', 'header');
        let gameGenre = $('<p>');
        gameTitle.text(response.data[i].name);
        let searchImg = $('<img>');
        let imgDiv = $('<div>');
        imgDiv.attr('class', 'card-image title-img');
        let textDiv = $('<div>');
        textDiv.attr('class', 'card-stacked');
        let textContentDiv = $('<div>');
        textContentDiv.attr('class', 'card-content');
        let horizontalCardDiv = $('<div>');
        horizontalCardDiv.attr('class', 'card horizontal');
        let gameSummary = $('<p>');
        let availableConsoles = $('<p>');
        let consoleArray = [];
        let ageRating = $('<p>');
        let ratingArray = [];
        let similarGamesContent = $('<p>');
        let similarGamesArray = [];

        if (response.data[i].similar_games != undefined) {

          for (let l = 0; l < response.data[i].similar_games.length; l++) {

            let similarGames = response.data[i].similar_games[l].name;
            similarGamesArray.push(' ' + similarGames);

          };

        };

        if (response.data[i].age_ratings != undefined) {

          for (let k = 0; k < response.data[i].age_ratings.length; k++) {

            let rating = '';
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

            let name = response.data[i].platforms[j].name;
            consoleArray.push(' ' + name);

          };

        };

        ageRating.text('ESRB/PEGI Rating: ' + ratingArray.toString());
        availableConsoles.text('Available Consoles: ' + consoleArray.toString());
        similarGamesContent.text('Similar Games: ' + similarGamesArray.toString() + ' ');
        gameSummary.text(response.data[i].summary);

        if (response.data[i].cover != undefined) {

          searchImg.attr('src', 'https://' + response.data[i].cover.url.replace('t_thumb', 't_cover_big'));

        };

        imgDiv.append(searchImg);
        textContentDiv.append(gameTitle, gameGenre, pageBreak2, gameSummary, pageBreak3, availableConsoles, pageBreak4, ageRating, pageBreak, similarGamesContent);
        textDiv.append(textContentDiv);
        horizontalCardDiv.append(imgDiv, textDiv);
        $('#card-panel').append(horizontalCardDiv);

      };

    };

  }).catch(err => {
    console.error(err);
  });

});

$('#search').click(function () {

  let gameName = $('#gamename').val();
  $('#search-results-header').text('Searching for your game...');
  $('#loading-bar').attr('class', 'progress');
  $('#results-container').attr('class', '');
  $('#main-container').attr('class', 'hide');

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

      if (response.data.length === 0) {

        $('#search-results-header').text('No Search Results! Please Try Again!');
        $('#loading-bar').attr('class', 'hide');

      } else {
        
        $('#search-results-header').text('Searched Game')
        $('#loading-bar').attr('class', 'hide')
        
        for (var i = 0; i < response.data.length; i++) {
          
          let pageBreak = $('<br>');
          let pageBreak2 = $('<br>');
          let pageBreak3 = $('<br>');
          let pageBreak4 = $('<br>');
          let gameTitle = $('<h5>');
          gameTitle.attr('class', 'header');
          let gameGenre = $('<p>');
          gameTitle.text(response.data[i].name);
          let searchImg = $('<img>');
          let imgDiv = $('<div>');
          imgDiv.attr('class', 'card-image title-img');
          let textDiv = $('<div>');
          textDiv.attr('class', 'card-stacked');
          let textContentDiv = $('<div>');
          textContentDiv.attr('class', 'card-content');
          let horizontalCardDiv = $('<div>');
          horizontalCardDiv.attr('class', 'card horizontal');
          let gameSummary = $('<p>');
          let availableConsoles = $('<p>');
          let consoleArray = [];
          let ageRating = $('<p>');
          let ratingArray = [];
          let similarGamesContent = $('<p>');
          let similarGamesArray = [];
          
          if (response.data[i].similar_games != undefined) {
            
            for (let l = 0; l < response.data[i].similar_games.length; l++) {
              
              let similarGames = response.data[i].similar_games[l].name;
              similarGamesArray.push(' ' + similarGames);
              
            };
            
          };
          
          if (response.data[i].age_ratings != undefined) {
            
            for (let k = 0; k < response.data[i].age_ratings.length; k++) {
              
              let rating = '';
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
              
              let name = response.data[i].platforms[j].name;
              consoleArray.push(' ' + name);
              
            };
            
          };
          
          ageRating.text('ESRB/PEGI Rating: ' + ratingArray.toString());
          availableConsoles.text('Available Consoles: ' + consoleArray.toString());
          similarGamesContent.text('Similar Games: ' + similarGamesArray.toString() + ' ');
          gameSummary.text(response.data[i].summary);
          
          if (response.data[i].cover != undefined) {
            
            var imgCover = response.data[i].cover.url;
            var imgReplace = 't_thumb';
            var imgNew = imgCover.replace(imgReplace, 't_cover_big');
            searchImg.attr('src', 'https://' + imgNew);
            
          };
        
          imgDiv.append(searchImg);
          textContentDiv.append(gameTitle, gameGenre, pageBreak2, gameSummary, pageBreak3, availableConsoles, pageBreak4, ageRating, pageBreak, similarGamesContent);
          textDiv.append(textContentDiv);
          horizontalCardDiv.append(imgDiv, textDiv);
          $('#card-panel').append(horizontalCardDiv);
          
        };
        
      };

      })
      .catch(err => {
        console.error(err);
      });
      
    });