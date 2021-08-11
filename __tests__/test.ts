import express, {Request, Response, NextFunction, response} from 'express'
const app = require('../lib/app')
const supertest = require('supertest');

describe("CRUD APP", () => {
    test("create a new post", (done) => {
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
        }).expect(201).then((res:Request) => {
            expect(res.body && res.body.message).toEqual('posted successfully')
            expect(res.body && res.body.status).toEqual(201)
            done()
        })
    })
    test("Get all posts", (done) => {
        supertest(app).get('/users').expect(200).then((res:Request) => {
            // console.log(res.body)
            expect(res.body && res.body.message).toEqual('Datas retreived successfully')
            expect(res.body && res.body.status).toEqual(200)
            done()
        })
    })
    test("Get single post", (done) => {
        supertest(app).get('/users/6').expect(200).then((res:Request) => {
            // console.log(res.body)
            expect(res.body && res.body.message).toEqual('Data retreived successfully')
            expect(res.body && res.body.status).toEqual(200)
            done()
        })
    })
      test("create a new post", (done) => {
        supertest(app).put('/users/1').send({
                "organization": "naija"
        }).expect(200).then((res:Request) => {
            expect(res.body && res.body.message).toEqual('updated successfully')
            expect(res.body && res.body.status).toEqual(200)
            done()
        })
    })

    test("Delete a single post", (done) => {
        supertest(app).delete('/users/5').expect(200).then((res:Request) => {
            // console.log(res.body)
            expect(res.body && res.body.message).toEqual('Data deleted successfully')
            expect(res.body && res.body.status).toEqual(200)
            done()
        })
    })
})