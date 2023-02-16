/* eslint-disable vars-on-top */
require("dotenv").config();

const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");
const metaplex = require("@metaplex-foundation/js");
const fs = require("fs");

const devnetUrl = "https://api.devnet.solana.com";
const mainnet = "https://mainnet-beta.solana.com";
const testnetUrl = "https://api.testnet.solana.com";

const connection = new web3.Connection(testnetUrl);

const privateKeyFile = require("../Keypair.json");
const tempArraySecret = Object.values(privateKeyFile);
const secret = Uint8Array.from(tempArraySecret);
const senderKeypair = web3.Keypair.fromSecretKey(secret);

const axios = require("axios");
const heliosApiKey = "acad13ab-ae2f-4446-8984-2d88153d1f17";

const creator = "3v6SQ2s8w5TYYzXeS5QLn2AD3sfwQLsg9HM3W2t2QDqE";
const collectionName = "Rooniverse";

// const heliosApiKey = process.env.HELIOS_API_KEY;
const holderArray = [];

async function getMintList(creatorAddress) {
    const url = `https://api.helius.xyz/v1/mintlist?api-key=${heliosApiKey}`;

    const { data } = await axios.post(url, {
        query : {
            // Ghostface GEN1 collection
            firstVerifiedCreators : [ creatorAddress ],
        },
        options : {
            limit : 10000,
        },
    });

    return data.result;
}

async function parseMintList(result) {
    const s = JSON.stringify(result);
    const a = JSON.parse(s);

    for(var entry in a) {
        const d = a[entry].mint;

        holderArray.push(
            d);
    }

    return holderArray;
}

async function printMintList() {
    return 1;
}

(async () => {
    const creatorPublicKey = new web3.PublicKey(creator);

    const mintList = await getMintList(creatorPublicKey);

    const holderArray = await parseMintList(mintList);

    console.log("\n\n\n\n\n HOLDER ARRAY:");

    console.log(holderArray);

    fs.writeFileSync(`${collectionName}mintlist.json`, JSON.stringify(holderArray, null, 2));
})();
