//* Import Express and Setup Router
const express = require("express");
const router = express.Router();

//* Import Models
const Accounts = require("./accounts-model");

//* Import Middleware
const getMiddleware = require("../middleware/middleware");

//* Setup Endpoint Handlers

//-- GET
// Get all Accounts
router.get("/", (req, res) => {
  Accounts.get()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get an account by ID
router.get("/:id", getMiddleware.validateAccountID(Accounts), (req, res) => {
  const { account } = req;

  res.status(200).json(account);
});

//-- POST
// Create new Account
router.post(
  "/",
  [
    getMiddleware.validateAccountBody,
    getMiddleware.validateDuplicate(Accounts),
  ],
  (req, res) => {
    const account = req.body;
    Accounts.insert(account)
      .then((newAccount) => {
        res.status(201).json(newAccount);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

//-- PUT
// Update an existing account
router.put(
  "/:id",
  [
    getMiddleware.validateAccountID(Accounts),
    getMiddleware.validateAccountBody,
  ],
  (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    Accounts.update(id, newData)
      .then((account) => {
        res.status(200).json(account);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

//* Export Modules
module.exports = router;
