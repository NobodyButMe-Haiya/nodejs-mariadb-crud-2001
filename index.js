const express = require('express'); // not working import express from 'express';
const mariadb = require('mariadb'); // not working import mariadb from 'mariadb';
const _ = require('lodash');

var host = "localhost";
var user = "youtuber";
var database = "youtuber";
var password = "123456";
var app = express();
// form data issue ? 
app.use(express.urlencoded({ extended: true }))
app.listen(3000);
app.post('/', (request, response) => {
  var x = request.body;
  console.log(x);
  switch (request.body.mode) {
    case "create":
      mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: password
      })
        .then(conn => {
          conn.beginTransaction()
            .then(() => {
              // unsure it will work 
              // using bind parameter
              conn.query("INSERT INTO person (name,age) VALUES (?,?) ", [request.body.name, request.body.age]);

            })
            .then(() => {
              conn.commit();
              response.status(200).json({ "status": true, "message": "record inserted" });
            })
            .catch((err) => {
              conn.rollback();
            })
        })
        .catch(err => {
          response.status(200).json({ "status": false, "message": err.message });
        });
      break;
    case "read":
      var result = "";
      mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: password
      })
        .then(conn => {
          result = conn.query("SELECT * FROM person ");
          console.log(result);
          _.difference(result['meta']);
          return result;
        }).then((result) => {
          console.log("complete")
          response.status(200).json({ "status": true, "a": "3", "data": result });
        })
        .catch(err => {
          response.status(200).json({ "status": false, "message": err.message });
        });
      break;
    case "update":
      mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: password
      })
        .then(conn => {
          conn.beginTransaction()
            .then(() => {
              // unsure it will work 
              // using bind parameter
              conn.query("UPDATE person SET name=? , age=? WHERE personId = ?  ", [request.body.name, request.body.age, request.body.personId]);

            })
            .then(() => {
              conn.commit();
              response.status(200).json({ "status": true, "message": "record updated" });
            })
            .catch((err) => {
              conn.rollback();
            })
        })
        .catch(err => {
          response.status(200).json({ "status": false, "message": err.message });
        });
      break;
    case "delete":
      mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: password
      })
        .then(conn => {
          conn.beginTransaction()
            .then(() => {
              // unsure it will work 
              // using bind parameter
              conn.query("DELETE FROM person WHERE personId = ? ", [request.body.personId]);

            })
            .then(() => {
              conn.commit();
              response.status(200).json({ "status": true, "message": "record deleted" });
            })
            .catch((err) => {
              conn.rollback();
            })
        })
        .catch(err => {
          response.status(200).json({ "status": false, "message": err.message });
        });
      break;
    default:
      response.status(200).json({ "status": false, "message": "something wrong with routing " });
      break;
  }
});

