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

let searchHistoryArray = [];

const apiKey = '202043d5ec00ac7500baba67031e8d1e'; 

// Functions
function getWeatherApi(event) {
    event.preventDefault();
    let inputValue = searchInput.value;
    //searchInput.value = "";
    let weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;;

    fetch(weatherRequestUrl)
    .then(response => response.json())
    .then(cityConditions => {
        console.log(cityConditions);
        let { dt, main, name, weather, wind } = cityConditions;
        let weatherIcon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
        let weatherStatus = weather[0]["description"];
        let dateValue = moment(cityConditions.dt * 1000);       // Converting Unix timestamp to milliseconds and using moment.js to convert it to a date
        let currentDate = dateValue.format('D MMMM YYYY');  
        let cityName = cityConditions.name;
        let temperature = cityConditions.main.temp + " °C";
        let humidity = cityConditions.main.humidity;
        let windSpeed = cityConditions.wind.speed;
        let currentLatitude = cityConditions.coord.lat;
        let currentLongitutde = cityConditions.coord.lon;

        // Creating, appending and styling the TODAY'S WEATHER SECTION
        const todayWeatherSection = document.createElement('section');
   
        const todayWeatherHeader = document.createElement('h3');
        const todayWeatherArticle = document.createElement('article');
        const todayWeatherTemperatureContainer = document.createElement('div');
        const todayWeatherTemperatureValue = document.createElement('h3');
        const todayWeatherIconContainer = document.createElement('div');
        //const todayWeatherTemperature = document.createElement('p');
        const todayWeatherIcon = document.createElement('img');
        const todayWeatherStatus = document.createElement('p');
        const todayWeatherConditionsContainer = document.createElement('div');
        const todayWeatherDate = document.createElement('p');
        const todayWeatherHumidity = document.createElement('p');
        const todayWeatherWindSpeed = document.createElement('p');
        const todayWeatherUVIndex = document.createElement('p');

        todayWeatherSection.setAttribute('class', 'today-weather-section');

        todayWeatherTemperatureContainer.append(todayWeatherTemperatureValue);
        todayWeatherIconContainer.append(todayWeatherTemperatureContainer);
        //todayWeatherIconContainer.append(todayWeatherTemperature);
        todayWeatherIconContainer.append(todayWeatherIcon);
        todayWeatherIconContainer.append(todayWeatherStatus);
        todayWeatherConditionsContainer.append(todayWeatherDate);
        todayWeatherConditionsContainer.append(todayWeatherHumidity);
        todayWeatherConditionsContainer.append(todayWeatherWindSpeed);
        todayWeatherConditionsContainer.append(todayWeatherUVIndex);
        todayWeatherArticle.append(todayWeatherIconContainer);
        todayWeatherArticle.append(todayWeatherTemperatureContainer);

        todayWeatherArticle.append(todayWeatherConditionsContainer);
        todayWeatherSection.append(todayWeatherHeader);
        todayWeatherSection.append(todayWeatherArticle);

        todayWeatherSection.setAttribute('class', 'box');
        todayWeatherHeader.setAttribute('class', 'is-size-5 mb-1');
        todayWeatherHeader.innerHTML = 'Today\'s Forecast - <strong>' + cityName + `</strong>`;
        todayWeatherArticle.setAttribute('class', 'columns');
        todayWeatherIconContainer.setAttribute('class', 'column');
        todayWeatherTemperatureContainer.setAttribute('class', 'column is-flex is-align-items-center is-justify-content-center');
        todayWeatherConditionsContainer.setAttribute('class', 'column');

        //todayWeatherTemperature.setAttribute('class', 'is-size-5 has-text-weight-bold');
        //todayWeatherTemperature.textContent = temperature;
        todayWeatherIcon.setAttribute('style', `content: url(${weatherIcon});`);
        todayWeatherStatus.setAttribute('class', '');
        todayWeatherStatus.innerHTML = weatherStatus;

        todayWeatherTemperatureValue.setAttribute('class', 'has-text-weight-bold is-size-1');
        todayWeatherTemperatureValue.textContent = temperature;

        todayWeatherDate.setAttribute('class', 'is-size-5 mb-3');
        todayWeatherDate.innerHTML = `<strong>` + currentDate + `</strong>`;
        todayWeatherHumidity.setAttribute('class', 'mb-2');
        todayWeatherHumidity.innerHTML = `<strong>Humidity:</strong> ` + humidity + `%`;
        todayWeatherWindSpeed.setAttribute('class', 'mb-2');
        todayWeatherWindSpeed.innerHTML = `<strong>Wind Speed:</strong> ` + windSpeed + ` meter/sec`;
        todayWeatherUVIndex.setAttribute('class', 'mb-2');
        todayWeatherUVIndex.textContent = "UV Index, yet to get";

        // Creating, appending and styling the FIVE DAY WEATHER SECTION
        const fiveDayWeatherSection = document.createElement('section');
    
        const fiveDayWeatherHeader = document.createElement('h3');
        const fiveDayWeatherDaysContainer = document.createElement('article');

        let days = ['One', 'Two', 'Three', 'Four', 'Five'];
        for(i = 0; i < days.length; i++) {
            const fiveDayWeatherDay = document.createElement('article');
            const fiveDayWeatherDayIcon = document.createElement('img');
            const fiveDayWeatherDayDate = document.createElement('p');
            const fiveDayWeatherDayTemperature = document.createElement('p');
            const fiveDayWeatherDayHumidity = document.createElement('p');

            fiveDayWeatherDay.setAttribute('class', 'column');
            fiveDayWeatherDayIcon.setAttribute('class', 'row');
            fiveDayWeatherDayDate.setAttribute('class', 'row');
            fiveDayWeatherDayTemperature.setAttribute('class', 'row');
            fiveDayWeatherDayHumidity.setAttribute('class', 'row');
            fiveDayWeatherDay.innerHTML = '<h4>Day ' + days[i] + '</h4>';
            fiveDayWeatherDayIcon.setAttribute('data-weather-icon', 'Get icon ' + days[i]);
            fiveDayWeatherDayDate.setAttribute('data-weather-date', 'Get date ' + days[i]);
            fiveDayWeatherDayTemperature.setAttribute('data-weather-temperature', 'Get temperature ' + days[i]);
            fiveDayWeatherDayHumidity.setAttribute('data-weather-humidity', 'Get humidity ' + days[i]);

            fiveDayWeatherDay.append(fiveDayWeatherDayDate);
            fiveDayWeatherDay.append(fiveDayWeatherDayIcon);
            fiveDayWeatherDay.append(fiveDayWeatherDayTemperature);
            fiveDayWeatherDay.append(fiveDayWeatherDayHumidity);
            fiveDayWeatherDaysContainer.append(fiveDayWeatherDay);
        }

        fiveDayWeatherSection.append(fiveDayWeatherHeader);
        fiveDayWeatherSection.append(fiveDayWeatherDaysContainer);
        let sectionSelect = document.querySelectorAll('section');
        if(sectionSelect.length > 2) {
            sectionSelect[2].remove();
            sectionSelect[1].remove();
        }

        mainSection.insertBefore(todayWeatherSection, searchHistorySection);
        mainSection.insertBefore(fiveDayWeatherSection, searchHistorySection);

        fiveDayWeatherSection.setAttribute('class', 'box text-center');
        fiveDayWeatherHeader.textContent = 'Five Day Weather Forecast';
        fiveDayWeatherDaysContainer.setAttribute('class', 'columns');

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

// function renderSearchHistoryWhenFull() {
//     console.log
//     searchHistoryArticle.removeChild(searchHistoryArticle.lastChild);
//     let searchHistoryItem = document.createElement('p');
//     searchHistoryItem.textContent = searchHistoryArray[0];
//     searchHistoryItem.setAttribute('data-search-history', 0);
//     searchHistoryItem.setAttribute('class', 'mb-1 p-1 search-city');
//     searchHistoryItem.setAttribute('style', 'background: #a8a8a8; cursor: pointer; margin: 0 auto;');
//     searchHistoryArticle.prepend(searchHistoryItem);
//     searchClick();
// }

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

//const searchCity = document.querySelectorAll('.search-city');

// for (const paragraph of searchCities) {
//     paragraph.addEventListener('click', searchWithHistory);
// }
// for(i = 0; i < searchCities.length; i++) {
//     searchCities[i].addEventListener('click', searchWithHistory);
// }
function searchHistoryClick() {
    const searchCity = document.querySelectorAll('.search-city');
    Array.from(searchCity).forEach(paragraph => {
        searchInput.value = "";
        paragraph.addEventListener('click', searchWithHistory);
    })
}
searchHistoryClick();



