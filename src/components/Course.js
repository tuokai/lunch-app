import React from 'react';
import PropTypes from 'prop-types';
import './Course.css';

const Course = ({ title, category, properties, price }) => (
  <div className="Course">
    <div className="Category">{category}</div>
    <div className="Title">{title}</div>
    <div className="PriceProperties">
      <div className="Price">{price}</div>
      <div className="Properties">{properties}</div>
    </div>
  </div>
);

Course.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  properties: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default Course;
