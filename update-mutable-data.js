/*
  An example for updating the mutable data associated with a token.

  This follows section 6 of PS002 specification:
  https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps002-slp-mutable-data.md#6-update-mutable-data

  This example assumes mutable data have already been uploaded to Filecoin useing
  the upload-json-to-filecoin.js script.
*/

const { SlpMutableData, FilecoinData } = require('slp-mutable-data/index')
const BCHJS = require('@psf/bch-js')

const bchjs = new BCHJS()

// Replace this with your own WIF private key.
const mdaWif = ''

const cid = 'bafybeicncxzoauzp6trowzo6xu27wcert64pmbv64f7xtnlt4tv4goetja'

async function updateMutableData () {
  if(!mdaWif) {
    throw new Error('Please specify a WIF private key')
  }

  try {
    const slpMutableData = new SlpMutableData()
    const filecoinData = new FilecoinData({
      web3Storage: {a: 'b'},
      bchjs
    })

    const cidStr = `ipfs://${cid}`

    const hex = await filecoinData.writeCIDToOpReturn(cidStr, mdaWif)

    // Broadcast transaction to the network
    const txid = await slpMutableData.bchjs.RawTransactions.sendRawTransaction(
      hex
    )

    console.log(`TXID for updated CID: ${txid}`)
    console.log(`https://blockchair.com/bitcoin-cash/transaction/${txid}`)
  } catch (err) {
    console.error(err)
  }
}
updateMutableData()
