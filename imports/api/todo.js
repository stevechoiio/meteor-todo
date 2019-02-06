import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
export const ToDos = new Mongo.Collection("todos");

if (Meteor.isServer) {
  Meteor.publish("todos", function todosPublication() {
    return ToDos.find({ owner: this.userId });
  });
}

Meteor.methods({
  "todos.toggleComplete"(todo) {
    if (todo.owner !== this.userId) {
      throw new Meteor.Error(
        "todos.toggleComplete.not-authorized",
        "You are not allowed to update to-dos for other users."
      );
    }
    ToDos.update(todo._id, {
      $set: { complete: !todo.complete }
    });
  },

  "todos.addToDo"(toDoInput) {
    if (!this.userId) {
      throw new Meteor.Error(
        "todos.addToDo.not-authorized",
        "You are not allowed to add to-dos for other users."
      );
    }
    if (toDoInput) {
      ToDos.insert({
        title: toDoInput,
        complete: false,
        owner: this.userId // NEW!
      });
    }
  },

  "todos.removeToDo"(todo) {
    if (todo.owner !== this.userId) {
      throw new Meteor.Error(
        "todos.removeTodo.not-authorized",
        "You are not allowed to remove to-dos for other users."
      );
    }
    ToDos.remove({ _id: todo._id });
  },
  "todos.removeCompleted"() {
    if (!this.userId) {
      throw new Meteor.Error(
        "todos.removeCompleted.not-authorized",
        "You are not allowed to remove completed items for other users."
      );
    }
    const todos = ToDos.find(
      { complete: true, owner: this.userId },
      { _id: 0 }
    );
    todos.forEach(todo => ToDos.remove({ _id: todo._id }));
  }
});
