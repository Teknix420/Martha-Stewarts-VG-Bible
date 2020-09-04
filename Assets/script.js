
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

$('#pickerror').hide();
$('#texterror').hide();

$('#findagame').click(function () {

  let genreArray = $('#genre').val();
  let genreSelection;
  let platformSelection = $('#platform').val();
  let perspectiveSelection = $('#perspective').val();
  let resultSelection = $('#gamenumber').val();

  if (genreArray.length == 0 || platformSelection === null || perspectiveSelection === null || resultSelection === '') {

    $('#pickerror').show();
    setTimeout(function() {
      $('#pickerror').hide();
    }, 5000);

  } else {

    genreSelection = genreArray.toString();
    $('#search-results-header').text('Finding you a random game...');
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

      data: 'where genres = [' + genreSelection + '] & platforms = (' + platformSelection + ') & player_perspectives = (' + perspectiveSelection + '); fields name, release_dates.human, genres.name, cover.url, similar_games.name, time_to_beat.normally, summary, age_ratings.rating, platforms.name; limit 500;',

    }).then(response => {

      if (response.data.length === 0) {

        $('#search-results-header').text('No Search Results! Please Try Again!');
        $('#loading-bar').attr('class', 'hide');

      } else if (resultSelection < response.data.length) {

        $('#search-results-header').text('You might like...');
        $('#loading-bar').attr('class', 'hide');
        $('#food-results-container').attr('class', 'container')
        for (let i = 0; i < resultSelection; i++) {

          let randomPick = response.data[Math.floor(Math.random() * response.data.length)];
          const removeArray = response.data.indexOf(randomPick);

          if (removeArray > -1) {
            response.data.splice(removeArray, 1);
          };

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

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://tasty.p.rapidapi.com/recipes/list?tags=under_30_minutes&from=0&sizes=50",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tasty.p.rapidapi.com",
        "x-rapidapi-key": "93a850cf5fmsh9786891d2e2471fp1069fdjsnb7305163276b"
      }
    }
    
    $.ajax(settings).done(function (response) {
      let randomFoodPick = response.results[Math.floor(Math.random() * response.results.length)];
        const removeFoodArray = response.results.indexOf(randomFoodPick)
        if (removeFoodArray > -1) {
          response.results.splice(removeFoodArray, 1);
        };
        let instructionsArray = [];
        let componentsArray = [];
        let foodNameHElement = $('<h5>')
        let foodDescriptionPEl = $('<p>')
        let foodImgEl = $('<img height = "50%", width = "50%">')
        let foodTimeEl = $('<p>')
        let foodIngredientsEl = $('<p>')
        let foodInstructionsEl =$('<p>')
        let foodName = response.results[removeFoodArray].name;
        let foodDescription = response.results[removeFoodArray].description;
        let foodTime = response.results[removeFoodArray].total_time_minutes;
        if (response.results[removeFoodArray].instructions != undefined) {
          for (let m = 0; m < response.results[removeFoodArray].instructions.length; m++) {
            let instructions =  response.results[removeFoodArray].instructions[m].display_text;
            instructionsArray.push(' ' + instructions);
          };
        }


        
        if (response.results[removeFoodArray].sections[0].components != undefined) {
          for (let n = 0; n < response.results[removeFoodArray].sections[0].components.length; n++) {
            let components = response.results[removeFoodArray].sections[0].components[n].raw_text;
            componentsArray.push(' ' + components);
          };
        } 


        foodNameHElement.text(foodName)
        foodDescriptionPEl.text('Description: ' + foodDescription)
        foodImgEl.attr('src', response.results[removeFoodArray].thumbnail_url)
        foodImgEl.attr('class', 'foodImg')
        foodTimeEl.text('Average time to make: ' + foodTime)
        foodIngredientsEl.text('Ingredients: ' + componentsArray)
        foodInstructionsEl.text('Instructions: ' + instructionsArray)
        $('#food-card-panel').append(foodImgEl, foodNameHElement, foodDescriptionPEl, foodImgEl, foodIngredientsEl, foodInstructionsEl)
      });
  }
  });

