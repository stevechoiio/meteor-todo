import { Meteor } from "meteor/meteor";
import { ToDos } from "../../api/todo";

import { Accounts } from "meteor/accounts-base";
Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    user = Accounts.createUser({
      email: "m@wise.com",
      password: "password"
    });
    // add data to the database
    if (ToDos.find().count() === 0) {
      ToDos.insert({
        title: "Learn Meteor",
        complete: false,
        owner: user
      });
    }
  }
});
