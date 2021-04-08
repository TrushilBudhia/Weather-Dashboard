// Building the page by creating and appending elements
const body = document.querySelector('body');
const headerSection = document.querySelector('header');
const mainSection = document.querySelector('main');
const footerSection = document.querySelector('footer');

body.setAttribute('class', 'has-background-info-light m-0 p-0');
body.setAttribute('style', 'height: 100%;');
headerSection.setAttribute('class', 'has-background-primary-dark mb-5 py-3');
headerSection.setAttribute('style', 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%), 0 3px 4px 0 rgb(0 0 0 / 19%);');
mainSection.setAttribute('class', 'container has-text-centered');

// Creating, appending and styling the HEADER SECTION
const pageHeading = document.createElement('h1');
const pageIcon = document.createElement('i');
headerSection.append(pageIcon);
headerSection.append(pageHeading);
pageIcon.setAttribute('class', 'weather-icon header-style ml-1 mr-2');
pageHeading.setAttribute('class', 'header-style has-text-left has-text-white title is-2');
pageHeading.textContent = 'Weather Dashboard';

// Creating, appending and styling the SEARCH SECTION
const searchSection = document.createElement('section');
const searchForm = document.createElement('form');
const searchLabel = document.createElement('label');
const searchInput = document.createElement('input');
const searchSubmit = document.createElement('button');

searchForm.append(searchLabel);
searchForm.append(searchInput);
searchForm.append(searchSubmit);
searchSection.append(searchForm);
mainSection.append(searchSection);

searchLabel.textContent = "City to search";
searchInput.setAttribute('placeholder', 'Input City Name');
searchSubmit.textContent = 'Submit';

searchLabel.setAttribute('class', 'label has-text-grey is-size-4 is-flex is-justify-content-flex-start');
searchInput.setAttribute('class', 'input');
searchSubmit.setAttribute('class', 'button is-primary mt-2 submit');
searchSubmit.setAttribute('style', 'margin-left: 70%; width: 30%;');
searchSection.setAttribute('class', 'box');

// Creating, appending and styling the SEARCH HISTORY SECTION
const searchHistorySection = document.createElement('section');
const searchHistoryHeader = document.createElement('h3');
const searchHistoryArticle = document.createElement('article');

searchHistorySection.append(searchHistoryHeader);
searchHistorySection.append(searchHistoryArticle);
mainSection.append(searchHistorySection);

searchHistorySection.setAttribute('class', 'box mb-5');
searchHistoryHeader.textContent = 'Search History';
searchHistoryHeader.setAttribute('class', 'title is-4');

// Creating, appending and styling the footer section
const footerParagraph = document.createElement('p');
const footerParagraphAnchor = document.createElement('a');
footerParagraphAnchor.textContent = "Trushil";
footerParagraphAnchor.setAttribute('href', 'https://trushilbudhia.github.io/Portfolio/');
footerParagraphAnchor.setAttribute('class', 'has-text-white');
footerParagraph.textContent = '© Created by ';
footerSection.setAttribute('class', 'bg-secondary p-4 text-center text-white w-100');
footerSection.setAttribute('style', 'background: #313131; bottom: 0px; color: #fff; left: 0px; margin: 0 auto; padding: 20px 0; position: relative; text-align: center; width: 100%;');
footerParagraph.append(footerParagraphAnchor);
footerSection.append(footerParagraph);

// User enters city name in input field
// When submit is clicked, the text in the input field is used to target what city the weather data needs to be requested for
// The open weather API takes parameters of lat, lon - how can a city (string) provide such information?
// How to get UV Index - use the lat and lon
// 

const weatherKey = 'f7d89673838826a4c4b4d46f85f8dde7';
let searchHistoryArray = [];

