require("dotenv").config();
const bs58 = require("bs58");

const {
    Connection,
    Transaction,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
} = require("@solana/web3.js");

const connection = new Connection(process.env.DEVNET);

const privateKeyString = process.env.PRIVATE_KEY;
const decodedString = bs58.decode(privateKeyString);
const privateKey = Uint8Array.from(decodedString);
const senderKeypair = Keypair.fromSecretKey(privateKey);

const recieverPublicKey = new PublicKey(
    "8fzQgCBjfrPA1ZtD76WgU96dHUnE8KLaVs1iWbXoGQih",
);

console.log(senderKeypair.publicKey);

const senderPrivateKeyEncoded = bs58.encode(privateKey);

const senderKeypair2 = Keypair.fromSecretKey(
    bs58.decode(senderPrivateKeyEncoded,
    ));

async function checkBalance(keypair) {
    const feePayer = Keypair.fromSecretKey(
        bs58.decode(senderPrivateKeyEncoded),
    );

    const balance = await connection.getBalance(feePayer.publicKey);

    console.log(`Balance : ${balance / LAMPORTS_PER_SOL}`);

    if ((balance / LAMPORTS_PER_SOL) < 2) {
        await airdrop();
    }

    return balance;
}

async function airdrop() {
    const hash = await connection.requestAirdrop(senderKeypair.publicKey, 1e9);

    console.log(`Airdrop txHash : ${hash}\n`);

    return;
}

async function sendSol() {
    const tx = new Transaction().add(

        SystemProgram.transfer({
            fromPubkey: senderKeypair2.publicKey,
            toPubkey: recieverPublicKey,
            lamports: Number(LAMPORTS_PER_SOL),
        }),
    );

    tx.feePayer = senderKeypair.publicKey;

    const txHash = await connection.sendTransaction(tx, [senderKeypair]);

    return txHash;
}

async function main() {
    const balance = await checkBalance(senderKeypair);

    const sent = await sendSol();

    console.log({
        balance,
        sent,
    });
}

main();
