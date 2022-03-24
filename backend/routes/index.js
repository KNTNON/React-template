'use strict'

module.exports = function (app) {

  const fs = require('fs')
  const path = require('path')
  const express = require('express')
  const router = express.Router()
  const basename = path.basename(__filename)
  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(function (file) {
      let route = require(path.join(__dirname, file))
      route.prefix ? app.use(route.prefix, route) : app.use(route)
    })
}
