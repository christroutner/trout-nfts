# trout-nfts

This repository is a collection of scripts used to generate and manage video-content NFTs on the Bitcoin Cash (BCH) blockchain.

Here is the workflow I use to create new NFTs of my video content:
- I upload the video to several video platforms.
- I upload the video to Filecoin using [upload-file-to-filecoin.js](./upload-file-to-filecoin.js).
- I pin the CID to a couple IPFS nodes that I maintain using the CID generated in the last step.
- I create the immutable and mutable data for the NFT using [upload-json-to-filecoin.js](./upload-json-to-filecoin.js).
- I mint a new Group token with [mint-group.js](./mint-group.js)
- I mint the NFT with [create-nft.js]('./create-nft.js')
- Update the mutable data using the [update-mutable-data.js](./update-mutable-data.js).
