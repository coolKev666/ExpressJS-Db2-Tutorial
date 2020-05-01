# ExpressJS-Db2-Tutorial
This lightweight tutorial demonstrates how to setup express JS API endpoints to communicate with Db2 database.
Additional tutorials on Db2 LUW installation are coming up soon. 


## 1. Prerequisites 
- Install the latest stable version of node via: https://nodejs.org/en/download/
- Install Db2 community edition: https://www.ibm.com/products/db2-database/developers



## 2. Create new node project
```
mkdir Test
cd Test
npm init 
```
Hit enter until you arrive at the last step - type *yes* to confirm.

![Image](https://raw.githubusercontent.com/coolKev666/ExpressJS-Db2-Tutorial/master/Images/Step%201.PNG)


## 3. Create and run .js file
Create a file called `index.js` in the root directory with `package.json`.
```
touch index.js
```
![Image](https://raw.githubusercontent.com/coolKev666/ExpressJS-Db2-Tutorial/master/Images/Step%202.PNG)

Next open your text editor and type `console.log("Hello world")`
Save the file, go to terminal, and run `node index.js` to ensure app is working.

![Image](https://raw.githubusercontent.com/coolKev666/ExpressJS-Db2-Tutorial/master/Images/Step%203.PNG)


## 4. Install dependencies under root directory 
Express - Lightweight node.js framework for web application/APIs. 
CORS - "Cross Origin Resource Sharing" - Express middleware for handling http requests. 
ibm_db - IBM Db2 Driver.
```
npm i express cors ibm_db
```
![Image](https://raw.githubusercontent.com/coolKev666/ExpressJS-Db2-Tutorial/master/Images/Step%204.PNG)


## 5. Copy and paste the following sample code into index.js
``` Javascript

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

```

## 6. Start the app and test the function. 
Run `node index.js` to start. Verify it is listening on specified available port (see image below). 
If port already in use, you may use `netstat -an` to check available ports.

![Image](https://github.com/coolKev666/ExpressJS-Db2-Tutorial/blob/master/Images/Step%205.PNG)

## 7. Testing API function. 
Simplest way to verify endpoint function is working is to enter it as a browser url. 
In this case, open your browser and type `localhost:8000/api/selectData` to call the endpoint function. 
Data should show up in browser window if successful.





