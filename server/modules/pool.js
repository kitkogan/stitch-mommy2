const pg = require('pg');
const url = require('url');
const Pool = pg.Pool;
let config = {};

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    DATABASE_URL ='postgres://oumzasqedgjmlw:0c1654ce8c8101013269dc0749782eaeab7f9dbe36fc4fd554eaf5a36eea23fb@ec2-35-172-85-250.compute-1.amazonaws.com:5432/d88o4lh5qjdglrpostgres://yqdzgahcjytjqh:71abd9920d9044900214c642e90c1d8bee76eaaa10d3787824073046b7847066@ec2-52-1-95-247.compute-1.amazonaws.com:5432/d7c6cltmh3fsuf'
    let params = url.parse(process.env.DATABASE_URL);
    let auth = params.auth.split(':');

     config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true, // heroku requires ssl to be true
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };

const pool = new Pool({
    database: 'stitch-mommy', // database name (this will change)
    host: 'localhost', // where to find the database
    port: 5432,        // port for finding the database
    max: 10,           // max number of connections for the pool
    idleTimeoutMillis: 30000 // 30 seconds before timeout/cancel query
});

// Listener setup on the pool isn't required, 
// but can be super handy for troubleshooting.
pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (error) => {
    console.log('Error with database pool', error);
});

module.exports = pool;