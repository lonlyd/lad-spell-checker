import fs from 'fs';
import readline from 'readline';
import path from 'path';
import http from 'http';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Where is your file? (for example /home/documents/text.txt) \n", (answer) => {
    let filepath: string = path.normalize(answer);
    console.log(filepath);
    let file: any = fs.readFile(filepath, "utf8", (err: any, data: any) => {
        if (err) throw err;
        console.log(data)
    });

});

