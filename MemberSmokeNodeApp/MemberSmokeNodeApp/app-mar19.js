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


//By default, Node -> SQL server auth


//console.log('At Start Executing query: ' + querytext);

// VEGA_ environment
function Get_DB_Counts() {

    // Read D/b connection form Config file 
    var con_config = dbconfig('uat');
    // var curr_date = date.format(new Date(), 'DD-[MM]-YYYY');

    //Change Server Name:
    var conn = con_config;


    console.log('#1. Module server: ' + JSON.stringify(con_config.config.server));
    // console.log('\nMOdule COnn string :' + JSON.stringify(con2str[3].server )+ '\n');


    console.log('#2. Current Server' + conn.config.server);



    //  var conn = conn_dev;
    conn.connect().then(function () {
        var queryall = dbqueries.allcounts;

        conn.request().query(queryall)
            .then((recordsets) => {


                //object converted to json 
                var objdata = recordsets.recordsets;

                console.log('obj data : ' + objdata[0][0]);

                //   var jsonobj = JSON.parse(recordsets.recordsets);
                //Issue: i am coverting the Object wrongly here 
                var stringObj = JSON.stringify(objdata);

                //   console.log( 'util data ' +  util.format('%j:-', stringObj) ); 


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
                                //fssz = fs.openSync('output.txt', 'a');
                                // fs.appendFileSync(fssz, final);
                            } catch (err) { throw err }
                            finally {
                                if (fssz !== undefined) fs.closeSync(fssz);
                            }
                        }

                    }

                }
                // date: 03-09-2018
                //let fssz;
                //try {
                //    //get today's date 
                //    var curr_date = date.format(new Date(), 'DD-MM-YYYY');

                //    //create a file with timestamp 
                //    var filenamer = 'DBsmokeResults' + '_' + curr_date + '.txt';
                //   // console.log('#1. In All COunts : '+ filenamer);
                //   // fssz = fs.openSync('message.txt', 'a');  //original code

                //    fssz = fs.openSync(filenamer, 'a');
                //    console.log(fssz);
                //    fs.appendFileSync(fssz, stringObj);


                //} catch (err) {
                //    throw err;
                //}
                //finally {
                //    console.log('\n File Writing Completed. Look for File in Current Directory.\n');
                //   // console.log('after write: ' + stringObj);
                //    if (fssz !== undefined)
                //        fs.closeSync(fssz);
                //}


                //close DB connection
                conn.close();
                //Func - call here to as WORK around for now

                Get_Benefits_Counts();

            })
            .catch((err) => {
                console.log(err);
                conn.close();
            });
    })
        .catch((err) => {
            console.log(err);
        });

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
        // conn.request().query(' SELECT  COUNT (b.IdentityKey ) as Active_Medicare FROM [Member].[BenefitCoverage]  b  WHERE b.TerminationDate IS NULL and b.GroupNumber =\'H5355\'')

        // console.log('before Executing query: '+ querytext);

        conn.request().query(queryall)
            .then((recordsets) => {

                // console.log("Multiple statements 1st element  : "+ recordsets.recordset);
                //  console.log('OBject printed: ' + recordsets);
                var objdata = recordsets.recordsets;

                var stringObj = JSON.stringify(recordsets.recordsets);
                var stringObj2 = '\r\n' + stringObj;
                console.log(stringObj);


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
                            finally {
                                if (fssz !== undefined) fs.closeSync(fssz);
                            }
                        }

                    }

                }

                //let fssz ;

                //try {

                //create a file with timestamp 
                //var curr_date = date.format(new Date(), 'DD-MM-YYYY');
                //var filenamer = 'DBsmokeResults' + '_' + curr_date + '.txt';
                //fssz = fs.openSync(filenamer, 'a');
                //console.log('In append func : '+ fssz);
                //fs.appendFileSync(fssz, stringObj2);

                //} catch (err) {
                //    throw err;
                //}
                //finally {
                //    console.log('\n Benefits Counts - File Writing Completed. Look for File in Current Directory.\n');
                //    // console.log('after write: ' + stringObj);
                //    if (fssz !== undefined)
                //        fs.closeSync(fssz);
                //}


                //close DB connection
                conn.close();
            })
            .catch((err) => {
                console.log(err);
                conn.close();
            });
    })
        .catch((err) => {
            console.log(err);
        });

}




//call Functions
util_print();
Get_DB_Counts();
// Get_Benefits_Counts();





// Util functions
function util_print() {
    var con_config = dbconfig('dev');
    //1.Should append Extra lines to the Result files
    //var conn = con_config;
    //  var conn =  conn_uat
    //2. Able to PRint the Environmental Details
    var gettimestamp = new Date().toISOString();

    var formattext = '\r\n------------------------------------------------------\r\n' + 'D/b SERVER Conected: '
        + con_config.config.server + '\r\n' + '-------------------------------------------------------\r\n';
    var formatLinter = formattext + '-- Smoke Test ran at :' + gettimestamp + '--------\r\n' + '\r\n';
    // console.log(formattext);
    let fss;
    try {
        //get timestamp 
        var curr_date = date.format(new Date(), 'DD-MM-YYYY');
        var filenamer = 'DBsmokeResults' + '_' + curr_date + '.txt';
        // console.log('#1. In Util -print  function   : ' + filenamer);
        // fss = fs.openSync('message.txt', 'a');

        fss = fs.openSync(filenamer, 'a');
        fs.appendFileSync(fss, formatLinter, );

    } catch (err) {
        throw err;
    }
    finally {
        console.log('\r\n ..#. Util func: In Output, Server Name Added. \r\n ');
        if (fss !== undefined)
            fs.closeSync(fss);
    }
}





