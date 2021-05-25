import fs from 'fs';
import readline from 'readline';
import path from 'path';
import http from 'http';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Where is your file? (for example, /home/documents/text.txt or C:/file.txt) \n", (answer) => {
    let filepath: string = path.normalize(answer);
    console.log(filepath);
    let file: any = fs.readFile(filepath, 'utf8', (err: any, data: any) => {
        if (err) throw err;
        console.log(data)




    });
    fs.writeFile('result.txt', file, 'utf8', (err) => {
        if (err) throw  err;
        console.log('The result file has been saved! Check it!');
    } )
});

