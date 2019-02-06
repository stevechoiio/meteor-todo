import React, { Component } from "react";
import "./styles.css";
import ClearButton from "../../components/ClearButton";
import ToDoCount from "../../components/ToDoCount";
import Todo from "../../components/ToDoInput";
import { ToDos } from "../../../api/todo";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import AccountsUIWrapper from "../../components/AccountsUIWrapper/index";

//Stateful Component
class App extends Component {
  constructor(props) {
    super(props);
    this.toDoInput = React.createRef();
  }

  componentDidMount() {
    this.toDoInput.current.focus();
  }

  toggleComplete = item => {
    ToDos.update({ _id: item._id }, { $set: { complete: !item.complete } });
  };

  removeToDo = item => {
    ToDos.remove({ _id: item._id });
  };

  hasCompleted = () => {
    const newList = this.props.todos.filter(todo => todo.complete);
    return newList.length > 0 ? true : false;
  };

  removeCompleted = () => {
    const todos = ToDos.find({ complete: true }, { _id: 0 });
    todos.forEach(todo => ToDos.remove({ _id: todo._id }));
  };

  addToDo = event => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;
    if (toDoInput.value) {
      ToDos.insert({
        title: toDoInput.value,
        complete: false,
        owner: this.props.currentUserId // NEW!
      });

      toDoInput.value = "";
    }
  };

  render() {
    const showHeader = true;
    console.log(this.props.currentUserId);

    const { todos, currentUserId } = this.props;

    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        {currentUserId ? (
          <div className="todo-list">
            {showHeader ? <h1>So Much To Do</h1> : <h1>Untitled Project</h1>}
            <h2>Bob's To Do List</h2>

            <button
              onClick={() => {
                this.setState({ name: "John Wick" });
              }}
            >
              Change Name
            </button>
            <div className="add-todo">
              <form name="addTodo" onSubmit={this.addToDo}>
                <input type="text" ref={this.toDoInput} />
                <span>(press enter to add)</span>
              </form>
            </div>
            <ul>
              {todos.map(todo => {
                if (todo.owner == currentUserId) {
                  return (
                    <Todo
                      key={todo._id}
                      item={todo}
                      toggleComplete={this.toggleComplete}
                      removeToDo={this.removeToDo}
                    />
                  );
                }
              })}
            </ul>
            <div className="todo-admin">
              <ToDoCount number={todos.length} />
              {this.hasCompleted() && (
                <ClearButton removeCompleted={this.removeCompleted} />
              )}
            </div>
          </div>
        ) : (
          <div className="logged-out-message">
            <p>Please sign in to see your todos.</p>
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.array
};

App.defaultProps = {
  todos: []
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user(), // NEW!
    currentUserId: Meteor.userId(), // NEW!
    todos: ToDos.find({}).fetch()
  };
})(App);
