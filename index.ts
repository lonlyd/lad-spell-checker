import fs from 'fs';
import readline from 'readline';
import path from 'path';
import https from 'https';
const HOST = 'https://speller.yandex.net/services/spellservice.json/checkText?text='

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function replaceText(text: any, recievedText: any): any {
    let textToArray: string[] = text.split(' ');
    for (let obj of recievedText) {
        let index: number = textToArray.indexOf(obj.word);
        textToArray[index] = obj.s[0];
    }
    let result: string = textToArray.join(' ');
    return result;
}

(function speller(): any {
    rl.question("Where is your file? (for example, /home/documents/text.txt or C:/file.txt)\n", (answer: any) => {
        let filepath: string = path.normalize(answer);
        fs.access(filepath, (err: any) => {
            if (err) {
                console.error(`ERROR: No such file or directory, open '${filepath}'`);
                speller();
            } else {
                let readStream: any = fs.createReadStream(filepath, 'utf8');
                let writeStream: any = fs.createWriteStream(__dirname + '/result.txt');
                readStream.on('data', (chunk: string) => {
                    let text: string = chunk.toString();
                    https.get(HOST + text, (res: any) => {
                        let recievedText: string;
                        res.on('data', (d: any) => {
                            recievedText = JSON.parse(d);
                            let resultText: string = replaceText(chunk, recievedText);
                            writeStream.write(resultText);
                            console.log('The result file has been saved! Check it!');
                            speller();
                        });
                        res.on('error', (error: any) => {
                            console.error(error);
                        })
                    }).on('error', (e: any) => {
                        console.error(e);
                    })
                });
            }
        });
    });
})()