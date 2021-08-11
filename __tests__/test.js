"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('../lib/app');
var supertest = require('supertest');
describe("CRUD APP", function () {
    test("create a new post", function (done) {
        supertest(app).post('/users').send({
            "organization": "9ja",
            "products": [
                "developers",
                "pizza"
            ],
            "marketValue": "90%",
            "address": "japan",
            "ceo": "cn",
            "country": "Taiwan",
            "noOfEmployees": 2,
            "employees": [
                "james bond",
                "jackie chan",
            ]
        }).expect(201).then(function (res) {
            expect(res.body && res.body.message).toEqual('posted successfully');
            expect(res.body && res.body.status).toEqual(201);
            done();
        });
    });
    test("Get all posts", function (done) {
        supertest(app).get('/users').expect(200).then(function (res) {
            // console.log(res.body)
            expect(res.body && res.body.message).toEqual('Datas retreived successfully');
            expect(res.body && res.body.status).toEqual(200);
            done();
        });
    });
    test("Get single post", function (done) {
        supertest(app).get('/users/6').expect(200).then(function (res) {
            // console.log(res.body)
            expect(res.body && res.body.message).toEqual('Data retreived successfully');
            expect(res.body && res.body.status).toEqual(200);
            done();
        });
    });
    test("create a new post", function (done) {
        supertest(app).put('/users/1').send({
            "organization": "naija"
        }).expect(200).then(function (res) {
            expect(res.body && res.body.message).toEqual('updated successfully');
            expect(res.body && res.body.status).toEqual(200);
            done();
        });
    });
    test("Delete a single post", function (done) {
        supertest(app).delete('/users/5').expect(200).then(function (res) {
            // console.log(res.body)
            expect(res.body && res.body.message).toEqual('Data deleted successfully');
            expect(res.body && res.body.status).toEqual(200);
            done();
        });
    });
});
