"use strict";

const configBuilder = require('./webpack.config').builder;
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');

const MOCKED_API_PORT = 9090;
const WEBPACK_DEV_SERVER_PORT = 3000;

/*****************************************
********* Webpack dev server *************
******************************************/

new WebpackDevServer(webpack(configBuilder('dev')), {
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    contentBase: './dist/',
    proxy: {
        '*': `http://localhost:${MOCKED_API_PORT}`
    }
}).listen(WEBPACK_DEV_SERVER_PORT, 'localhost', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Webpack dev server listening at http://localhost:%s', WEBPACK_DEV_SERVER_PORT);
});

/*****************************************
************** Mocked API ****************
******************************************/

const app = express();
const API_ROOT = '/x/comment';

// Fake comments
let comments = [];
const commentsCount = Math.floor(Math.random() * 20);
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

// Middlewares

app.use(function corsMiddleware(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE');
    res.header('Content-Type', 'application/json');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get(API_ROOT + '/api/comments', function getComments(req, res) {
    res.json(comments);
});

app.post(API_ROOT + '/api/comments', function publishComment(req, res) {
    const comment = req.body;
    comments.push(comment);
    res.end();
});

app.put(API_ROOT + '/api/comments/:uuid', function updateComment(req, res) {
    const uuid = req.params.uuid;
    comments = comments.map(function updateComment(comment) {
        if (comment.uuid === uuid) {
            comment = req.body;
            comment.uuid = uuid;
        }
        return comment;
    });
    res.end();
});

const server = app.listen(MOCKED_API_PORT, function serverCallback() {
    console.log('Mocked comments API listening at http://localhost:%s', MOCKED_API_PORT);
});
