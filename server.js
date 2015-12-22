"use strict";

const webpackConfig = require('./webpack.config');
const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const serverLauncher = require('webpack-focus').serverLauncher;

const MOCKED_API_PORT = process.env.API_PORT;

/*****************************************
********* Webpack dev server *************
******************************************/

webpackConfig.externals = undefined; // Remove externals to make the app run in the dev server
serverLauncher(webpackConfig);

/*****************************************
************** Mocked API ****************
******************************************/

const app = express();
const API_ROOT = '/x/comment';

// Fake comments
let comments = [];
const commentsCount = Math.floor(Math.random() * 20) + 5;
for (let i = 0; i < commentsCount; i++) {
    comments.push({
        uuid: faker.random.uuid(),
        author: faker.random.number(),
        msg: faker.lorem.sentences(),
        creationDate: faker.date.past(),
        lastModified: faker.date.recent(),
        authorDisplayName: faker.name.findName()
    });
}
const myId = 'me';
const myDisplayName = faker.name.findName();

comments.push({
    uuid: faker.random.uuid(),
    author: myId,
    msg: faker.lorem.sentences(),
    creationDate: faker.date.past(),
    lastModified: faker.date.recent(),
    authorDisplayName: myDisplayName
});

comments = comments.sort(function compare(a, b) {
    return a.creationDate.getTime() - b.creationDate.getTime();
});

const avatars = comments.reduce(function reduceComments(result, comment) {
    result[comment.author] = faker.image.avatar();
    return result;
}, {[myId]: faker.image.avatar()});


// Middlewares

app.use(function corsMiddleware(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE');
    res.header('Content-Type', 'application/json');
    next();
});
app.use(bodyParser.json());

app.get(API_ROOT + '/api/comments', function getComments(req, res) {
    setTimeout(function defer() {
        res.json(comments);
    }, 500);
});

app.post(API_ROOT + '/api/comments', function publishComment(req, res) {
    const comment = req.body;
    comment.uuid = faker.random.uuid();
    comment.creationDate = new Date();
    comment.lastModified = new Date();
    comment.author = myId;
    comment.authorDisplayName = myDisplayName;
    comments.push(comment);
    res.end();
});

app.put(API_ROOT + '/api/comments/:uuid', function updateComment(req, res) {
    const uuid = req.params.uuid;
    comments = comments.map(function updateComment(comment) {
        if (comment.uuid === uuid) {
            comment = req.body;
            comment.uuid = uuid;
            comment.lastModified = new Date();
        }
        return comment;
    });
    res.end();
});

app.get('/x/account/api/accounts/:authorId/photo', function getAvatar(req, res) {
    const authorId = req.params.authorId;
    res.redirect(avatars[authorId]);
});

const server = app.listen(MOCKED_API_PORT, function serverCallback() {
    console.log('Mocked comments API listening at http://localhost:%s', MOCKED_API_PORT);
});
