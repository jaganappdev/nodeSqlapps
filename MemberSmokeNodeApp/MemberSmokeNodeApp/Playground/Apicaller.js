const http = require('http');
const date = require('date-and-time');



var datetime = require('node-datetime')


//console.log(new Date().toISOString());

//console.log(datetime.now());




var curr_date = date.format(new Date(), 'DD-MM-YYYY');
var filenamer = 'DBsmokeResults' + '_' + curr_date;
//console.log(filenamer);


var teststring = [
    [
        {
            "Active_MediCare_Count": 25338
        }
    ],
    [
        {
            "Active_MediCal_Count": 1242967
        }
    ],
    [
        {
            "Active_DualChoice_Count": 23820
        }
    ]
];
for (var i = 0; i < teststring.length; i++) {
    
    var arr = teststring[i];
    var temp = new Array();
    for (var j = 0; j < arr.length; j++) {
        var item = arr[j];
       
        for (var prop in item) {
         
            var final = prop + ": " + item[prop] + '\r\n';
            console.log(final);
           // var final2 = final2.push(final);
           // final.push(item[prop]);
          
        }

    }
    temp[prop] = temp.push(final);
}

console.log(temp); 
//var replaced = teststring.replaceAll('/[{/gi', ' '); 

//console.log(replaced);


     //for (let i = 0; i < stringObj.length; i++) {
                //    console.log('iteration i =  '+ i + ':'+ stringObj[i]);
                //}
