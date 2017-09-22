const TRAIL_SEARCH_URL = 'https://trailapi-trailapi.p.mashape.com/';

function getDataFromApi(search, callback) {
  const settings = {
    url: TRAIL_SEARCH_URL,
    headers: {
    	"X-Mashape-Key":'fktrGW6H8jmsh5TUMcpKzTWEz81Sp1NvCYNjsnGFTnBlZ0Zc0d'
    },
    
    data: {
      "q[activities_activity_type_name_eq]": search[0],
      "q[city_cont]": search[1],
      "q[state_cont]": search[2],
      "q[country_cont]": "United States",
      radius: search[3],
      limit: 5,
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

function renderResult(result) {
  return `
    <div class="resultBox">
      ${result.city ? result.city: ""} <br>
      ${result.state ? result.state: ""} <br>
      ${result.name ? result.name : ""} <br>
      ${result.description ? result.description : ""} <br>
      ${result.directions ? result.directions : ""} <br>
    </div>`;
}

function displayTrailSearchData(data) {
  const results = data.places.map((item, index) => renderResult(item));
  console.log(data);
  $('.js-search-results').html(results);
}

function watchSubmit() {
	let search = [];
  $('.js-search-form').submit(event => {
    event.preventDefault();
     search[0] = $(event.currentTarget).find('.js-activity').val() || "";
     search[1] = $(event.currentTarget).find('.js-city').val() || "";
     search[2] = $(event.currentTarget).find('.js-state').val() || "";
     search[3] = $(event.currentTarget).find('#myRange').val() || "";
    getDataFromApi(search, displayTrailSearchData);
  });
}

$(watchSubmit);
