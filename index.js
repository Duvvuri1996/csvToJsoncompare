const csv=require('csvtojson');
const fs = require('fs')
const csvFile2 = './customer_data_two.csv';
const csvFile1 = '/home/sriram/Sowmya-Project/dave.io/customer_data_one.csv';
var data1, data2;

csv().fromFile(csvFile1).then((jsonObj) => {
       fs.writeFile('one.json', JSON.stringify(jsonObj), function(err, result) {
           if(err) { console.log(err) }
           data1 = require('./one.json')
       })
});

csv().fromFile(csvFile2).then((jsonObj) => {
        fs.writeFile('two.json', JSON.stringify(jsonObj), function(err, result) {
            if(err) { console.log(err) }
            data2 = require('./two.json');
            compareJSON(data1, data2);
        })
})

function compareJSON(d1, d2){
    const result = JSON.parse(JSON.stringify(d1));
    d2.forEach(d => {
        const existingObjIndex = result.findIndex(r => r.first_name === d.first_name && r.mobile_number === d.mobile_number);
        if(existingObjIndex === -1) {
            result.push(d)
        } else {
            result[existingObjIndex] = d;
        }
        
    })
    result.sort((a, b) => a.first_name.localeCompare(b.first_name))
    fs.writeFile('two.json', JSON.stringify(result), function(err, res) {
        if(err) { console.log(err); return {} }
    })    
}
                       

                            