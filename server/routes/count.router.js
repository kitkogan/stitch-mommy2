
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup a GET route to get all the songs from the database
router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    const sqlText = `SELECT * FROM newstitch ORDER BY id DESC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})

router.post('/', (req, res) => {
    const newCount = req.body;
    const sqlText = `INSERT INTO newstitch (type, startcount) VALUES ($1, $2)`;

    pool.query(sqlText, [newCount.type, newCount.startcount])
        .then((result) => {
            console.log('Added new count to the database', newCount);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
    })

router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = `DELETE FROM "newstitch" WHERE "id"=$1;`;
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Count deleted');
            res.sendStatus(200);
    })
    .catch((error ) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
})    


module.exports = router;