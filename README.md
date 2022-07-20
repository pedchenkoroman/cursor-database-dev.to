# A proof of concept to show differences between a cursor and offset approaches 

## Table of Contents

- [Quick start](#install)



## Install
- Clone this repository
```console
    $ git clone https://github.com/pedchenkoroman/cursor-database-dev.to.git
```
- Run this command to set the database up
```console
    $ docker compose up -d
```
- Copy `config.example.json` file to `config` folder and rename it `config.json`
```console
    $ cp -i config.example.json config/config.json
```
> Please pay attention if you change some configuration variables in `docker-compose.yml` file do not forget to change it into `config/config.json` file

- Install dependency
```console
    $ npm i
```

