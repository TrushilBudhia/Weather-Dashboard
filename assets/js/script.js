const weatherKey = 'f7d89673838826a4c4b4d46f85f8dde7';
let searchHistoryArray = [];

// Functions
function getWeatherApi(event) {
    event.preventDefault();
    let inputValue = searchInput.value;

    // FETCH request for today's weather data
    let todayWeatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${weatherKey}&units=metric`;
    fetch(todayWeatherRequestUrl, {
        cache: "reload",
    })
    .then(response => response.json())
    .then(cityConditions => {
        let { coord, name, sys } = cityConditions;
        let cityName = name;
        let country = sys.country;
        let currentLatitude = coord.lat;
        let currentLongitutde = coord.lon;
        let part = 'minutely,hourly'
        // FETCH request for the Open Weather Map One Call API data
        let oneCallApiRequestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLatitude}&lon=${currentLongitutde}&exclude=${part}&appid=${weatherKey}&units=metric`;
        fetch(oneCallApiRequestURL, {
            cache: "reload",
        })
        .then(response => response.json())
        .then(cityWeatherData => {
            let { current, daily } = cityWeatherData;
            let dateValue = moment(current.dt * 1000);       // Converting Unix timestamp to milliseconds and using moment.js to convert it to a date
            let currentDate = dateValue.format('D MMMM YYYY');  
            let weatherIcon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${current.weather[0]["icon"]}.svg`;
            let weatherStatus = current.weather[0]["description"];
            let temperature = current.temp;
            let humidity = current.humidity + '%';
            let windSpeed = current.wind_speed + ' m/s';
            let uvIndex = current.uvi;
          
            // Creating, appending and styling the TODAY'S WEATHER SECTION
            const todayWeatherSection = document.createElement('section');
    
            const todayWeatherRender = `
                <h3 class="city-name is-size-3 mb-1" data-name="${name},${country}">
                    <span>${cityName}</span>
                    <sup>${country}</sup>
                </h3>
                <article class="columns">
                    <article class="column">
                        <h4 class="has-text-weight-bold is-size-5 mb-3">${currentDate}</h4>
                        <figure>
                            <img src="${weatherIcon}" alt="${weatherStatus}">
                            <figcaption>${weatherStatus}</figcaption>
                        </figure>
                    </article>
                    <article class="column is-flex is-align-items-center is-justify-content-center">
                        <h3 class="city-temperature has-text-weight-bold is-size-1">${temperature}<sup>°C</sup></h3>
                    </article>
                    <article class="column">
                        <p class="is-size-5 mb-3"><strong>Humidity:</strong> ${humidity}</p>
                        <p class="is-size-5 mb-3"><strong>Wind:</strong> ${windSpeed}</p>
                        <p class="is-size-5"><strong>UV Index:</strong> <span class="uv-index-color">${uvIndex}<span class="uv-index-info hidden"></span></span></p>
                    </article>
                </article>
            `;
            todayWeatherSection.innerHTML = todayWeatherRender;
            todayWeatherSection.setAttribute('class', 'box today-weather-section');
            mainSection.insertBefore(todayWeatherSection, searchHistorySection);

            // Creating, appending and styling the FIVE DAY WEATHER SECTION
            const fiveDayWeatherSection = document.createElement('section');
            const fiveDayWeatherHeader = document.createElement('h3');
            const fiveDayWeatherDaysContainer = document.createElement('article');

            fiveDayWeatherSection.setAttribute('class', 'box');
            fiveDayWeatherHeader.setAttribute('class', 'has-text-weight-bold is-size-4 mb-2');
            fiveDayWeatherHeader.textContent = 'Five Day Weather Forecast';
            fiveDayWeatherDaysContainer.setAttribute('class', 'columns');
   
            for(i = 0; i < 5; i++) {
                let dateValue = moment(daily[i].dt * 1000);       // Converting Unix timestamp to milliseconds and using moment.js to convert it to a date
                let futureDate = dateValue.format('D MMMM YYYY');  
                let weatherIconValue = daily[i].weather[0].icon;
                let weatherIcon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weatherIconValue}.svg`;
                let weatherStatus = daily[i].weather[0].description;
                let temperature = Math.round(daily[i].temp.day);
                let humidity = daily[i].humidity + '%';
                let windSpeed = daily[i].wind_speed + ' m/s';

                // Building the content of the individual five day weather articles
                const fiveDayWeatherDay = document.createElement('article');
                fiveDayWeatherDay.setAttribute('class', 'column');
                const fiveDayWeatherRender = `
                    <h4 class="has-text-weight-bold is-size-5">${futureDate}</h4>
                    <figure>
                        <img src="${weatherIcon}" alt="${weatherStatus}">
                        <figcaption>${weatherStatus}</figcaption>
                    </figure>
                    <p class="has-text-weight-bold is-size-2">${temperature}<sup>°C</sup></p>
                    <p class="mb-3"><strong>Humidity:</strong> ${humidity}</p>
                    <p class="mb-3"><strong>Wind:</strong> ${windSpeed}</p>
                `;
                fiveDayWeatherDay.innerHTML = fiveDayWeatherRender;
                fiveDayWeatherDaysContainer.append(fiveDayWeatherDay);
            }

            fiveDayWeatherSection.append(fiveDayWeatherHeader);
            fiveDayWeatherSection.append(fiveDayWeatherDaysContainer);
            let sectionSelect = document.querySelectorAll('section');
            if(sectionSelect.length > 3) {
                sectionSelect[2].remove();
                sectionSelect[1].remove();
            }
            uvColor(uvIndex);

            mainSection.insertBefore(fiveDayWeatherSection, searchHistorySection);
            addToSearchHistory(searchHistoryArray, inputValue);
            storeSearchHistory();
        })
        .catch((error) => {
            console.error('Error: ', error);
        }) 
    })
    .catch((error) => {
        console.error('Error: ', error);
    })
    // Changing the height of the body when the submit button is clicked. And changing the display of the footer from absolute to block
    body.setAttribute('style', 'height: 100%;');
    setTimeout(function() {
        footerSection.setAttribute('style', 'background: #313131; color: #fff; display: block; padding: 20px 0; text-align: center;');
    }, 500);
}

