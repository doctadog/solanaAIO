/* eslint-disable max-len */

// Get all token accounts for a wallet
const fs = require("fs");
const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");

const connection = new web3.Connection("https://api.devnet.solana.com", "confirmed");

const Address = "4cBNGwzTgzGRqPsj3FCKxyH2kbkWwWD54zYvhkaixHdT";
const publicKey = new web3.PublicKey(Address);

(async () => {
    const accounts = await connection.getParsedProgramAccounts(
        splToken.TOKEN_PROGRAM_ID,
        {
            filters: [
                {
                    dataSize: 165,
                },
                {
                    memcmp: {
                        offset: 32,
                        bytes: publicKey,
                    },
                },
            ],
        },
    );

    console.log(
        `Found ${accounts.length} token account(s) for wallet ${publicKey}: \n`,
    );
    accounts.forEach((account, i) => {
        console.log(
            `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`,
        );
        console.log(
            `Mint: ${account.account.data["parsed"]["info"]["mint"]}`,
        );
        console.log(
            `Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`,
        );
        console.log(
            `Token Info: ${JSON.stringify(account.account.data)}\n\n`,
        );

        holderArray.append(account.account.data["parsed"]["info"]["mint"]);
    });
})();
