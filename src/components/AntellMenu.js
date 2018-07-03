import React from 'react';
import PropTypes from 'prop-types';
import MenuHeader from './MenuHeader';
import './Menu.css';

const Menu = ({ isFetching, isError, data }) => {

  let title;
  if (isFetching || !data || !data.ownerId) {
    title = 'Loading...'
  } else if (isError) {
    title = 'Error';
  } else {
    title = data.restaurantName;
  }

  const parsedMenu = (data && data.parsedMenu) ? data.parsedMenu : [];

  const renderCategory = ({ title, courses, price }) => (
    <div className="Course" key={title}>
      <div className="Category">
      { title }
      </div>
      <div className="Title">
      {courses.map((course) =>
        <div key={course}>{course}</div>
      )}
      </div>
      <div className="PriceProperties">
        <div className="Price">
        { price } €
        </div>
      </div>
    </div>
  )

  return (
    <div className="Menu">
      <MenuHeader title={title} url={data ? data.restaurantUrl : null} />
      {parsedMenu.map(item => renderCategory(item))}
    </div>
  )
};

Menu.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

export default Menu;