$('#search').click(function () {
// pulls value of the name that is entered in the search bar
  let gameName = $('#gamename').val();
  // displays a message to the user if they do not enter a value
  if (gameName === '') {
    
    $('#texterror').show();
    setTimeout(function() {
      $('#texterror').hide();
    }, 5000);
    
  } else {
    // adding text and attributes to certain elements of the HTML if the user enters a game title
    $('#search-results-header').text('Searching for your game...');
    $('#loading-bar').attr('class', 'progress');
    $('#results-container').attr('class', '');
    $('#main-container').attr('class', 'hide');
  // axios call to IGDB
    axios({

    url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': "8bf9fa37b1dfeca73818d322443b91fd",

    },

    data: 'search "' + gameName + '"; fields name, release_dates.human, genres.name, cover.url, similar_games.name, time_to_beat.normally, summary, age_ratings.rating, platforms.name; limit 50;',

  })
// then promise
    .then(response => {
// if no results are found, the user will be given this message
      if (response.data.length === 0) {

        $('#search-results-header').text('No Search Results! Please Try Again!');
        $('#loading-bar').attr('class', 'hide');
// code to be run if results are found
      } else {

        $('#search-results-header').text('Searched Game')
        $('#loading-bar').attr('class', 'hide')
        $('#food-results-container').attr('class', 'container')
        for (var i = 0; i < response.data.length; i++) {
// setting JQuery calls to create HTML elements in the HTML
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
// if the similar games are not undefined, a loop will run that will give the user similar games to the one that they search for
          if (response.data[i].similar_games != undefined) {

            for (let l = 0; l < response.data[i].similar_games.length; l++) {

              let similarGames = response.data[i].similar_games[l].name;
              similarGamesArray.push(' ' + similarGames);

            };

          };
// if the age ratings section is not undefined, code will be run that will identify what value the rating is and assign it an appropriate letter or age rating
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
// if the platform data is defined, a loop is run to create an array of which console the games are available on
          if (response.data[i].platforms != undefined) {

            for (let j = 0; j < response.data[i].platforms.length; j++) {

              let name = response.data[i].platforms[j].name;
              consoleArray.push(' ' + name);

            };

          };
// assigning values to the ageRating variables to be displayed in the HTML
          ageRating.text('ESRB/PEGI Rating: ' + ratingArray.toString());
          availableConsoles.text('Available Consoles: ' + consoleArray.toString());
          similarGamesContent.text('Similar Games: ' + similarGamesArray.toString() + ' ');
          gameSummary.text(response.data[i].summary);
// if the cover image is not undefined, the image will data will be assigned to the source value of the image
          if (response.data[i].cover != undefined) {

            var imgCover = response.data[i].cover.url;
            var imgReplace = 't_thumb';
            var imgNew = imgCover.replace(imgReplace, 't_cover_big');
            searchImg.attr('src', 'https://' + imgNew);

          };
// appends the data retireved to the html
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
      // object set to run an ajax call to grab info from Tasty api
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tasty.p.rapidapi.com/recipes/list?tags=under_30_minutes&from=0&sizes=50",
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "tasty.p.rapidapi.com",
          "x-rapidapi-key": "93a850cf5fmsh9786891d2e2471fp1069fdjsnb7305163276b"
        }
      }
      // ajax call on click
      $.ajax(settings).done(function (response) {
        // creates a random number depending on how long the array of the results is
        let randomFoodPick = response.results[Math.floor(Math.random() * response.results.length)];
        // sets a constant variable to be assigned to the index of the random number created
        const removeFoodArray = response.results.indexOf(randomFoodPick)
        // if the array is created, results are spliced into the removeFoodArray
        if (removeFoodArray > -1) {
          response.results.splice(removeFoodArray, 1);
        };
        // creating variables to be used in the html
        let instructionsArray = [];
        let componentsArray = [];
        let foodNameHElement = $('<h5>')
        let foodDescriptionPEl = $('<p>')
        let foodImgEl = $('<img height = "50%", width = "50%">')
        let foodTimeEl = $('<p>')
        let foodIngredientsEl = $('<p>')
        let foodInstructionsEl =$('<p>')
        // grabbing info from the ajax call and assigning to the proper variables
        let foodName = response.results[removeFoodArray].name;
        let foodDescription = response.results[removeFoodArray].description;
        let foodTime = response.results[removeFoodArray].total_time_minutes;
        // as long as the instructions are not undefined, a loop will run that grabs the instructions in the correct order
        if (response.results[removeFoodArray].instructions != undefined) {
          for (let m = 0; m < response.results[removeFoodArray].instructions.length; m++) {
            let instructions =  response.results[removeFoodArray].instructions[m].display_text;
            instructionsArray.push(' ' + instructions);
          };
        }
// as long as the components are not undefined, will run a loop that grabs the foods ingredients
        if (response.results[removeFoodArray].sections[0].components != undefined) {
          for (let n = 0; n < response.results[removeFoodArray].sections[0].components.length; n++) {
            let components = response.results[removeFoodArray].sections[0].components[n].raw_text;
            componentsArray.push(' ' + components);
          };
        };
        //  creating text and attributes to be appended in the HTML
        foodNameHElement.text(foodName)
        foodDescriptionPEl.text('Description: ' + foodDescription)
        foodImgEl.attr('src', response.results[removeFoodArray].thumbnail_url)
        foodImgEl.attr('class', 'foodImg')
        foodTimeEl.text('Average time to make: ' + foodTime)
        foodIngredientsEl.text('Ingredients: ' + componentsArray)
        foodInstructionsEl.text('Instructions: ' + instructionsArray)
        $('#food-card-panel').append(foodImgEl, foodNameHElement, foodDescriptionPEl, foodImgEl, foodIngredientsEl, foodInstructionsEl)
      });
      
    
    }});