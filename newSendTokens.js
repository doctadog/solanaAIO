/* eslint-disable vars-on-top */
/* eslint-disable max-statements */
/* eslint-disable no-await-in-loop */
require("dotenv").config();

const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");
const fs = require("fs");
const Base58 = require("bs58");

// testnet

const connection = new web3.Connection(process.env.RPC_TWO, "confirmed");

const updogMintAddress = "41sVEwZqcnhU4Z8H7n7mJDzRBw9L2HoedkGWTcVrKLM3";
const tokenMintAddress = "41sVEwZqcnhU4Z8H7n7mJDzRBw9L2HoedkGWTcVrKLM3";

const TokenAddress = new web3.PublicKey(tokenMintAddress);

const amount = 1;

const privateKeyString = process.env.PRIVATE_KEY;

const decodedString = Base58.decode(privateKeyString);

const privateKey = Uint8Array.from(decodedString);

const senderKeypair = web3.Keypair.fromSecretKey(privateKey);

console.log(senderKeypair.publicKey);

const fileName = "DeGods_holders.txt";

const mintlist = fs.readFileSync(fileName).toString()
    .replaceAll("\r", "")
    .split("\n");

async function transferToken(
    // senderMasterKey,
    tokenAddress,
    recipientAddress,
    amt,
    connectionCluster
) {
    console.log(`\nToken Address: ${tokenAddress}\nAmount: ${amount}\nRecipient Address: ${recipientAddress}, \nSender Public Key: ${senderKeypair.publicKey}\n\n`);

    const addRecipientToAcct = await splToken.getOrCreateAssociatedTokenAccount(
        connectionCluster,
        senderKeypair,
        TokenAddress,
        recipientAddress
    );
    const addSenderToAcct = await splToken.getOrCreateAssociatedTokenAccount(
        connectionCluster,
        senderKeypair,
        TokenAddress,
        senderKeypair.publicKey
    );
    const tranferToken = await splToken.transfer(
        connectionCluster,
        senderKeypair,
        addSenderToAcct.address,
        addRecipientToAcct.address,
        senderKeypair.publicKey,
        amt * 100000 //5 decimals
    );

    console.log("Done Transferring!");
    
    return tranferToken;
}

async function tryTransfer(recipientAddress, address) {
    for(var x in connectionArray) {
        if(x === 6) {
            console.log(`Try Catch Connections Failed for ${recipientAddress}`);
            console.log("Create New file for each failed address");
            address = `(sent) ${address}`;

            fs.writeFileSync(`${fileName}_failed.txt,`, address.join("\n"));
            console.log(`Now Resuming from ${address}`);
            break;
        }

        try {
            await transferToken(
                TokenAddress,
                recipientAddress,
                amount,
                connectionArray[x]
            );
        } catch(err) {
            console.log("\n\n\nError: ");
            console.log(err);
            continue;
        }

        address = `(sent) ${address}`;
        fs.writeFileSync(fileName, mintlist.join("\n"));
        console.log(`[${address}] Airdropping ${tokenMintAddress} to ${recipientAddress} has been successful\n\n`);

        return;
    }
}

(async () => {
    for(var address in mintlist) {
        if(mintlist[address].includes("(sent) ")) {
            console.log(`[${address}] Skipping ${mintlist[address]} as has been processed before`);
            continue;
        }

        const recipientAddress = new web3.PublicKey(mintlist[address]);

        tryTransfer(recipientAddress, mintlist[address]);

        // mintlist[address] = `(sent) ${mintlist[address]}`;
        // fs.writeFileSync(fileName, mintlist.join("\n"));
        // console.log(`[${address}] Airdropping ${tokenMintAddress} to ${recipientAddress} has been successful\n\n`);
    }
})();

// Error 429: Too Many Requests
// SendTransactionError: failed to send transaction: Transaction simulation failed: Blockhash not found
// Error 429: Too Many Requests
// Blockhash not found

// Try Catch Connections
// Create New file for each failed address
