/*
  Create a new SLP NFT token with mutable data controlled by a second address.

  This example requires two WIF private keys. One for creating the token and
  controlling the minting baton. The other is used exclusively for controlling
  the mutable data for that token.

  You can generate private keys at wallet.fullstack.cash, and use that same
  app for interacting with the newly created token.

  This script is adapted to generate NFTs. These are generated by consuming a
  Group token. Read this description if you are unfamiliar with the relationship
  between Group tokens and NFTs:
  https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/bch/applications/slp/nft
*/

// Change this to the Group ID used in your NFT project.
const GROUP_ID = 'c9c425f2c6352697c6665a53e035cbad8a44c4b1e36491a1838dc4655479aa09'

// 1) Key pair for creating and holding the token.
const walletWif = ''

// 2) Key pair for controlling the mutable data.
const mda = 'bitcoincash:qz32m7qagawrmyvv8a7eu3gj83zm5s9qjg7k3s5fmr'

const { SlpMutableData } = require('slp-mutable-data/index')
// const SlpMutableData = require('slp-mutable-data')

async function createToken () {
  const slpMutableData = new SlpMutableData()

  try {
    // Create a 'simple' NFT with a single, undivisiable token and no minting baton.
    const tokenData = {
      name: 'How to Send BCH and Tokens',
      ticker: 'TEST02',
      documentUrl: 'ipfs://bafybeigjujbb55wqr5lns7z7vleg5cfp4yjwqp4swisxpgxl4xsp5tngai'
    }

    const txid = await slpMutableData.create.createToken(
      walletWif,
      tokenData,
      mda, // Mutable data address
      undefined, // Send token to originating address
      'nft', // Create a Group token
      GROUP_ID
    )

    console.log(`New NFT created with token ID: ${txid}`)
    console.log(`https://token.fullstack.cash/?tokenid=${txid}`)
  } catch (err) {
    console.error(err)
  }
}
createToken()
