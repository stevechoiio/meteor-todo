import PropTypes from "prop-types";
import React from "react";

const ClearButton = ({ removeCompleted }) => {
  return <button onClick={() => removeCompleted()}>Clear Completed</button>;
};
ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

export default ClearButton;
