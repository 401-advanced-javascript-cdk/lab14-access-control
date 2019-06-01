'use strict';

const auth = require('../auth/middleware.js');

const express = require('express');
const router = express.Router();

router.get('/public-stuff', (req, res, next) => {

});

router.get('/hidden-stuff', auth(), (req, res, next) => {

});

router.get('/something-to-read', auth('read'), (req, res, next) => {

});

router.post('/create-a-thing', auth('create'), (req, res, next) => {

});

router.put('/update', auth('update'), (req, res, next) => {

});

router.patch('/jp', auth('update'), (req, res, next) => {

});

router.delete('/bye-bye', auth('delete'), (req, res, next) => {

});

router.get('/everything', auth('super'), (req, res, next) => {

});

module.exports = router;