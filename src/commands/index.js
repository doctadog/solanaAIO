require("dotenv").config();
const {Connection, PublicKey} = require("@solana/web3.js");
const convertPrivateKey = require("./convertPrivateKey.js");
const findNfts = require("./findNFTs.js");

const privateKey = process.env.PRIVATE_KEY;

(async () => {
    const keypair = await convertPrivateKey.convertString(privateKey);

    console.log(keypair.publicKey);

    findNfts.findNfts();
})();

