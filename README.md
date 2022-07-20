# A proof of concept to show differences between a cursor and offset approaches 
The main idea is to compare how more memories and resources the node.js server uses to generate a csv file with lots of records. 

## Table of Contents

- [Quick start](#install)
- [Documentation](#documentation)



## Install
- Clone this repository:
```shell
  git clone https://github.com/pedchenkoroman/cursor-database-dev.to.git
```
- Run this command to set the database up:
```shell
  docker compose up -d
```
- Copy `config.example.json` file to `config` folder and rename it `config.json`
```shell
  cp -i config.example.json config/config.json
```
> Please pay attention if you change some configuration variables in `docker-compose.yml` file do not forget to change it into `config/config.json` file.

- Install dependency:
```shell
  npm install
```
- Start the server:
```shell
  npm start
```
- View the website at: http://localhost:3001/status You will see a realtime metrics of your server. I use [express-status-monitor](https://www.npmjs.com/package/express-status-monitor)
- Last but not least please run the command to actually create a `Users` table in the database:
```shell
  npm run start:migration
```
And to fill the table some data run the last one:
```shell
  npm run start:seed:all
```
> I use [RANDOM USER GENERATOR API](https://randomuser.me) 

## Documentation

First thing first I would like to say that I use [the json2csv package](https://www.npmjs.com/package/json2csv) to generate csv from json.

1. The first solution that was on the top of my head to achieve a desired result is to take all records from the table
and then to generate a csv file and send it. Let's open `routers/user.router.js` file and take a look at a callback for `/csv` path.
First up I call the method `read` from the `user service` that returns all users, and then I call the synchronous method
`getParseSync` pass into all users and receive csv which send to front-end. So, navigate to the link `http://localhost:3001/users/csv` and you will see just list of users.
Nothing fancy, but if you open in the separate tab `http://localhost:3001/status` you will find a runtime metrics. The image is number 1.
<div>
    <figure>
        <img src="./img/first-option-1.png" width="300" height="300" alt="metrics">
        <figcaption>Metrics when the server is doing nothing</figcaption>
    </figure>
    <figure>
        <img src="./img/first-option-2.png" width="300" height="300" alt="metrics">
        <figcaption>Metrics of the first solution</figcaption>
    </figure>
</div>

