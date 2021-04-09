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

    // FETCH request for today's weather data
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
        // let dateValue2 = new Date(dt * 1000);       // Converting Unix timestamp to milliseconds and using moment.js to convert it to a date
        // console.log(dateValue2);
        let currentDate = dateValue.format('D MMMM YYYY');  
        let cityName = name;
        let temperature = main.temp;
        let humidity = main.humidity + '%';
        let windSpeed = wind.speed + ' m/s';
        let currentLatitude = coord.lat;
        let currentLongitutde = coord.lon;

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

    // FETCH request for the five day weather forecast data
    let fiveDayWeatherRequestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${weatherKey}&units=metric`;
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


        // Creating an array of objects for the future days forecast 
        let futureDayForecastDays = [
            dayOne = {
                date: '',
                icon: '',
                status: '',
                temperature: [],
                humidity: [],
                humidityAverage: '',
                windSpeed: [],
                windSpeedAverage: '',
            },
            dayTwo = {
                date: '',
                icon: '',
                status: '',
                temperature: [],
                humidity: [],
                humidityAverage: '',
                windSpeed: [],
                windSpeedAverage: '',
            },
            dayThree = {
                date: '',
                icon: '',
                status: '',
                temperature: [],
                humidity: [],
                humidityAverage: '',
                windSpeed: [],
                windSpeedAverage: '',
            },
            dayFour = {
                date: '',
                icon: '',
                status: '',
                temperature: [],
                humidity: [],
                humidityAverage: '',
                windSpeed: [],
                windSpeedAverage: '',
            },
            dayFive = {
                date: '',
                icon: '',
                status: '',
                temperature: [],
                humidity: [],
                humidityAverage: '',
                windSpeed: [],
                windSpeedAverage: '',
            },
        ];

        // Using a forEach loop to cycle through all the list items and extracting the relevant information to use as per days instead of per 3 hours
        let { list } = fiveDayForecast;
        listIndex = 0;
        list.forEach(function() {
            if(listIndex < 8) {
                addWeatherForecastToObject(0, listIndex);
            }
            else if(listIndex >= 8 && listIndex < 16) {
                addWeatherForecastToObject(1, listIndex);
            }
            else if(listIndex >= 16 && listIndex < 24) {
                addWeatherForecastToObject(2, listIndex);
            }
            else if(listIndex >= 24 && listIndex < 32) {
                addWeatherForecastToObject(3, listIndex);
            }
            else if(listIndex >= 32 && listIndex < 40) {
                addWeatherForecastToObject(4, listIndex);
            }
            listIndex++;
        });

        // Function to extract the relevant information from the data retrieved from the API        
        function addWeatherForecastToObject(arrayIndex, listIndex) {
            futureDayForecastDays[arrayIndex].date = moment(list[listIndex].dt * 1000).format('D MMMM YYYY');      // Getting the dates of the next five days

            if(listIndex > 0) {     //Using an if else statement to get the icon and weather description of each day for the next five days
                futureDayForecastDays[arrayIndex].icon = list[listIndex-1].weather[0]["icon"]
                futureDayForecastDays[arrayIndex].status = list[listIndex-1].weather[0]["description"]
            }
            else {
                futureDayForecastDays[arrayIndex].icon = list[listIndex].weather[0]["icon"]
                futureDayForecastDays[arrayIndex].status = list[listIndex].weather[0]["description"]
            }

            let temperatureValue = list[listIndex].main.temp;
            futureDayForecastDays[arrayIndex].temperature.push(temperatureValue);       // Adding the temperature to an array for each of the five days which is located in an array of objects 
            futureDayForecastDays[arrayIndex].temperature.sort(function(a, b) {         // Sorting the temperature values in the array from highest to lowest 
                return b - a;
            });    
   
            let humidityValue = list[listIndex].main.humidity;
            futureDayForecastDays[arrayIndex].humidity.push(humidityValue);
            let totalHumidity = futureDayForecastDays[arrayIndex].humidity.reduce(addingValuesInArray);     // Aggregating the humidity readings across the day - eight lots of 3 hour segments
            let humidityAverageValue = totalHumidity/8;                                                     // Averaging out the total humidity reading for the day
            futureDayForecastDays[arrayIndex].humidityAverage = humidityAverageValue;                       // Assigning the average humidty reading to the futureDaysForecast array of objects

            let windSpeedValue = list[listIndex].wind.speed;
            futureDayForecastDays[arrayIndex].windSpeed.push(windSpeedValue);
            let totalWindSpeed = futureDayForecastDays[arrayIndex].windSpeed.reduce(addingValuesInArray);   // Aggregating the wind speed readings across the day - eight lots of 3 hour segments
            let windSpeedAverageValue = totalWindSpeed/8;                                                   // Averaging out the total wind speed reading for the day
            futureDayForecastDays[arrayIndex].windSpeedAverage = windSpeedAverageValue;                     // Assigning the average wind speed reading to the futureDaysForecast array of objects
        }

        // Function to add the values in an array together
        function addingValuesInArray(total, number) {
            return total + number;
        }

        console.log(futureDayForecastDays);

        for(i = 0; i < futureDayForecastDays.length; i++) {
            let dateValue = futureDayForecastDays[i].date;
            let weatherIconValue = futureDayForecastDays[i].icon.slice(0,2);
            let weatherIcon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weatherIconValue}d.svg`;
            let weatherStatus = futureDayForecastDays[i].status;
            let temperature = Math.round(futureDayForecastDays[i].temperature[0]);
            let humidity = futureDayForecastDays[i].humidityAverage.toFixed(0) + '%';
            let windSpeed = futureDayForecastDays[i].windSpeedAverage.toFixed(2) + ' m/s';

            // Building the content of the individual five day weather articles
            const fiveDayWeatherDay = document.createElement('article');
            fiveDayWeatherDay.setAttribute('class', 'column');
            const fiveDayWeatherRender = `
                <h4 class="has-text-weight-bold is-size-5">${dateValue}</h4>
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
        //searchHistoryItem.setAttribute('style', 'background: #a8a8a8; cursor: pointer; margin: 0 auto;');
        searchHistoryArticle.prepend(searchHistoryItem);
        searchHistoryClick();
    }
}

// A function to store the searched city name in history
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
        searchInput.value = "";
        paragraph.addEventListener('click', searchWithHistory);
    })
}
searchHistoryClick();



