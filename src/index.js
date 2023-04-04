import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(() => {
    const value = searchBox.value.trim();
    wordValidate(value);
  }, DEBOUNCE_DELAY)
);

function wordValidate(value) {
  if (value !== '') {
    fetchCountries(value).then(val => {
      if (val.length <= 10 && val.length > 1) {
        fetchCountries(value).then(renderPagebyManyItems);
      }
      if (val.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (val.length === 1) {
        fetchCountries(value).then(renderPagebyOneItem);
      }
    });
  }
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
function renderPagebyManyItems(countries) {
  const countryMany = countries
    .map(({ name, flags }) => {
      return `<li><img src = ${flags.svg} width=20 height=10 style="margin-right: 10px"><b>${name.official}</b></li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('afterbegin', countryMany);
  countryList.style.listStyle = 'none';
}
function renderPagebyOneItem(countries) {
  const countryOrder = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `<img src = ${
        flags.svg
      } width = 20 height = 10 style="margin-right: 10px"><b>${
        name.official
      }</b>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>`;
    })
    .join('');
  countryInfo.insertAdjacentHTML('afterbegin', countryOrder);
}
