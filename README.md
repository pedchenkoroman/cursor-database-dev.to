# A proof of concept to show differences between a cursor and offset approaches 

## Table of Contents

- [Quick start](#install)



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
- View the website at: http://localhost:3001

