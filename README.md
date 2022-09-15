# Jokes Project

This is a project developed by Eugenio Páez. The purpose of application is to create a simple app which show random jokes (one at a time). It consist in three packages in the monorepo:

- API: Is a simple backend package developed with NodeJS using Typescript.

- APP: Basic application developed with React (and also, Typescript)

- Library: It contains the common types between API and APP.

## Start running application (development mode)

### API Setup

First of all, we need to setup the API package. For that, we will follow next steps:

1.- Install PostgreSQL. This will be the database we will use. To do it, go to https://www.postgresql.org/ and click on download. Then we will follow steps guided by installer to complete installation.

2.- Install TypeORM CLI running `sudo npm install -g typeorm`

3.- Create `.env` file in api folder. We can copy `example.env` content file which is at same directory and paste inside our new `.env` file. (Variable values in example.env are valid)

4.- Open terminal in root monorepo directory and run `npm install`

5.- Database will create when we start the project, so after previous step, run `npm run dev:api` to run application in development mode. This step will also run all migrations we made for the correct application behaviour (this migrations are under migrations folder in api directory)

### APP Setup

First, we need to create `.env` file inside app folder. We can copy `example.env` content file and paste inside new `.env` file (variables contained inside example.env are valid).

After that, we will run application running command `npm run dev:app`. This will running our application in development mode.
