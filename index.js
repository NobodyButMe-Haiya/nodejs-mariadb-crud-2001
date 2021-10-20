const express = require('express'); // not working import express from 'express';
const mariadb = require('mariadb'); // not working import mariadb from 'mariadb';
const _ = require('lodash');

var host = "localhost";
var user = "youtuber";
var database = "youtuber";
var password = "123456";
var app = express();

app.use(express.urlencoded({ extended: true }))
app.listen(3000);

app.post('/', (request, response) => {
  switch (request.body.mode) {
    case "create":
      createRecord(request,response);
      break;
    case "read":
      readRecord(request,response);
      break;
    case "update":
      updateRecord(request,response);
      break;
    case "delete":
      deleteRecord(request,response);
      break;
    default:
      response.status(200).json({ "status": false, "message": "something wrong with routing " });
      break;
  }
});
function createRecord(request,response) {
  mariadb.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
  })
    .then(conn => {
      conn.beginTransaction()
        .then(() => {
          return conn.query("INSERT INTO person (name,age) VALUES (?,?) ", [request.body.name, request.body.age]);
        })
        .then((result) => {
          // some data we want to aquire . 
          console.log("Affected Row : " + result.affectedRows);
          console.log("Insert id : " + result.insertId);
          console.log("warning status : " + result.warningStatus);
          conn.commit();
          response.status(200).json({ "status": true, "message": "record inserted" });
        })
        .catch((err) => {
          console.log(err.message);
          conn.rollback();
        })
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
    });
}
function readRecord(request,response) {
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
}
function updateRecord(request,response) {
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
          return conn.query("UPDATE person SET name=? , age=? WHERE personId = ?  ", [request.body.name, request.body.age, request.body.personId]);

        })
        .then((result) => {
          // some data we want to aquire . 
          console.log("Affected Row : " + result.affectedRows);
          console.log("Insert id : " + result.insertId);
          console.log("warning status : " + result.warningStatus);
          conn.commit();
          response.status(200).json({ "status": true, "message": "record updated" });
        })
        .catch((err) => {
          console.log(err.message);
          conn.rollback();
        })
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
    });
}
function deleteRecord(request,response) {
  mariadb.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
  })
    .then(conn => {
      conn.beginTransaction()
        .then(() => {

          return conn.query("DELETE FROM person WHERE personId = ? ", [request.body.personId]);

        })
        .then(() => {
          // some data we want to aquire . 
          console.log("Affected Row : " + result.affectedRows);
          console.log("Insert id : " + result.insertId);
          console.log("warning status : " + result.warningStatus);

          conn.commit();
          response.status(200).json({ "status": true, "message": "record deleted" });
        })
        .catch((err) => {
          console.log(err.message);
          conn.rollback();
        })
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
    });
}
