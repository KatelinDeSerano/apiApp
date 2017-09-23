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

      //   <iframe
      // width="600"
      // height="450"
      // frameborder="0" style="border:0"
      // src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD52qc_fGEPK3CQH7mHvRW5sbzihDBYOKw
      //   &q=Space+Needle,Seattle+WA" allowfullscreen>
      // </iframe>
      initialize(result)  
  return `
    <div class="resultBox">
      ${result.name ? result.name : ""} <br>
      ${result.city ? result.city: ""} <br>
      ${result.state ? result.state: ""} <br>
      ${result.description ? result.description : ""} <br>
      ${result.directions ? result.directions : ""} <br>
      <div id="map"></div>
    </div>`;


};

var map;

function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

function markerMap(result) {
  console.log(result.lat)
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: result.lat, lng: result.lon},
    zoom: 8
  });
}

function displayTrailSearchData(data) {
  const results = data.places.map((item, index) => renderResult(item));
  
  console.log(data);
  $('#search-results').html(results);
}

function watchSubmit() {
  let search = [];
    $('#search-form').submit(event => {
      event.preventDefault();
       search[0] = $(event.currentTarget).find('#activity').val() || "";
       search[1] = $(event.currentTarget).find('#city').val() || "";
       search[2] = $(event.currentTarget).find('#state').val() || "";
       search[3] = $(event.currentTarget).find('#myRange').val() || "";
      getDataFromApi(search, displayTrailSearchData);
  });
}
//$(stateTypeahead);
$(watchSubmit);
//initMap();

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

$('#the-basics .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: substringMatcher(states)
});
