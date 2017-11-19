import React from 'react';
import PropTypes from 'prop-types';
import './MenuHeader.css';

const MenuHeader = ({ title, url }) => (
  <div className="MenuHeader">
    <a href={url}>{title}</a>
  </div>
);

MenuHeader.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default MenuHeader;
