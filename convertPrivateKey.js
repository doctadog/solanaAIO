const fs = require("fs");
require("dotenv").config();
const web3 = require("@solana/web3.js");

const Base58 = require("bs58");

const privateKeyString = process.env.PRIVATE_KEY

const decodedString = Base58.decode(privateKeyString);

const privateKey = Uint8Array.from(decodedString);

const keypair = web3.Keypair.fromSecretKey(privateKey);

fs.writeFile("privatekey.txt", privateKey, (err) => {
    if(err) {
        throw err;
    }
});

// console.log(keypair.secretKey);

async function convertPrivateKey() {
    return privateKey;
}
