import express from "express";

const app = express();

// todo: change app to the inhouse module
const fn = app;

fn.get("/", (req, res) => {
  res.send("Hello World!");
});

export default fn;
