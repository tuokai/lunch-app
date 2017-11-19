import React from 'react';
import Course from './Course';

const CourseList = ({ children }) => (
  <div>
    { children.map((course, i) => (
      <Course
        key={i}
        title={course.title_fi || ''}
        category={course.category || ''}
        properties={course.properties || ''}
        price={`${course.price} €` || ''} />
    ))}
  </div>
);

export default CourseList;
