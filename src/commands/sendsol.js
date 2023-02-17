const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

const keypairFile = require('../Keypair.json');
const tempArraySecret = Object.values(keypairFile);
const privateArray = Uint8Array.from(tempArraySecret);

const keypair = web3.Keypair.fromSecretKey(privateArray);
const connection = new web3.Connection('https://api.devnet.solana.com');

const recipientPublicKey = new web3.PublicKey('8fzQgCBjfrPA1ZtD76WgU96dHUnE8KLaVs1iWbXoGQih');

async function transferSol() {
  const sendSol = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: recipientPublicKey,
        lamports: 1000000,

      }),
  );

  const txHash = await connection.sendTransaction(sendSol, [keypair]);

  return txHash;
}

async function main() {
  //
  //  THIS FUNCTION IS BROKEN
  //
  // const hash = await web3.sendAndConfirmTransaction(connection, transferSol, [ keypair ]);
  //

  txHash = await transferSol();

  console.log(txHash);
}

main();
