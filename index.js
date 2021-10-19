import express from 'express';
import mariadb from 'mariadb';

var host = "locahost";
var user = "youtuber";
var database = "youtuber";
var password = "123456;"
express().listen(3000).post('/', (request, response) => {
  // @dynamic request.param.method(variable outside) 

  switch (request.param.method) {
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
              conn.query("INSERT INTO person (name,age) VALUES (?,?) ", [request.param.name, request.param.age]);

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
              conn.query("INSERT INTO person (name,age) VALUES (?,?) ", [request.param.name, request.param.age]);

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
              conn.query("UPDATE person SET name=? , age=? WHERE personId = ?  ", [request.param.name, request.param.age, request.param.personId]);

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
              conn.query("DELETE FROM person WHERE personId = ? ", [request.param.personId]);

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
  }
  response.send("idiot");
});

