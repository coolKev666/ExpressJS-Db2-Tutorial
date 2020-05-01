
// ------------------------------------------------------------------
// --------------------- Libraries + Variables ----------------------
// ------------------------------------------------------------------
// 1. express - Lightweight node.js framework for web application/APIs
const express = require('express');
var app = express();

// 2. express.Router() - Establish API endpoint for frontend communication based on API_PORT
const router = express.Router();
const API_PORT = 8000;

// 3. cors - Express middleware for handling http requests
var cors = require('cors');
app.use(cors());

// 4. cn_str - connection string to establish communication with target DB
cn_str = "DRIVER={DB2};DATABASE=<db_name>;HOSTNAME=<host_address>;UID=<user_id>;PWD=<password>;PORT=<PORT_NO>;PROTOCOL=TCPIP";

// 5. ibm_db - Db2 driver
var ibmdb = require('ibm_db');


// ------------------------------------------------------------------
// --------------------------- Functions ----------------------------
// ------------------------------------------------------------------
// Example Select Function
router.get('/selectData', (req, res) => {
    
    cn = cn_str

    ibmdb.open(cn, function (err, db) {

        if (err) return console.log(err);
        var sql = `select * from <your_db_name>`;

        db.query(sql, function (err, data) {
            if (err) console.log(err);
            else {
                console.log("data fetch success");
            }
            db.close(function () {
                console.log('done');
            });

            return res.json(data);
        });
    });
    return ("Error - no data fetched");
});


// ------------------------------------------------------------------
// ----------------- Listen for incoming requests -------------------
// ------------------------------------------------------------------

app.use('/api', router);
app.listen(API_PORT, 'localhost', () => console.log(`LISTENING ON PORT ${API_PORT}`));


/*
Note - to test the API function "selectData", 

open browser and run localhost:8000/api/selectData

*/
