'use strict';

// Import files
import { validatIp, removeInputValue, initMap } from './helpers';

// Global variables
let ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationsInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');
const mapBlock = document.querySelector('.maps');
const loadingBlock = document.querySelector('.loader');

const modalMessage = document.querySelector('.modalMessage');
const modalText = document.querySelector(
  '.modalMessage .containerMessage > span'
);

// Event logic
document.addEventListener('DOMContentLoaded', currentIp);
btn.addEventListener('click', () => {
  getDate();
});
ipInput.addEventListener('keydown', handleKey);

document
  .querySelector('.closeModal')
  .addEventListener('click', handleCloseModalError);

// Initial get IP-address logic
function currentIp() {
  fetch(`https://ipapi.co/json/`)
    .then((response) => response.json())
    .then((responseData) => {
      const getCurrentIp = responseData.ip;
      getDate(getCurrentIp);
    });
}

function getDate(getCurrentIp = ipInput.value) {
  if (validatIp(getCurrentIp)) {
    addLoader();
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_1z6v5PEbliuMymE8WUQAr6nnb8wNf&ipAddress=${getCurrentIp}`
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        // console.log(responseData);
        if (responseData.code === 422)
          throw new Error('Input correct IPv4 or IPv6 address.');
        setInfo(responseData);
      })
      .catch((error) => {
        viewModalMessage(error);
      })
      .finally(() => {
        removeLoader();
      });
  }

  removeInputValue(event, ipInput);
}

function handleKey(event) {
  console.log(event);
  if (event.key === 'Enter') {
    getDate();
  }
}

// More logic

// Вывод информации о полученном местоположении в блок информации
function setInfo(mapData) {
  console.log(mapData);
  const {
    ip,
    isp,
    location: { country, region, lat, lng, timezone },
  } = mapData;

  document.querySelector('.info').classList.add('active');
  mapBlock.classList.add('active');

  ipInfo.innerHTML = ip;
  locationsInfo.innerHTML = `${country} ${region}`;
  timezoneInfo.innerHTML = `UTC ${timezone}`;
  ispInfo.innerHTML = isp;

  initMap(lng, lat, mapBlock);
}

//// Работа с loader
// Добавление loader
function addLoader() {
  loadingBlock.classList.add('show');
}

// Скрытие loader после поулчения данных
function removeLoader() {
  loadingBlock.classList.remove('show');
}

// Вывод модального окна об ошибке при её получении с сервера/при некорректных дейтсвиях пользователя
export function viewModalMessage(error) {
  if (error) {
    modalMessage.classList.add('active');
    modalText.innerHTML = `${error}`;
  }
  setTimeout(() => {
    modalMessage.classList.remove('active');
  }, 3000);
}

// Закртиые модального при нажатии на кнопку закрытия
function handleCloseModalError(event) {
  event.target.classList == 'closeModal'
    ? modalMessage.classList.remove('active')
    : false;
}
