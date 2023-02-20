const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const revertInput = (input) => {
    return input.split("").reverse().join("");
}

rl.on('line', (input) => {
    console.log(revertInput(input));
});
