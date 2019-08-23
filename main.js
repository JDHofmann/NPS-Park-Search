const apiKey = 'eBJcwyRyTdY3wgglRVTiMZ2oYkak7hnnHAp9C8d6';

const baseUrl = 'https://developer.nps.gov/api/v1/parks';


function formatQuery(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  // console.log(queryItems);
  return queryItems.join('&');
}

function watchSecondInput(stateTwoInput) {
  if (stateTwoInput !== '') {
    return '&' + encodeURIComponent('stateCode') + '=' + encodeURIComponent(stateTwoInput)
  } return '';
}

function getParks(stateOneInput, stateTwoInput, maxResults) {
  // console.log(stateOneInput, stateTwoInput, maxResultsInput);
  const params = {
    stateCode: stateOneInput,
    limit: maxResults
  }
  let queryString = formatQuery(params);
  queryString += watchSecondInput(stateTwoInput);
  const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;
  console.log(url);
/*
  const options = {
    headers: new Headers({
      "x-api-key": apiKey
    })
  };
  */
  fetch(url)
    .then(response => {
      // check to see if response 200 ok
      if (response.ok) {
        return response.json();
      }
      // if not throw to error
      throw new Error(response.statusText);
    })
    .then(responseJson =>
      displayResults(responseJson, maxResults, stateOneInput, stateTwoInput)
    )
    .catch( err => {
      $('.error-message').text(`Something went wrong: ${err.message}`);
    });
    // return stateOneInput, stateTwoInput;
}

function displayStates(stateOneInput, stateTwoInput) {

  if (stateTwoInput == '') {
    return stateOneInput.toUpperCase();
  } else if (stateOneInput == '') {
    return stateTwoInput.toUpperCase();
  }
    else {
      let firstState = stateOneInput.toUpperCase();
      let secondState = stateTwoInput.toUpperCase();
      return `${firstState} & ${secondState}`;
    }
}

function displayResults(responseJson, maxResults, stateOneInput, stateTwoInput){
  // console.log(responseJson);
  $('.results').empty();
  console.log(stateOneInput);
  let states = displayStates(stateOneInput, stateTwoInput);
  $('.results').append(`<h3>Showing Results For: ${states}</h3>`)
  if (responseJson.data.length === 0) {
    $('.results').append(`
      <li class="not-state">* That is not currently a state *<br>
      make sure your using the correct two letter state code</li>
      `);
  }

    for (let i = 0; i < responseJson.data.length & i < maxResults ; i++) {
    $('.results').append(
        `<li><h3 class="park-name">${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a target="_blank" href="${responseJson.data[i].url}">Website</a>
        </li>`
      )};

  //display the results section
  //$('.results').css('visibility','visible');

}

function watchForm() {
  // console.log('`watchForm` has run')
  $('form').submit(
    function(event) {
      event.preventDefault();
      // console.log('form has been submitted');
      const stateOneInput = $('.state-search').val().toLowerCase();
      const stateTwoInput = $('.state-search2').val();
      const maxResults = $('.max-results-input').val();
      getParks(stateOneInput, stateTwoInput, maxResults);
    }
  );
}

$(watchForm());
