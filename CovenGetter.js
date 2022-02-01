// const node = await IPFS.create()
const covenAddress = "0x5180db8F5c931aaE63c74266b211F580155ecac8"
// import { ethers } from 'ethers';

var count = 1;

async function getTokenURI() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(covenAddress, CigarClub.abi, provider)
      try {
        const data = await contract.tokenURI(count)

      //   fs.writeFile(pathToFiles + "\\metadata\\" + parseInt(first4) + ".json", dictString, function(err, result) {
      //     if(err) console.log('error', err);
      // })
        
        console.log('data for ' + count + ': ', data)
        count++
      } catch (err) {
        console.log("Error: ", err)
      }
    } 
  }


for (let i = 0; i <= 10000; i++) {
    getTokenURI();
}