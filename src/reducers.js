import { combineReducers } from 'redux';
import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE
} from './actions';

const RESTAURANT_IDS = {
  HERMIA_5: 134,
  HERMIA_6: 9870
};

const defaultRestaurantSelection = [RESTAURANT_IDS.HERMIA_5, RESTAURANT_IDS.HERMIA_6];

function selectedRestaurants(state = defaultRestaurantSelection, action) {
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

const rootReducer = combineReducers({
  selectedRestaurants,
  selectedDate,
  menusByRestaurantId
});

export default rootReducer;