// Adding the city searched to the search history. A maximum of 5 cities to be displayed in the search history
function addToSearchHistory(searchHistoryArray, searchHistoryCity) {
    if(searchHistoryArray.length < 5) {
        searchHistoryArray.push(searchHistoryCity);
        renderSearchHistory();
    }
    else {
        searchHistoryArray.shift();
        searchHistoryArray.push(searchHistoryCity);
        renderSearchHistory();
    }
}

// Rendering the search history by creating elements that are prepended to the search history article
function renderSearchHistory() {
    while(searchHistoryArticle.firstChild) {
        searchHistoryArticle.removeChild(searchHistoryArticle.firstChild);
    }
    for(i = 0; i < searchHistoryArray.length; i++) {
        let searchHistoryItem = document.createElement('button');
        searchHistoryItem.textContent = searchHistoryArray[i];
        searchHistoryItem.setAttribute('data-search-history', i);
        searchHistoryItem.setAttribute('class', 'button is-fullwidth is-primary is-outlined mb-1 p-1 search-city');
        searchHistoryArticle.prepend(searchHistoryItem);
        searchHistoryClick();
    }
}

// A function to give the UV Index background a color depending on the reading
function uvColor(uvIndexValue, uvInfo) {
    let uvIndexSpan = document.querySelector('.uv-index-color');
    let uvIndexInfoSpan = document.querySelector('.uv-index-info');
    if(uvIndexValue >= 0 && uvIndexValue < 3) {
        uvIndexSpan.setAttribute('style', 'background: #33bc33; color: #fff; cursor: help; padding: 0.2rem 0.9rem;');
        uvInfo = 'Low exposure level';
        uvIndexInfoSpan.innerHTML = uvInfo;
    }
    else if(uvIndexValue >= 3 && uvIndexValue < 6) {
        uvIndexSpan.setAttribute('style', 'background: #fffc2b; color: #000; cursor: help; padding: 0.2rem 0.9rem;');
        uvInfo = 'Moderate exposure level';
        uvIndexInfoSpan.innerHTML = uvInfo;
    }
    else if(uvIndexValue >= 6 && uvIndexValue < 8) {
        uvIndexSpan.setAttribute('style', 'background: #ff9c2f; color: #fff; cursor: help; padding: 0.2rem 0.9rem;');
        uvInfo = 'High exposure level';
        uvIndexInfoSpan.innerHTML = uvInfo;
    }
    else if(uvIndexValue >= 8 && uvIndexValue <= 10) {
        uvIndexSpan.setAttribute('style', 'background: #fa2f2f; color: #fff; cursor: help; padding: 0.2rem 0.9rem;');
        uvInfo = 'Very high exposure level';
        uvIndexInfoSpan.innerHTML = uvInfo;
    }
    else {
        uvIndexSpan.setAttribute('style', 'background: #ff0000; color: #fff; cursor: help; padding: 0.2rem 0.9rem;');
        uvInfo = 'Extreme exposure level';
        uvIndexInfoSpan.innerHTML = uvInfo;
    }
}

// A function to store the searched city name in history
function storeSearchHistory() {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray));
}

function loadSearchHistory() {
    // Getting the search history item from the local storage
    var storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    // If storedSearchHistory does not equal null, the value of storedSearchHistory is assigned to the searchHistory
    if (storedSearchHistory !== null) {
        searchHistoryArray = storedSearchHistory;
        renderSearchHistory();
    }
}

// Events
// A click event for the submit to the city search form
searchForm.addEventListener('submit', getWeatherApi);

// Loading the recent search history on page load
loadSearchHistory();

// A function to call when the city item in the search history is clicked by the user
function searchWithHistory(event) {
    event.preventDefault();
    searchValue = this.getAttribute('data-search-history');
    searchInput.value = searchHistoryArray[searchValue];
    getWeatherApi(event);
}

function searchHistoryClick() {
    const searchCity = document.querySelectorAll('.search-city');
    Array.from(searchCity).forEach(paragraph => {
        searchInput.value = '';
        paragraph.addEventListener('click', searchWithHistory);
    })
}
searchHistoryClick();



