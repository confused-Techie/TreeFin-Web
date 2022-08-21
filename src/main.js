const express = require("express");
const app = express();
const server_version = require("../package.json").version;
const handler = require("./handler.js");

app.use((req, res, next) => {
  req.start = Date.now();
  next();
});

app.get("/", async (req, res) => {
  // main handler for the website 
});

app.get("/item/:id", async (req, res) => {
  // handler for when an Item is accuratly searched.
});

app.get("/user/:user", async (req, res) => {
  // handler for viewing a users private library.
});

app.get("/api/search", async (req, res) => {
  // handler for api calls to search for data.
});

app.get("/api/file_search", async (req, res) => {
  // handler for searching specific files.
});

app.post("/api/upload", async (req, res) => {
  // handler for uploading data to the site.
});

app.use((req, res) => {
  handler.siteWideNotFound(req, res);
});

module.exports = app;
