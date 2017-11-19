import React from 'react';
import PropTypes from 'prop-types';

const MenuHeader = ({ title, url }) => (
  <div>
    <a href={url}>{title}</a>
  </div>
);

MenuHeader.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default MenuHeader;
