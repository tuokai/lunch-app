import { combineReducers } from 'redux';
import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  FETCH_ANTELL_MENU_REQUEST,
  FETCH_ANTELL_MENU_SUCCESS,
  FETCH_ANTELL_MENU_FAILURE,
} from './actions';

const RESTAURANT_IDS = {
  HERMIA_5: 134,
  HERMIA_6: 9870
};

const ANTELL_RESTAURANTS = {
  HERMIAN_FARMI: 342,
}

const defaultRestaurantSelection = [RESTAURANT_IDS.HERMIA_5, RESTAURANT_IDS.HERMIA_6];
const defaultAntellRestaurants = [ANTELL_RESTAURANTS.HERMIAN_FARMI];

function selectedRestaurants(state = defaultRestaurantSelection, action) {
  return state;
}

function selectedAntellRestaurants(state = defaultAntellRestaurants, action) {
  return state;
}

function selectedDate(state = new Date(), action) {
  return state;
}

function menu(
  state = {
    isFetching: false,
    isError: false,
    data: {}
  },
  action
) {
  switch (action.type) {
    case FETCH_MENU_REQUEST:
      return {
        ...state,
        isFetching: true,
        isError: false
      };
    case FETCH_MENU_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        data: action.menu
      };
    case FETCH_MENU_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    default:
      return state;
  }
}

function menusByRestaurantId(state = {}, action) {
  const id = action.restaurantId;
  switch (action.type) {
    case FETCH_MENU_REQUEST:
    case FETCH_MENU_SUCCESS:
    case FETCH_MENU_FAILURE:
      return {
        ...state,
        [id]: menu(state[id], action)
      };
    default:
      return state;
  }
}

function antellMenu(
  state = {
    isFetching: false,
    isError: false,
    data: {}
  },
  action
) {
  switch (action.type) {
    case FETCH_ANTELL_MENU_REQUEST:
      return {
        ...state,
        isFetching: true,
        isError: false
      };
    case FETCH_ANTELL_MENU_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        data: action.payload
      };
    case FETCH_ANTELL_MENU_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    default:
      return state;
  }
}

function antellMenusByRestaurantId(state = {}, action) {
  const id = action.payload && action.payload.ownerId ? action.payload.ownerId : null;
  switch (action.type) {
    case FETCH_ANTELL_MENU_REQUEST:
    case FETCH_ANTELL_MENU_SUCCESS:
    case FETCH_ANTELL_MENU_FAILURE:
      return {
        ...state,
        [id]: antellMenu(state[id], action)
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedRestaurants,
  selectedAntellRestaurants,
  selectedDate,
  menusByRestaurantId,
  antellMenusByRestaurantId,
});

export default rootReducer;
