//* Import the database config file
const db = require("../../data/dbConfig");

//* Functions to make queries

// Get All Accounts
function get() {
  return db("accounts");
}

// Get Account by ID
function getByID(id) {
  return db("accounts").where({ id });
}

// Get Account by Name
function getByName(name) {
  return db("accounts").where({ name });
}

// Create a new Account
function insert(account) {
  return db("accounts")
    .insert(account)
    .then((ids) => {
      return getByID(ids[0]);
    });
}

// Update an existing account
function update(id, changes) {
  return db("accounts").where({ id }).update(changes);
}

//* Export modules
module.exports = {
  get,
  getByID,
  insert,
  getByName,
  update,
};
