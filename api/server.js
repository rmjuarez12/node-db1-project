//* Import Express and setup server
const express = require("express");
const server = express();

//* Ensure express parses JSON data
server.use(express.json());

//* Get Routers
const accountsRouter = require("./accounts/accounts-router");

//* Configure Routers
server.use("/api/accounts", accountsRouter);

//* Export Modules
module.exports = server;
