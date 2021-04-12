// Building the page by creating and appending elements
const body = document.querySelector('body');
const headerSection = document.querySelector('header');
const mainSection = document.querySelector('main');
const footerSection = document.querySelector('footer');

body.setAttribute('class', 'has-background-info-light m-0 p-0');
body.setAttribute('style', 'height: 100vh;');
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
searchHistoryHeader.setAttribute('class', 'label has-text-grey title is-4');

// Creating, appending and styling the footer section
const footerParagraph = document.createElement('p');
const footerParagraphAnchor = document.createElement('a');
footerParagraphAnchor.textContent = "Trushil";
footerParagraphAnchor.setAttribute('href', 'https://trushilbudhia.github.io/Portfolio/');
footerParagraphAnchor.setAttribute('class', 'has-text-white');
footerParagraph.textContent = '© Made by ';
footerSection.setAttribute('class', 'bg-secondary p-4 text-center text-white w-100');
footerSection.setAttribute('style', 'background: #313131; bottom: 0px; color: #fff; left: 0px; margin: 0 auto; padding: 20px 0; position: fixed; text-align: center; width: 100%;');
footerParagraph.append(footerParagraphAnchor);
footerSection.append(footerParagraph);