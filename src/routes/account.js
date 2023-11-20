// account.js
const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');
// const dataPath = fs.readFile(process.cwd() + '/jsonDB/useraccount.json', 'utf8');
const dataPath = './jsonDB/useraccount.json'; // path to our JSON file

let data = {
    "1465": {
      "username": "madfinger11",
      "email": "maddy@gmail.com",
      "password": "yddam5342"
    },
    "2646": {
      "username": "yemiakin",
      "email": "emiakiy@gmail.com",
      "password": "iy@g65"
    },
    "3253": {
      "username": "ikechifortune",
      "email": "echifo@gmail.com",
      "password": "ifo#mf23"
    },
    "283326": {
      "username": "dandy123",
      "email": "dandy@gmail.com",
      "password": "dandy123"
    },
    "369047": {
      "username": "dandy",
      "email": "dandy@gmail.com",
      "password": "dandy123"
    }
}

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
};

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    // const file = await fs.readFile('/jsonDB/useraccount.json');
    return JSON.parse(jsonData);
};

accountRoutes.post('/account/addaccount', (req, res) => {
 
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
 
    existAccounts[newAccountId] = req.body
   
    saveAccountData(existAccounts);
    res.send({success: true, msg: 'account added successfully'})
});

// Read - get all accounts from the json file
accountRoutes.get('/account/list', (req, res) => {
    // const accounts = getAccountData()
    // res.send(accounts)
    res.send(data)
});

// Update - using Put method
accountRoutes.put('/account/:id', (req, res) => {
    var existAccounts = getAccountData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const accountId = req.params['id'];
        existAccounts[accountId] = req.body;
        saveAccountData(existAccounts);
        res.send(`accounts with id ${accountId} has been updated`)
    }, true);
});

// delete - using delete method
accountRoutes.delete('/account/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        var existAccounts = getAccountData()
        const userId = req.params['id'];
        delete existAccounts[userId]; 
        saveAccountData(existAccounts);
        res.send(`accounts with id ${userId} has been deleted`)
    }, true);
});

module.exports = accountRoutes