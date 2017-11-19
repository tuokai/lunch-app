import React from 'react';
import PropTypes from 'prop-types';

const Course = ({ title, category, properties, price }) => (
  <div>
    <div>{category}</div>
    <div>{title}</div>
    <div>{price}</div>
    <div>{properties}</div>
  </div>
);

Course.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  properties: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default Course;
