var express = require('express');
var router = express.Router();
const fs = require("fs")
import {Request, Response, NextFunction} from 'express'
import { readSync } from 'fs';
import { Database } from '../Database';

let organization:any;
if(fs.existsSync("/Users/decagon/Desktop/WEEK-6-TASK/week-6-node-008-Sarmueil/lib/users.json")){
 organization = fs.readFileSync("/Users/decagon/Desktop/WEEK-6-TASK/week-6-node-008-Sarmueil/lib/users.json")
 organization =  JSON.parse(organization)
}else {
  organization = []
}

/* GET users listing. */
router.get('/', function (req:Request, res:Response, next:NextFunction) {
  console.log(organization);
  //res.send(organization);
  res.status(200).json({
    status: 200,
    message: 'Datas retreived successfully',
    data: organization
  })
});

//get by id
router.get('/:id', function (req:Request, res:Response, next:NextFunction) {
      console.log(organization);
      var unique = organization.filter(function (key: Database) { return key.id === +(req.params.id); });
      console.log(unique)
       //res.send(unique);
       res.status(200).json({
        status: 200,
        message: 'Data retreived successfully',
        data: unique
      })
})
    //Post 
router.post('/', function(req:Request, res:Response, next:NextFunction){
  const orgObj = organization
  let max = orgObj.length
       let ids = 0
       if(orgObj.length>0){
           ids = max+1
       }else{
           ids =1
       }
 const Body = req.body
  //pasrse the req and deconstruct
  const { organization:company, products,marketValue,address,ceo,country,noOfEmployees,employees } = Body
    const obj ={ 
       organization:company,
       createdAt:new Date().toISOString(),
       updatedAt:new Date().toISOString(),
       products:products,
       marketValue:marketValue,
       address:address,
       ceo:ceo,
       country:country,
       id:ids,
       noOfEmployees:noOfEmployees,
       employees:employees
    }
    //console.log(obj);
   organization.push(obj)
   res.status(201).json({
    status: 201,
    message: 'posted successfully',
    data: obj
  })
   //console.log(final)
    fs.writeFile('/Users/decagon/Desktop/WEEK-6-TASK/week-6-node-008-Sarmueil/lib/users.json', JSON.stringify(organization, null, " "), (err:any)=>{
      if(err){
        throw(err)
      }
    })
   
})       

//Update
router.put('/:id', function(req:Request, res:Response, next:NextFunction){
  const searchObj = organization.find((user:any)=> user.id ===+req.params.id);
   console.log(searchObj)
   if(searchObj){
      const { organization:company, products,marketValue,address,ceo,country,noOfEmployees,employees } = req.body
      let updateObj ={
                organization:company||searchObj.organization,
                createdAt:searchObj.createdAt,
                updatedAt:new Date().toISOString(),
                products:products||searchObj.products,
                marketValue:marketValue||searchObj.marketValue,
                address:address||searchObj.address,
                ceo:ceo||searchObj.ceo,
                country:country||searchObj.country,
                id:searchObj.id,
                noOfEmployees:noOfEmployees||searchObj.noOfEmployees,
                employees:employees||searchObj.noOfEmployees
      }
   const index = organization.indexOf(searchObj)
      organization.splice(index,1,updateObj)
     // console.log(organization)
      //res.send(updateObj)
      res.status(200).json({
        status: 200,
        message: 'updated successfully',
        data: updateObj
      })
    }else {
      res.send("not found")
    }
    fs.writeFile('/Users/decagon/Desktop/WEEK-6-TASK/week-6-node-008-Sarmueil/lib/users.json', JSON.stringify(organization, null, " "), (err:any)=>{
      if(err){
        throw(err)
      }
    })

})

//Delete
router.delete('/:id', function(req:Request, res:Response){
    let deleteItem = organization.find(function(item:Database){
        return item.id === +req.params.id
    })
    //find index of match id in the array
    let index = organization.indexOf(deleteItem)
    //remove from the list
  const final=  organization.splice(index, 1)
  //res.send(final)
  res.status(200).json({
    status: 200,
    message: 'Data deleted successfully',
    data: final
  })
    fs.writeFile('/Users/decagon/Desktop/WEEK-6-TASK/week-6-node-008-Sarmueil/lib/users.json', JSON.stringify(organization, null, " "), (err:any)=>{
      if(err){
        throw(err)
      }
    })
  })

module.exports = router;


