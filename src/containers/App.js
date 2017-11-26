import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMenuIfNeeded } from '../actions';
import './App.css';
import MenuList from '../components/MenuList';

class App extends Component {

  componentDidMount() {
    const { dispatch, selectedRestaurants, selectedDate } = this.props;
    selectedRestaurants.forEach(id => dispatch(fetchMenuIfNeeded(id, selectedDate)));
  }

  render() {
    return (
      <div className="App">
        <h1>{this.props.selectedDate.toDateString()}</h1>
        <MenuList>{this.props.menus}</MenuList>
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
    selectedDate: state.selectedDate,
    menus: state.selectedRestaurants.map(id =>
       state.menusByRestaurantId[id] || {
         isFetching: true,
         isError: false,
         data: {}
       }
     )
  };
}

export default connect(mapStateToProps)(App);
