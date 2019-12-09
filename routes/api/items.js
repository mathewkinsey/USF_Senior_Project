const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');
const fs = require('fs')
const path = require('path');
const fields = ['ID1', 'ID2', 'grader', 'result', 'date'];
const opts = {fields};
const sql = require('mssql')
const Ticket = require('../../Model/TicketSchema');
const Result = require('../../Model/LikertSchema');
const { poolPromise } = require('../../db')


//gets the tickets from the database for ticket comparison page
router.get('/tickets', async (req, res) =>{ 
	try {
    const pool = await poolPromise
    const result = await pool.request()
        .query('SELECT TOP 2 * FROM tickets ORDER BY NEWID()')      
	const item1 = result.recordset[0]
	const item2 = result.recordset[1]
    const tickets = [
        item1,
        item2
    ];
    res.json(tickets); 
	} catch (err) {
		res.status(500)
		res.send(err.message)
	}
})

//gets values from results database
router.get('/scores', async (req, res) =>{
	try {
    const pool = await poolPromise
    const result = await pool.request()
		.input('input_parameter', req.query.user)
        .query('SELECT * FROM results WHERE grader=@input_parameter ORDER BY date DESC')    
    res.json(result.recordset)
	} catch (err) {
		res.status(500)
		console.log("error: "+err.message)
	}
})

router.get('/exportCSV', async (req, res) =>{
    const startDate = req.query.dateOne+"T00:00:00.0Z";
    const endDate = req.query.dateTwo+"T24:59:59.9Z";;
    let selector = ""
    selector += req.query.select
	var download_directory="../../";//set your output directory here. 
	var str= 'SELECT * FROM results where grader=\''+req.query.user+'\' and date BETWEEN \''+startDate+'\' AND  \''+endDate+'\'';
	try {
		const pool = await poolPromise
		if(selector === "Current"){
			const result = await pool.request()
				.query('SELECT * FROM results WHERE grader=\''+req.query.user+'\' AND date BETWEEN \''+startDate+'\' AND  \''+endDate+'\'')
			var file_name=req.query.user+"_"+req.query.dateOne.replace(/-/g,'_')+"_"+req.query.dateTwo.replace(/-/g,'_')+".csv";
			const parser = new Parser(opts);
			const csv = parser.parse(result.recordset);
			fs.writeFileSync(file_name, csv);
			var p1=path.join(__dirname, download_directory, file_name)
			res.download(p1); 
			var download_location=p1.toString()
			
		}
		if(selector === "All"){
			const result = await pool.request()
				.query('SELECT * FROM results WHERE date BETWEEN \''+startDate+'\' AND  \''+endDate+'\'')
			var file_name="AllGraders_"+req.query.dateOne.replace(/-/g,'_')+"_"+req.query.dateTwo.replace(/-/g,'_')+".csv";
			const parser = new Parser(opts);
			const csv = parser.parse(result.recordset);
			fs.writeFileSync(file_name, csv);
			var p1=path.join(__dirname, download_directory, file_name)
			res.download(p1); 
			var download_location=p1.toString()
			
		}
	} catch (err) {
		res.status(500)
		console.log("ERROR: "+err.message)
		res.send("File Not Downloaded: "+err.message);
	}
	res.send("File downloaded to: "+download_location);
})

//selects previous tickets to rescore when editing
router.get('/previousScores', async (req, res)=>{
	var selected = req.query.selected.replace(/^\s+|\s+$/g, '');
	selected = selected.replace(/\s/g, ',');
		try {
    const pool = await poolPromise
    const result = await pool.request()
        .query('SELECT '+ selected +' FROM tickets WHERE ItemID=\''+req.query.OID1+'\' or ItemID=\''+req.query.OID2+'\'')    
	const ticketOne = result.recordset[0]
	const ticketTwo = result.recordset[1]
	const selectedTickets = [
			ticketOne,
			ticketTwo
			]
	res.json(selectedTickets)
	} catch (err) {
		res.status(500)
		console.log("error: "+err.message)
	}
})

//returns number of comparisons for a grader
router.get('/results/total', async (req, res) =>{
	try {
    const pool = await poolPromise
    const result = await pool.request()
		.input('input_parameter', req.query.user)
        .query('SELECT * FROM results WHERE grader=@input_parameter') 		
    res.json(result.recordsets[0].length)
	} catch (err) {
		res.status(500)
		console.log(err.message)
	}
})

//adds results to results table
router.post('/results', async (req, res) =>{
	var current_date=(new Date()).toISOString()
	try {
	var id=req.body.ID1+'-'+req.body.ID2+current_date
    const pool = await poolPromise
	var value = req.query.user;
	var query = 'INSERT INTO results'+
		' VALUES (\''+id+'\', \''+ req.body.ID1+'\', \''+ req.body.ID2+
		'\', \''+ req.body.user+
		'\', \''+ req.body.result+
		'\', \''+ current_date+
		'\', \''+ req.body.selectedFields+'\')'
    const result = await pool.request()
        .query(query)      
    res.json(result)
	} catch (err) {
		res.status(500)
		console.log(err.message)
	}
})

router.delete('/results/delete/:id', async (req, res)=>{   
	try {
    const pool = await poolPromise
    const result = await pool.request()
		.input('input_parameter', req.params.id)
        .query('DELETE FROM results WHERE _id=@input_parameter') 		
    res.send("ok");
	} catch (err) {
		res.status(500)
		console.log(err.message)
	}
})
module.exports = router;