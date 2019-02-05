import PropTypes from 'prop-types';
import React from "react";

const ToDoCount = ({number}) => {
    return <p>{number}{number > 1 ? ' Todos' : ' Todo'}</p>;
};
  
  // providing default prop value to prop number
  ToDoCount.defaultProps = {
    number: 0
  };
  
  // prop type validation for prop number
  ToDoCount.propTypes = {
   number: PropTypes.number,
  };

  export default ToDoCount;