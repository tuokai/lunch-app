import React from 'react';
import PropTypes from 'prop-types';
import MenuHeader from './MenuHeader';

const Menu = ({ isFetching, isError, data }) => {
  const meta = data.meta;
  const url = meta && meta.ref_url;
  let title;

  if (isFetching) {
    title = 'Loading...';
  } else if (isError) {
    title = 'Error';
  } else {
    title = (meta && meta.ref_title) || '';
  }

  return (
    <div>
      <MenuHeader title={title} url={url} />
    </div>
  )
};

Menu.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

export default Menu;