// Functions
function getWeatherApi(event) {
    event.preventDefault();
    let inputValue = searchInput.value;
    //searchInput.value = "";
    let todayWeatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${weatherKey}&units=metric`;

    fetch(todayWeatherRequestUrl, {
        cache: "reload",
    })
    .then(response => response.json())
    .then(cityConditions => {
        console.log(cityConditions);
        let { coord, dt, main, name, sys, weather, wind } = cityConditions;
        let weatherIcon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
        let weatherStatus = weather[0]["description"];
        let dateValue = moment(dt * 1000);       // Converting Unix timestamp to milliseconds and using moment.js to convert it to a date
        let currentDate = dateValue.format('D MMMM YYYY');  
        let cityName = name;
        let temperature = main.temp;
        let humidity = main.humidity + '%';
        let windSpeed = wind.speed + ' m/s';
        let currentLatitude = coord.lat;
        let currentLongitutde = coord.lon;

        /*fetch(todayWeatherRequestUrl, {
            cache: "reload",
        })
        .then()*/

        // Creating, appending and styling the TODAY'S WEATHER SECTION
        const todayWeatherSection = document.createElement('section');

        const todayWeatherRender = `
            <h3 class="city-name is-size-3 mb-1" data-name="${name},${sys.country}">
                <span>${cityName}</span>
                <sup>${sys.country}</sup>
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
                    <p class="is-size-5"><strong>UV Index:</strong> </p>
                </article>
            </article>
        `;

        todayWeatherSection.innerHTML = todayWeatherRender;
        todayWeatherSection.setAttribute('class', 'box today-weather-section');
        let sectionSelect = document.querySelectorAll('section');
        if(sectionSelect.length > 3) {
            sectionSelect[2].remove();
            //sectionSelect[1].remove();
        }

        mainSection.insertBefore(todayWeatherSection, searchHistorySection);
    })
    .catch((error) => {
        console.error('Error: ', error);
    })

    let fiveDayWeatherRequestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${weatherKey}`;
    fetch(fiveDayWeatherRequestUrl, {
        cache: "reload",
    })
    .then(response => response.json())
    .then(fiveDayForecast => {
        console.log(fiveDayForecast);

        // Creating, appending and styling the FIVE DAY WEATHER SECTION
        const fiveDayWeatherSection = document.createElement('section');
        const fiveDayWeatherHeader = document.createElement('h3');
        const fiveDayWeatherDaysContainer = document.createElement('article');

        fiveDayWeatherSection.setAttribute('class', 'box');
        fiveDayWeatherHeader.setAttribute('class', 'has-text-weight-bold is-size-4 mb-2');
        fiveDayWeatherHeader.textContent = 'Five Day Weather Forecast';
        fiveDayWeatherDaysContainer.setAttribute('class', 'columns');

        let days = ['One', 'Two', 'Three', 'Four', 'Five'];
        for(i = 0; i < days.length; i++) {
            let { city, list } = fiveDayForecast;
            let weatherIcon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${list[i].weather[0]["icon"]}.svg`;
            let weatherStatus = list[i].weather[0]["description"];
            let dateValue = moment(list[i].dt * 1000);       // Converting Unix timestamp to milliseconds and using moment.js to convert it to a date
            let currentDate = dateValue.format('D MMMM YYYY');  
            let cityName = city.name;
            //let temperature = (list[i].main.temp - 32) * (5/9);
            let temperature = list[i].main.temp;
            let humidity = list[i].main.humidity + '%';
            let windSpeed = list[i].wind.speed + ' m/s';

            // Use if statement to calculate the date, average temperation, humidity, wind speed and date of the day
            // if(i <= 8) {}
            // if(i >=8 && i <= 16) {}
            // if(i >= 16 && i <= 24) {}
            // if(i >= 24 && i <= 32) {}
            // if(i >= 32 && i <= 40) {}

            const fiveDayWeatherDay = document.createElement('article');
            fiveDayWeatherDay.setAttribute('class', 'column');
            const fiveDayWeatherRender = `
                <h4 class="has-text-weight-bold is-size-5">${currentDate}</h4>
                <figure>
                    <img src="${weatherIcon}" alt="${weatherStatus}">
                    <figcaption>${weatherStatus}</figcaption>
                </figure>
                <p class="has-text-weight-bold is-size-2">${temperature}<sup>°C</sup></p>
                <p class="mb-3"><strong>Humidity:</strong> ${humidity}</p>
                <p class="mb-3"><strong>Wind:</strong> ${windSpeed}</p>
            `;
            //fiveDayWeatherDaysContainer.append(fiveDayWeatherRender);
            fiveDayWeatherDay.innerHTML = fiveDayWeatherRender;
            fiveDayWeatherDaysContainer.append(fiveDayWeatherDay);
        }

        fiveDayWeatherSection.append(fiveDayWeatherHeader);
        fiveDayWeatherSection.append(fiveDayWeatherDaysContainer);
        let sectionSelect = document.querySelectorAll('section');
        if(sectionSelect.length > 3) {
            sectionSelect[1].remove();
            //sectionSelect[1].remove();
        }

        mainSection.insertBefore(fiveDayWeatherSection, searchHistorySection);

        addToSearchHistory(searchHistoryArray, inputValue);
        storeSearchHistory();
    })
    .catch((error) => {
        console.error('Error: ', error);
    })   
}

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

function renderSearchHistory() {
    while(searchHistoryArticle.firstChild) {
        searchHistoryArticle.removeChild(searchHistoryArticle.firstChild);
    }
    for(i = 0; i < searchHistoryArray.length; i++) {
        let searchHistoryItem = document.createElement('p');
        searchHistoryItem.textContent = searchHistoryArray[i];
        searchHistoryItem.setAttribute('data-search-history', i);
        searchHistoryItem.setAttribute('class', 'mb-1 p-1 search-city');
        searchHistoryItem.setAttribute('style', 'background: #a8a8a8; cursor: pointer; margin: 0 auto;');
        searchHistoryArticle.prepend(searchHistoryItem);
        searchHistoryClick();
    }
}

function storeSearchHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
}

function loadSearchHistory() {
    // Getting the search history item from the local storage
    var storedSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    // If storedSearchHistory does not equal null, the value of storedSearchHistory is assigned to the searchHistory
    if (storedSearchHistory !== null) {
        searchHistoryArray = storedSearchHistory;
        renderSearchHistory();
    }
}

// Events
searchForm.addEventListener('submit', getWeatherApi);

// Loading the recent search history on page load
loadSearchHistory();

function searchWithHistory(event) {
    event.preventDefault();
    //console.log(this);
    //console.log(searchCity);

    searchValue = this.getAttribute('data-search-history');
    searchInput.value = searchHistoryArray[searchValue];
    getWeatherApi(event);
}

function searchHistoryClick() {
    const searchCity = document.querySelectorAll('.search-city');
    Array.from(searchCity).forEach(paragraph => {
        searchInput.value = "";
        paragraph.addEventListener('click', searchWithHistory);
    })
}
searchHistoryClick();



