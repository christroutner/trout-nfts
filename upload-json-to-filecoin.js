/*
  This script is used to upload a JSON data to Filecoin, so that the CID
  can be embedded into token data.
*/

const { Web3Storage, getFilesFromPath, File } = require("web3.storage");

const now = new Date()

const JSON_DATA = {
  creationDate: now.toISOString(),
  issuer: 'Chris Troutner',
  license: 'https://bafybeidnkhjfsbihp4gquwqrs6y35jfpcriafymceszwvkundjkwk546pi.ipfs.dweb.link/copyright.txt',
  name: 'How to Create a BCH Wallet'
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
