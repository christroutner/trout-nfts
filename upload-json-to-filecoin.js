/*
  This script is used to upload a JSON data to Filecoin, so that the CID
  can be embedded into token data.
*/

const { Web3Storage, getFilesFromPath, File } = require("web3.storage");

const now = new Date()

// Immutable data
// const JSON_DATA = {
//   creationDate: now.toISOString(),
//   issuer: 'Chris Troutner',
//   license: 'https://bafybeidnkhjfsbihp4gquwqrs6y35jfpcriafymceszwvkundjkwk546pi.ipfs.dweb.link/copyright.txt',
//   name: 'Group Test Token'
// }

// Mutable data
const JSON_DATA = {
  updated: now.toISOString(),
  tokenIcon: 'https://bafybeihe7auwgelv4bfen7jufmdp2rkw5amhvu5tbcha7tsybcs7ahv2t4.ipfs.dweb.link/create-wallet-icon.png',
  tokenInfo: 'https://token.fullstack.cash/?tokenid=175fcd5dd43087394df9cca39055ce368df942aa10bd21459c05a1c89ce69990',
  description: 'This is an NFT representing a video. This is a test token.',
  issuer: 'Chris Troutner',
  forSale: false,
  currentOwner: {
    bchAddr: 'bitcoincash:qqy7jcrm3vmtqs96r878hy2kx90mn84f25ujqw9z5h',
    name: 'Chris Troutner',
    contactEmail: 'chris.troutner@gmail.com'
  },
  content: {
    youtube: 'https://youtu.be/Tpm34Qkp_Tc',
    rumble: 'https://rumble.com/v14mxw2-how-to-create-a-bch-wallet.html',
    odysee: 'https://odysee.com/@trout:5/how-to-create-a-bch-wallet:8',
    lbry: 'lbry://@trout#5/how-to-create-a-bch-wallet#8',
    ipfs: 'bafybeiahf7lbfdtxxf2vpgm4ptsfgs5w6smx4cprqmc2zdc7x6yz5hxg5q',
    filecoin: 'https://bafybeiahf7lbfdtxxf2vpgm4ptsfgs5w6smx4cprqmc2zdc7x6yz5hxg5q.ipfs.dweb.link/create-wallet-2022-02-20_08.05.37.mp4'
  }
}

async function uploadJson() {
  try {

    // Ensure the web3.storage API token is accessible as an environment variable.
    const web3Token = process.env.FILECOIN_TOKEN
    if(!web3Token) {
      throw new Error('Can not continue. API token for web3.storage required. Export that token to the FILECOIN_TOKEN environment variable.')
    }

    const file = makeFileObjects(JSON_DATA)

    const storage = new Web3Storage({ token: web3Token });

    const cid = await storage.put(file);

    console.log("Content added with CID:", cid);
    console.log(`https://${cid}.ipfs.dweb.link/data.json`)

  } catch(err) {
    console.error('Error: ', err)
  }
}
uploadJson()

// Converts an object to a File, which can then be uploaded to Filecoin.
function makeFileObjects (obj) {
  try {
    const buffer = Buffer.from(JSON.stringify(obj))

    const files = [new File([buffer], 'data.json')]
    return files
  } catch (err) {
    console.log('Error in makeFileObjects()')
    throw err
  }
}
