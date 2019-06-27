import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
  const sum = course.parts.reduce((r, p) => r + p.exercises, 0);
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <p><b>total of {sum} exercises</b></p>
    </div>
  );
};

export default Course;
