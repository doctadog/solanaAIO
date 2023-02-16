const {
    Connection, Account, Transaction, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram,
} = require("@solana/web3.js");
const mainnetUrl = "https://mainnet-beta.solana.com";
const testnetUrl = "https://api.testnet.solana.com";
const devnetUrl = "https://api.devnet.solana.com";

const bs58 = require("bs58");

const connection = new Connection(devnetUrl);

const privateKey = Uint8Array.from([
    10,  33, 197, 179, 245, 164, 158,   0, 138,  51,  49,
    32, 227, 219,  15,  26, 176,  15, 239, 252, 229, 196,
    217, 180, 212,   1,  45,  35, 238, 126,  26, 180,   5,
    63,  43, 126, 234, 246,  41,  66, 110, 117, 231,  99,
    153,  91, 116, 224,  12,  52, 149, 201, 100, 122,  79,
    28, 175,  30,  69,  40,  94,  87, 226, 254,
]);

const recieverPublicKey = new PublicKey("8fzQgCBjfrPA1ZtD76WgU96dHUnE8KLaVs1iWbXoGQih");

const senderKeypair = Keypair.fromSecretKey(privateKey);

const senderPrivateKeyEncoded = bs58.encode(privateKey);

const senderKeypair2 = Keypair.fromSecretKey(bs58.decode(senderPrivateKeyEncoded));

async function checkBalance(keypair) {
    const feePayer = Keypair.fromSecretKey(
        bs58.decode(senderPrivateKeyEncoded)
    );

    const balance = await connection.getBalance(feePayer.publicKey);

    console.log(`Balance : ${balance / LAMPORTS_PER_SOL}`);

    if((balance / LAMPORTS_PER_SOL) < 2) {
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
            fromPubkey : senderKeypair2.publicKey,
            toPubkey   : recieverPublicKey,
            lamports   : Number(LAMPORTS_PER_SOL),
        })
    );

    tx.feePayer = senderKeypair.publicKey;

    const txHash = await connection.sendTransaction(tx, [ senderKeypair ]);

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
