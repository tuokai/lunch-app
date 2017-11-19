import fetch from 'isomorphic-fetch';

export const FETCH_MENU_REQUEST = 'FETCH_MENU_REQUEST';
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const FETCH_MENU_FAILURE = 'FETCH_MENU_FAILURE';

function fetchMenuRequest(restaurantId) {
  return {
    type: FETCH_MENU_REQUEST,
    restaurantId
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

const dailyMenuBaseUrl = 'https://cors.io/?https://www.sodexo.fi/ruokalistat/output/daily_json';

function dailyMenuUrl(restaurantId, date = new Date(), language = 'fi') {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${dailyMenuBaseUrl}/${restaurantId}/${year}/${month}/${day}/{language}`;
}

function fetchMenu(restaurantId) {
  return dispatch => {
    dispatch(fetchMenuRequest(restaurantId));
    return fetch(dailyMenuUrl(restaurantId))
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

export function fetchMenuIfNeeded(restaurantId) {
  return (dispatch, getState) => {
    if (shouldFetchMenu(getState(), restaurantId)) {
      return dispatch(fetchMenu(restaurantId));
    }
  };
}
