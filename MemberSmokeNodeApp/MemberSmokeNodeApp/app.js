//  lll-lr to using System.SQL;
const sql = require('mssql/msnodesqlv8')
const http = require('http');
const fs = require('fs');
const dbconfig = require('./dbConfigEntries');
const dbqueries = require('./dbqueries');
const parseJson = require('parse-json');
//var datetime = require('node-datetime');
const util = require('util');
const date = require('date-and-time');

// VEGA_ environment
function Get_DB_Counts() {

  // Read D/b connection form Config file 
    var con_config = dbconfig('dev');
   // var curr_date = date.format(new Date(), 'DD-[MM]-YYYY');

     //Change Server Name:
    var conn = con_config;
    console.log('#1. Module server: ' + JSON.stringify(con_config.config.server));
   // console.log('\nMOdule COnn string :' + JSON.stringify(con2str[3].server )+ '\n')
    console.log('#2. Current Server' + conn.config.server);

       
  //  var conn = conn_dev;
    conn.connect().then(function () {
        var queryall = dbqueries.allcounts;
  
        conn.request().query(queryall)
            .then((recordsets) => {
                //object converted to json 
                var objdata = recordsets.recordsets;
                console.log('obj data : '+ objdata[0][0]);
             //   var jsonobj = JSON.parse(recordsets.recordsets);
                //Issue: i am coverting the Object wrongly here 
               var stringObj = JSON.stringify(objdata);
                console.log('stringify obj: ' + stringObj);

                for (var i = 0; i < objdata.length; i++) {
                    var arr = objdata[i];
                    console.log(arr);
                    for (var j = 0; j < arr.length; j++) {
                        var item = arr[j];
                        for (var prop in item) {
                            var final = prop + ": " + item[prop] + '\r\n';
                            let fssz;
                            try {
                                var curr_date = date.format(new Date(), 'DD-MM-YYYY');
                                var filenamer = 'DBsmokeResults' + '_' + curr_date + '.txt';
                                fssz = fs.openSync(filenamer, 'a');
                                fs.appendFileSync(fssz, final);
                        
                            } catch (err) { throw err }
                            finally {    if (fssz !== undefined) fs.closeSync(fssz);  }
                        }
                    }
                }
            //close DB connection
                conn.close();
                //Func - call here to as WORK around for now
                Get_Benefits_Counts();
        })
            .catch( (err) => { console.log(err);   conn.close();  });
    })
     .catch( (err) => {  console.log(err);  });
}

//Get Benefit Counts

function Get_Benefits_Counts() {

    // Read D/b connection form Config file 
    var con_config = dbconfig('dev');
    //Change Server Name:
    var conn = con_config;
    console.log('#1. Module server: ' + JSON.stringify(con_config.config.server));
    // console.log('\nMOdule COnn string :' + JSON.stringify(con2str[3].server )+ '\n');
    console.log('#2. Current Server' + conn.config.server);

    //  var conn = conn_dev;
    conn.connect().then(function () {
        var queryall = dbqueries.allbenefitscounts;
        conn.request().query(queryall)
            .then((recordsets) => {
                var objdata = recordsets.recordsets;
                //var stringObj = JSON.stringify(recordsets.recordsets);
                //var stringObj2 = '\r\n' + stringObj;
                //console.log(stringObj);

                for (var i = 0; i < objdata.length; i++) {
                    var arr = objdata[i];
                    console.log(arr);
                    for (var j = 0; j < arr.length; j++) {
                        var item = arr[j];
                        for (var prop in item) {
                            var final = prop + ": " + item[prop] + '\r\n';
                            let fssz;
                            try {
                                var curr_date = date.format(new Date(), 'DD-MM-YYYY');
                                var filenamer = 'DBsmokeResults' + '_' + curr_date + '.txt';
                                fssz = fs.openSync(filenamer, 'a');
                                fs.appendFileSync(fssz, final);
                            } catch (err) { throw err }
                            finally {  if (fssz !== undefined) fs.closeSync(fssz);  }
                        }
                    }
                }
                //close DB connection
                conn.close();
            }) .catch((err) => { console.log(err);   conn.close();    });
    })  .catch((err) => {  console.log(err);   });
}

/* ------------------------------------------*** MAIN *************---------------------- */

//call Functions
util_print();
Get_DB_Counts();
// Get_Benefits_Counts();



// Util functions
function util_print() {
    var con_config = dbconfig('dev');
   //uat
  var   gettimestamp = new Date().toISOString();
    var formattext = '\r\n------------------------------------------------------\r\n' + 'D/b SERVER Conected: '
                       + con_config.config.server + '\r\n' + '-------------------------------------------------------\r\n';
    var formatLinter = formattext + '-- Smoke Test ran at :' + gettimestamp + '--------\r\n' + '\r\n' ; 
    console.log(formattext);
    let fss;
    try {
        //get timestamp 
        var curr_date = date.format(new Date(), 'DD-MM-YYYY');
        var filenamer = 'DBsmokeResults' + '_' + curr_date + '.txt';
        fss = fs.openSync(filenamer, 'a');
        fs.appendFileSync(fss, formatLinter, );
        } catch (err) {
        throw err;
    }
    finally {  console.log('\r\n ..#. Util func: In Output, Server Name Added. \r\n ');  if (fss !== undefined)   fs.closeSync(fss); }
}





