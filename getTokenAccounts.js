const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");

const connection = new web3.Connection("https://special-falling-leaf.solana-mainnet.discover.quiknode.pro/ff8f81b01ecd3383abf30814bc37ef40792838d7/");
const keypairFile = require("../Keypair.json");
const tempArraySecret = Object.values(keypairFile);
const privateKey = Uint8Array.from(tempArraySecret);

const keypair = web3.Keypair.fromSecretKey(privateKey);

const address = "4cBNGwzTgzGRqPsj3FCKxyH2kbkWwWD54zYvhkaixHdT";
const publicKey = new web3.PublicKey(address);

(async () => {
    const accounts = await connection.getParsedProgramAccounts(
        splToken.TOKEN_PROGRAM_ID,
        {
            filters : [
                {
                    dataSize : 165,
                },
                {
                    memcmp : {
                        offset : 32,
                        bytes  : publicKey,
                    },
                },
            ],
        }
    );

    console.log(
        `Found ${accounts.length} token account(s) for wallet ${publicKey}: \n`
    );
    accounts.forEach((account, i) => {
        console.log(
            `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
        );
        console.log(
            `Mint: ${account.account.data["parsed"]["info"]["mint"]}`
        );
        console.log(
            `Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`
        );
        console.log(
            `Token Info: ${JSON.stringify(account.account.data)}\n\n`
        );
    });
})();

// if ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"] === 0 {
//     console.log("This account is an nft")
// };
