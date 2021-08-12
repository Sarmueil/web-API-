"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var fs = require("fs");
var organization;
try {
    organization = require("../../lib/users.json");
}
catch (err) {
    organization = [];
}
// let organization:any;
// if(fs.existsSync("../../lib/users.json")){
//  organization = fs.readFileSync("../../lib/users.json")
//  organization =  JSON.parse(organization)
// }else {
//   organization = []
// }
/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(organization);
    //res.send(organization);
    res.status(200).json({
        status: 200,
        message: 'Datas retreived successfully',
        data: organization
    });
});
//get by id
router.get('/:id', function (req, res, next) {
    console.log(organization);
    var unique = organization.filter(function (key) { return key.id === +(req.params.id); });
    console.log(unique);
    //res.send(unique);
    res.status(200).json({
        status: 200,
        message: 'Data retreived successfully',
        data: unique
    });
});
//Post 
router.post('/', function (req, res, next) {
    var orgObj = organization;
    var max = orgObj.length;
    var ids = 0;
    if (orgObj.length > 0) {
        ids = max + 1;
    }
    else {
        ids = 1;
    }
    var Body = req.body;
    //pasrse the req and deconstruct
    var company = Body.organization, products = Body.products, marketValue = Body.marketValue, address = Body.address, ceo = Body.ceo, country = Body.country, noOfEmployees = Body.noOfEmployees, employees = Body.employees;
    var obj = {
        organization: company,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: products,
        marketValue: marketValue,
        address: address,
        ceo: ceo,
        country: country,
        id: ids,
        noOfEmployees: noOfEmployees,
        employees: employees
    };
    //console.log(obj);
    organization.push(obj);
    res.status(201).json({
        status: 201,
        message: 'posted successfully',
        data: obj
    });
    //console.log(final)
    fs.writeFile('../../lib/users.json', JSON.stringify(organization, null, " "), function (err) {
        if (err) {
            throw (err);
        }
    });
});
//Update
router.put('/:id', function (req, res, next) {
    var searchObj = organization.find(function (user) { return user.id === +req.params.id; });
    console.log(searchObj);
    if (searchObj) {
        var _a = req.body, company = _a.organization, products = _a.products, marketValue = _a.marketValue, address = _a.address, ceo = _a.ceo, country = _a.country, noOfEmployees = _a.noOfEmployees, employees = _a.employees;
        var updateObj = {
            organization: company || searchObj.organization,
            createdAt: searchObj.createdAt,
            updatedAt: new Date().toISOString(),
            products: products || searchObj.products,
            marketValue: marketValue || searchObj.marketValue,
            address: address || searchObj.address,
            ceo: ceo || searchObj.ceo,
            country: country || searchObj.country,
            id: searchObj.id,
            noOfEmployees: noOfEmployees || searchObj.noOfEmployees,
            employees: employees || searchObj.noOfEmployees
        };
        var index = organization.indexOf(searchObj);
        organization.splice(index, 1, updateObj);
        // console.log(organization)
        //res.send(updateObj)
        res.status(200).json({
            status: 200,
            message: 'updated successfully',
            data: updateObj
        });
    }
    else {
        res.send("not found");
    }
    fs.writeFile('../../lib/users.json', JSON.stringify(organization, null, " "), function (err) {
        if (err) {
            throw (err);
        }
    });
});
//Delete
router.delete('/:id', function (req, res) {
    var deleteItem = organization.find(function (item) {
        return item.id === +req.params.id;
    });
    //find index of match id in the array
    var index = organization.indexOf(deleteItem);
    //remove from the list
    var final = organization.splice(index, 1);
    //res.send(final)
    res.status(200).json({
        status: 200,
        message: 'Data deleted successfully',
        data: final
    });
    fs.writeFile('../../lib/users.json', JSON.stringify(organization, null, " "), function (err) {
        if (err) {
            throw (err);
        }
    });
});
module.exports = router;
