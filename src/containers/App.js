import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMenuIfNeeded } from '../actions';
import './App.css';
import MenuList from '../components/MenuList';

class App extends Component {

  componentDidMount() {
    const { dispatch, selectedRestaurants } = this.props;
    selectedRestaurants.forEach(id => dispatch(fetchMenuIfNeeded(id)));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lunch App</h1>
        </header>
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
