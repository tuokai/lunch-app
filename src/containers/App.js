import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMenuIfNeeded, fetchAntellMenu } from '../actions';
import './App.css';
import MenuList from '../components/MenuList';

class App extends Component {

  componentDidMount() {
    const {
      dispatch,
      selectedRestaurants,
      antellRestaurants,
      selectedDate
    } = this.props;
    selectedRestaurants.forEach(id => dispatch(fetchMenuIfNeeded(id, selectedDate)));
    antellRestaurants.forEach(id => dispatch(fetchAntellMenu(id)));
  }

  render() {
    return (
      <div className="App">
        <h1>{this.props.selectedDate.toDateString()}</h1>
        <MenuList sodexoMenus={this.props.menus} antellMenus={this.props.antellMenus} />
      </div>
    );
  }
}

App.propTypes = {
  selectedRestaurants: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  menus: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    selectedRestaurants: state.selectedRestaurants,
    antellRestaurants: state.selectedAntellRestaurants,
    selectedDate: state.selectedDate,
    menus: state.selectedRestaurants.map(id =>
       state.menusByRestaurantId[id] || {
         isFetching: true,
         isError: false,
         data: {}
       }
     ),
    antellMenus: state.selectedAntellRestaurants.map(id =>
      state.antellMenusByRestaurantId[id] || {
        isFetching: true,
        isError: false,
        data: {},
      }
    ),
  };
}

export default connect(mapStateToProps)(App);
