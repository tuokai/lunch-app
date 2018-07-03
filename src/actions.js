import fetch from 'isomorphic-fetch';

import { getTodaysMenu } from './antellMenuParser';

export const FETCH_MENU_REQUEST = 'FETCH_MENU_REQUEST';
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const FETCH_MENU_FAILURE = 'FETCH_MENU_FAILURE';

export const FETCH_ANTELL_MENU_REQUEST = 'FETCH_ANTELL_MENU_REQUEST';
export const FETCH_ANTELL_MENU_SUCCESS = 'FETCH_ANTELL_MENU_SUCCESS';
export const FETCH_ANTELL_MENU_FAILURE = 'FETCH_ANTELL_MENU_FAILURE';

function fetchMenuRequest(restaurantId, date) {
  return {
    type: FETCH_MENU_REQUEST,
    restaurantId,
    date
  };
}

function fetchMenuSuccess(restaurantId, json) {
  return {
    type: FETCH_MENU_SUCCESS,
    restaurantId,
    menu: json
  };
}

function fetchMenuFailure(restaurantId) {
  return {
    type: FETCH_MENU_FAILURE,
    restaurantId
  }
}

function fetchAntellMenuRequest(payload) {
  return {
    type: FETCH_ANTELL_MENU_REQUEST,
    payload,
  };
}

function fetchAntellMenuSuccess(payload) {
  return {
    type: FETCH_ANTELL_MENU_SUCCESS,
    payload,
  };
}

function fetchAntellMenuFailure(payload) {
  return {
    type: FETCH_ANTELL_MENU_FAILURE,
    payload,
  }
}

//const corsProxyUrl = 'https://cors.io/?';
const corsProxyUrl = 'https://my-cors-app.herokuapp.com/';
const dailyMenuBaseUrl = `${corsProxyUrl}https://www.sodexo.fi/ruokalistat/output/daily_json`;
const antellMenuBaseUrl = `${corsProxyUrl}https://www.antell.fi/lounaslistat/lounaslista.html`;

function dailyMenuUrl(restaurantId, date = new Date(), language = 'fi') {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${dailyMenuBaseUrl}/${restaurantId}/${year}/${month}/${day}/${language}`;
}

function fetchMenu(restaurantId, date) {
  return dispatch => {
    dispatch(fetchMenuRequest(restaurantId));
    return fetch(dailyMenuUrl(restaurantId, date))
      .then(response => response.json())
      .then(
        json => dispatch(fetchMenuSuccess(restaurantId, json)),
        error => dispatch(fetchMenuFailure(restaurantId))
      );
  };
}

function shouldFetchMenu(state, restaurantId) {
  const menu = state.menusByRestaurantId[restaurantId];
  return !menu;
}

export function fetchMenuIfNeeded(restaurantId, date) {
  return (dispatch, getState) => {
    if (shouldFetchMenu(getState(), restaurantId)) {
      return dispatch(fetchMenu(restaurantId, date));
    }
  };
}

export function fetchAntellMenu(ownerId) {
  return (dispatch) => {
    dispatch(fetchAntellMenuRequest({ ownerId }));
    return fetch(`${antellMenuBaseUrl}?owner=${ownerId}`)
      .then(response => response.text())
      .then(
        htmlMenu => dispatch(fetchAntellMenuSuccess(
          { ownerId, ...getTodaysMenu(htmlMenu) }
        )),
        error => dispatch(fetchAntellMenuFailure({ ownerId, error }))
      );
  };
}
