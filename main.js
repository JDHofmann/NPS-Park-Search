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
    console.log('watchSecondInput found a value');
  } return '';
  console.log('watchSecondInput did not find a value');
}

function getParks(stateOneInput, stateTwoInput, maxResultsInput) {
  // console.log(stateOneInput, stateTwoInput, maxResultsInput);
  const params = {
    stateCode: stateOneInput,
    limit: maxResultsInput
  }
  let queryString = formatQuery(params);
  queryString += watchSecondInput(stateTwoInput);
  console.log(queryString);
  //return queryString;
}

function watchForm() {
  // console.log('`watchForm` has run')
  $('form').submit(
    function(event) {
      event.preventDefault();
      // console.log('form has been submitted');
      const stateOneInput = $('.state-search').val().toLowerCase();
      const stateTwoInput = $('.state-search2').val();
      const maxResultsInput = $('.max-results-input').val();
      getParks(stateOneInput, stateTwoInput, maxResultsInput);
    }
  );
}

$(watchForm());
