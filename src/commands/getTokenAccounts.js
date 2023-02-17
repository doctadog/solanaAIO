/* eslint-disable max-len */
require("dotenv").config();
const fs = require("fs");
const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");

const MY_TOKEN_MINT_ADDRESS = "HezGWsxSVMqEZy7HJf7TtXzQRLiDruYsheYWqoUVnWQo";
const connection = new web3.Connection(process.env.RPC_TWO, "confirmed");
const holderArray = [];

// Get all holders of a token
async function getHolders(accounts, type) {
    accounts.forEach((account, i) => {
        holderArray.push(account.pubkey.toString());
    });

    if (type === "txt") {
        holderArray.forEach((holder, i) => {
            fs.appendFileSync("holderArray.txt", `${holder}\n`, (err) => {
                if (err) {
                    console.error(err);

                    return;
                }

                console.log("File has been created");
            });
        });
    } else if (type === "json") {
        fs.writeFile("holderArray.json", JSON.stringify(holderArray), (err) => {
            if (err) {
                console.error(err);

                return;
            }

            console.log("File has been created");
        });
    }
}

// Get all token accounts for a token mint
(async () => {
    console.log("Getting token accounts for mint", MY_TOKEN_MINT_ADDRESS);
    const accounts = await connection.getProgramAccounts(
        splToken.TOKEN_PROGRAM_ID,
        {
            dataSlice:
            {
                offset: 0,
                length: 0,
            },
            filters: [
                {
                    dataSize: 165,
                },
                {
                    memcmp: {
                        // Offset 32 : Authority Account information
                        // Offset 0 : All Mint Accounts Information
                        offset: 0,
                        bytes: MY_TOKEN_MINT_ADDRESS,
                    },
                },
            ],
        },
    );

    console.log(
        `Found ${accounts.length} token account(s) for mint ${MY_TOKEN_MINT_ADDRESS}`,
    );
    console.log(accounts);
    await getHolders(accounts, "txt");
})();
