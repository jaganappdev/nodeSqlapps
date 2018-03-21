//  lll-lr to using System.SQL;
const sql = require('mssql/msnodesqlv8')
const http = require('http');
const fs = require('fs');


//By default, Node -> SQL server auth

const conn_uat = new sql.ConnectionPool({
    database: 'EBM',
    server: 'vegauat',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
});


const conn_test = new sql.ConnectionPool({
    database: 'EBM',
    server: 'vegatest',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
});

const conn_dev = new sql.ConnectionPool({
    database: 'EBM',
    server: 'vegadev',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
});

// VEGA_UAT  environment
function Get_DB_Counts() {
    //Change Server Name:
   // var conn = conn_dev;
    var conn = conn_uat;

    console.log('Current Server' + conn.config.server);
       
  //  var conn = conn_dev;

    conn.connect().then(function () {
        //conn.request().query(' SELECT  COUNT (b.IdentityKey ) as Active_Medicare FROM [Member].[BenefitCoverage]  b  WHERE b.TerminationDate IS NULL and b.GroupNumber =\'H5355\'; SELECT Distinct COUNT (distinct  dd.IdentityKey ) AS Total_Active_MediCal_Members FROM[Member].[BenefitCoverage]  dd WITH(NOLOCK) WHERE TerminationDate IS NULL and (dd.GroupNameKey like(\'%MED\') or dd.GroupNameKey like (\'% MMD\') or dd.GroupNameKey like (\'% CCI\') )  and dd.LineOfBusiness lIKE(\'MCL\') '
        //    , [1, 2])

        conn.request().query(' SELECT  COUNT (b.IdentityKey ) as Active_Medicare FROM [Member].[BenefitCoverage]  b  WHERE b.TerminationDate IS NULL and b.GroupNumber =\'H5355\'')
          
            .then((recordsets) => {

                console.log("Total Active Members: ");

                var stringObj = JSON.stringify(recordsets.recordset);
                console.log(stringObj);
               // var stringObj2 = JSON.stringify(recordsets[1]);
              //  console.log(JSON.stringify(recordsets[0]) + '\n' + JSON.stringify(recordsets[1]) );
        // write to an output file   -> 
            //    fs.appendFileSync('output.txt', + stringObj, function (err) {

            //    if (err) throw err;
            //        console.log('\n File Writing Completed. Look for File in Current Directory.\n');
            //        console.log('after write: ' + stringObj);
            //});

                let fssz;
                try {

                    fssz = fs.openSync('message.txt', 'a');
                    fs.appendFileSync(fssz, stringObj);

                } catch (err) {
                    throw err;
                }
                finally {
                    console.log('\n File Writing Completed. Look for File in Current Directory.\n');
                    console.log('after write: ' + stringObj);
                    if (fssz !== undefined)
                        fs.closeSync(fssz);
                }

            conn.close();
        })
            .catch( (err) => { 
                console.log(err);
                conn.close();
            });
    })
        .catch( (err) => {
            console.log(err);
        });

}

//call Functions
//util_print();
//Get_DB_Counts();


// Util functions
function util_print() {

    //1.Should append Extra lines to the Result files
  //  var conn = conn_dev;
    var conn =  conn_uat
    //2. Able to PRint the Environmental Details
    var formattext = '\r\n------------------------------\r\n' + 'D/b SERVER Conected: ' + conn.config.server + '\r\n' + '-------------------------------\r\n';
    console.log(formattext);
    let fss;
    try {
        fss = fs.openSync('message.txt', 'a');
        fs.appendFileSync(fss, formattext, );
        
        } catch (err) {
        throw err;
    }
    finally {
        console.log('\r\n ..In Output, Server Name Added. \r\n ');
        if (fss !== undefined)
            fs.closeSync(fss);
    }
    //});

}




// #1. Function to get Active Medicare Member Count



//#2. Function to get Active Medical Members


// #3. Function to get members by lOB's 



//--- ----------------- Report -Style -----------

    // Function to Bind the data to a Output.text for .

