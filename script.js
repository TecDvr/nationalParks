'use strict';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
};

function getParks(query, limit) {
  const params = {
    stateCode: query,
    limit: limit - 1,
    api_key: '5HQXzn9SyDDpkanyPvch8XCC0Kza9oHXZ8M2iLAr'
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayParks(responseJson))
    .catch(error => {
      alert('Something is not right!');
    });
};

function displayParks(responseJson) {
  console.log(responseJson);
  $('#parkResultsList').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#parkResultsList').append(`
  <li>
    <h3>${responseJson.data[i].fullName}</h3>
    <p>${responseJson.data[i].description}</p>
    <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
  </li>
  `);
  };
};

function listenForInput() {
  $('form').submit(function(event) {
    event.preventDefault();
    $('.hiddenList').removeClass('hiddenList');
    const searchState = $('#searchState').val();
    const limit = $('#maxResults').val();
    getParks(searchState, limit);
  });
};

$(listenForInput);