const {create} = require("ipfs-http-client");
const fs = require('fs')
const pathToFiles = 'C:\\Users\\Spencer\\Desktop\\tokenURIs.csv'

async function ipfsClient() {
    const ipfs = await create( {
        host:"ipfs.infura.io",
        port:5001,
        protocol:"https"
    });

    return ipfs;
}


async function getData(index) {
    let ipfs = await ipfsClient();
    var hash = 'QmZHKZDavkvNfA9gSAg7HALv8jF7BJaKjUc9U2LSuvUySB/' + index + '.json'
    let asyncitr = ipfs.cat(hash)
    for await(const itr of asyncitr) {
        let data = Buffer.from(itr).toString()
        var jsonObj = JSON.parse(data)
        var info = index + ',' + '"' + jsonObj['name'] + '"' + ',' + '"' + jsonObj['description'] + '"' + ',' + jsonObj.coven.type + ',' + jsonObj.coven.skills.will + ',' + jsonObj.coven.skills.wit + ',' + jsonObj.coven.skills.wiles + ',' + jsonObj.coven.skills.wisdom + ',' + jsonObj.coven.skills.wonder + ',' + jsonObj.coven.skills.woe + ',' + jsonObj.coven.birthChart.sun + ',' + jsonObj.coven.birthChart.moon+ ',' + jsonObj.coven.birthChart.rising + ',' + jsonObj.external_url + ',' + jsonObj['image'] + '\n'
        fs.appendFile(pathToFiles, info, () => {
            console.log("done " + index)
        })
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function getAll() {
    for (let i = 9758; i <= 10000; i++) {
        await getData(i)
        console.log("wait")
        await sleep(400)
    }
}

getAll()