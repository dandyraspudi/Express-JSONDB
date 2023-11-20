// account.js
const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');
const dataPath = './jsonDB/useraccount.json'; // path to our JSON file

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
};

const getAccountData = () => {
    const jsonData = fs.readFileSync(process.cwd() + './jsonDB/useraccount.json')
    console.log(jsonData, " <<json data")
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
    console.log(process.cwd(), " <<process cwd")
    const accounts = getAccountData()
    res.send(accounts)
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