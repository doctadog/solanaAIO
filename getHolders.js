/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
require("dotenv").config();
const { Connection, PublicKey } = require("@solana/web3.js");
const { Metaplex } = require("@metaplex-foundation/js");
const fs = require("fs");


const fileName = "Rooniversemintlist.txt";
const collectionName = "Rooniverse";

const mintlist = fs.readFileSync(fileName).toString()
    .replaceAll("\r", "")
    .split("\n");

(async () => {
    const connection = new Connection(process.env.RPC_TWO, "confirmed");

    // eslint-disable-next-line vars-on-top
    for(var tokenAddress in mintlist) {
        const mintAddress = mintlist[tokenAddress];
        
        const largestAccounts = await connection.getTokenLargestAccounts(
            new PublicKey(mintAddress)
        );
        const largestAccountInfo = await connection.getParsedAccountInfo(
            largestAccounts.value[0].address
        );

        fs.appendFileSync(`${collectionName}_holders.txt`, `${largestAccountInfo.value.data.parsed.info.owner}\n`);

        console.log(largestAccountInfo.value.data.parsed.info.owner);
    }
})();
