/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */

const { Connection, PublicKey } = require("@solana/web3.js");

const { Metaplex } = require("@metaplex-foundation/js");

const fs = require("fs");

const rpcUrl = "https://special-falling-leaf.solana-mainnet.discover.quiknode.pro/ff8f81b01ecd3383abf30814bc37ef40792838d7/";

const testnet = "https://api.testnet.solana.com";

const rpcTwo = "https://patient-billowing-moon.solana-mainnet.quiknode.pro/826c360201e137f0f078c807e8d8743a07831870/";

const mainnet = "https://api.mainnet-beta.solana.com";

const devnet = "https://api.devnet.solana.com";

const alchemy = "https://solana-mainnet.g.alchemy.com/v2/iQcYGk4Un9DIT-rH9BIRQ4dHx03z4JcB";

const fileName = "Rooniversemintlist.txt";
const collectionName = "Rooniverse";

const mintlist = fs.readFileSync(fileName).toString()
    .replaceAll("\r", "")
    .split("\n");

(async () => {
    const connection = new Connection(rpcTwo, "confirmed");

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
