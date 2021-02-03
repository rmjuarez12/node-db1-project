//* Function to validate ID
const validateAccountID = (accountsModel) => (req, res, next) => {
  const { id } = req.params;

  accountsModel
    .getByID(id)
    .then((account) => {
      if (account.length) {
        req.account = account[0];
        next();
      } else {
        res.status(404).json({ message: "Account Not Found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//* Function to ensure no duplicates
const validateDuplicate = (accountsModel) => (req, res, next) => {
  const { name } = req.body;

  accountsModel
    .getByName(name)
    .then((account) => {
      if (account.length) {
        res
          .status(400)
          .json({ message: "An account with that name already exists" });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//* Functio to ensure no empty name is entered
const validateAccountBody = (req, res, next) => {
  const account = req.body;

  if (!account.name || account.name === "") {
    res.status(400).json({ message: "Please enter a name" });
  } else if (!account.budget || account.budget === "") {
    res.status(400).json({ message: "Please enter a budget" });
  } else {
    next();
  }
};

//* Export Modules

module.exports = {
  validateAccountID,
  validateDuplicate,
  validateAccountBody,
};
