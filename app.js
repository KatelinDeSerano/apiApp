const TRAIL_SEARCH_URL = 'https://trailapi-trailapi.p.mashape.com/';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: TRAIL_SEARCH_URL,
    headers: {
    	"X-Mashape-Key":'fktrGW6H8jmsh5TUMcpKzTWEz81Sp1NvCYNjsnGFTnBlZ0Zc0d'
    },

    
    data: {
      "q[activities_activity_type_name_eq]": searchTerm,
      // "q[city_cont]": searchTerm,
      // "q[state_cont]": searchTerm,
      // "q[country_cont]": searchCountry,
      // lat: searchTerm,
      // lon: searchTerm,
      // radius: searchTerm,
      limit: 5,

      // add more key value properties here
      
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
    <div>
      ${result.city}
    </div>`;
}

function displayTrailSearchData(data) {
  const results = data.places.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
     const query = queryTarget.val();
     queryTarget.val("");
    getDataFromApi(query, displayTrailSearchData);
  });
}

$(watchSubmit);
