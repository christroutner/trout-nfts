/*
  This script is used to upload a file to Filecoin via the web3.storage package.
  It returns a CID, which can then be pinned by an IPFS node.
*/

const { Web3Storage, getFilesFromPath } = require("web3.storage");

const FILENAME = './copyright/copyright.txt'

async function uploadFile() {
  try {

    // Ensure the web3.storage API token is accessible as an environment variable.
    const web3Token = process.env.FILECOIN_TOKEN
    if(!web3Token) {
      throw new Error('Can not continue. API token for web3.storage required. Export that token to the FILECOIN_TOKEN environment variable.')
    }

    const storage = new Web3Storage({ token: web3Token });
    const files = [];

    // Get a list of files to upload.
    const pathFiles = await getFilesFromPath(FILENAME);
    // console.log("pathFiles: ", pathFiles);
    files.push(...pathFiles);

    // Upload the files to Filecoin.
    console.log(`Uploading ${files.length} files`);
    const cid = await storage.put(files);
    console.log("Content added with CID:", cid);
    console.log(`https://${cid}.ipfs.dweb.link/`)

  } catch(err) {
    console.error('Error: ', err)
  }
}
uploadFile()
