const fs = require('fs');
const fetch = require('node-fetch');
const colors = require('colors');

const urls = [
    'https://www.doughertylaservision.com/wp-content/uploads/2020/08/LASIK-PPT.pdf',
    'https://www.doughertylaservision.com/wp-content/uploads/2020/07/Neuroretinitis-PPT.pdf',
    'https://www.doughertylaservision.com/wp-content/uploads/2020/07/RLE-PPT.pdf',
];

async function download(url) {
    try {
        const fileName = url.slice(url.lastIndexOf('/') + 1);
        const response = await fetch(url);

        if (response.status !== 200) {
            console.log(`${fileName} - Error: ${response.status}`.red);
        } else {
            const dest = fs.createWriteStream(`./downloads/${fileName}`);

            response.body.pipe(dest);
            console.log(`${fileName} - finished downloading!`.green);
        }
    } catch (error) {
        console.log(error);
    }
}

async function start(urls) {
    try {
        for (let url of urls) {
            await download(url);
        }
    } catch (error) {
        console.log(error);
    }
}

start(urls);
