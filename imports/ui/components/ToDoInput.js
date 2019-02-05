import PropTypes from "prop-types";
import React from "react";

const Todo = ({ item, toggleComplete, removeToDo }) => {
  return (
    <li>
      {item.title}
      <input
        type="checkbox"
        id={item._id}
        defaultChecked={item.complete}
        onChange={() => toggleComplete(item)}
      />
      <label htmlFor={item._id} />
      <button onClick={() => removeToDo(item)}>
        <i className="fa fa-trash" />
      </button>
    </li>
  );
};

Todo.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  })
};

export default Todo;
