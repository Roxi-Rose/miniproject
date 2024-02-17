const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const  middleware= (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
};

module.exports = {
  middleware,
};
