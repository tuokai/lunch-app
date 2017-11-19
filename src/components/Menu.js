import React from 'react';
import PropTypes from 'prop-types';
import MenuHeader from './MenuHeader';
import CourseList from './CourseList';
import './Menu.css';

const Menu = ({ isFetching, isError, data }) => {
  const courses = data.courses || [];
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
    <div className="Menu">
      <MenuHeader title={title} url={url} />
      <CourseList>{courses}</CourseList>
    </div>
  )
};

Menu.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

export default Menu;
