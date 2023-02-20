const fs = require('fs');
const csv = require('csvtojson');

const path = './1_basics/nodejs-hw1-ex1.csv';
const newFile = './fromCsv.txt';

const reader = fs.createReadStream(path);
const writer = fs.createWriteStream(newFile);

const onError = (error) => {
    console.log(error)
};

const onComplete = () => {
    console.log("Success");
};

reader
    .pipe(
        csv({
                delimiter: [";", ","],
                colParser: {
                    "Amount": "omit",
                    "Price": "number",
                },
                checkType: true
            })
    )
    .subscribe((json)=>{
        return new Promise((resolve, reject) => {
            Object.entries(json).forEach(([key, value]) => {
                json[key.toLowerCase()] = value;
                delete json[key];
            })

            resolve(json);
        })
    }, onError, onComplete)
    .on("data", (chunk) => {
        writer.write(chunk)
    })
    .on("end", () => writer.end())
    .on("error", onError);



