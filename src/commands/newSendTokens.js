/* eslint-disable max-len */
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
    connectionCluster,
) {
    console.log(`\nToken Address: ${tokenAddress}\nAmount: ${amount}\nRecipient Address: ${recipientAddress}, \nSender Public Key: ${senderKeypair.publicKey}\n\n`);

    const addRecipientToAcct = await splToken.getOrCreateAssociatedTokenAccount(
        connectionCluster,
        senderKeypair,
        TokenAddress,
        recipientAddress,
    );
    const addSenderToAcct = await splToken.getOrCreateAssociatedTokenAccount(
        connectionCluster,
        senderKeypair,
        TokenAddress,
        senderKeypair.publicKey,
    );
    const transferToken = await splToken.transfer(
        connectionCluster,
        senderKeypair,
        addSenderToAcct.address,
        addRecipientToAcct.address,
        senderKeypair.publicKey,
        amt * 100000, // 5 decimals
    );

    console.log("Done Transferring!");

    return transferToken;
}

async function tryTransfer(recipientAddress, address) {
    try {
        await transferToken(
            TokenAddress,
            recipientAddress,
            amount,
            connection,
        );
    } catch (err) {
        console.log("\n\n\nError: ");
        console.log(err);
    }

    address = `(sent) ${address}`;
    fs.writeFileSync(fileName, mintlist.join("\n"));
    console.log(`[${address}] Airdropping ${tokenMintAddress} to ${recipientAddress} has been successful\n\n`);

    return;
}

async function airdrop() {
    // eslint-disable-next-line guard-for-in
    for (const address in mintlist) {
        if (mintlist[address].includes("(sent) ")) {
            console.log(`[${address}] Skipping ${mintlist[address]} as has been processed before`);
            continue;
        }

        const recipientAddress = new web3.PublicKey(mintlist[address]);

        tryTransfer(recipientAddress, mintlist[address]);

        // mintlist[address] = `(sent) ${mintlist[address]}`;
        // fs.writeFileSync(fileName, mintlist.join("\n"));
        // console.log(`[${address}] Airdropping ${tokenMintAddress} to ${recipientAddress} has been successful\n\n`);
    }
}

airdrop();

module.exports = {
    transferToken,
    tryTransfer,
    airdrop,
};
