require("dotenv").config();
const fs = require("fs");
const web3 = require("@solana/web3.js");
const Base58 = require("bs58");

async function convertString(privateKeyString) {
    const decodedString = Base58.decode(privateKeyString);
    const privateKey = Uint8Array.from(decodedString);
    const keypair = web3.Keypair.fromSecretKey(privateKey);

    return keypair;
}

async function convertArray(privateKeyArray) {
    const tempArraySecret = Object.values(privateKeyArray);
    const privateArray = Uint8Array.from(tempArraySecret);
    const keypair = web3.Keypair.fromSecretKey(privateArray);

    return keypair;
}

async function writeToFile() {
    fs.writeFile("privatekey.txt", privateKey, (err) => {
        if (err) {
            throw err;
        }
    });
}

module.exports = {
    convertString,
    convertArray,
};
