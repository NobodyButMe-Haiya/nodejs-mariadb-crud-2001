this is stable version 

this is sample node.js expressjs, mariadb with crud(create , read , update, delete) functionality . 

nodejs doesn't support form-data , normal form-urlencode can .. 

https://youtu.be/2WDQNMrcofM

[![IMAGE ALT TEXT](http://img.youtube.com/vi/2WDQNMrcofM/0.jpg)](http://www.youtube.com/watch?v=2WDQNMrcofM " NodeJS  Crud in 2021")

#SQL 

```
CREATE TABLE `person` (
    `personId` int(11) NOT NULL,
    `name` varchar(150) NOT NULL,
    `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `person`
    ADD PRIMARY KEY (`personId`);

ALTER TABLE `person`
    MODIFY `personId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
```




