const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");
const rpcURL = "https://special-falling-leaf.solana-mainnet.discover.quiknode.pro/ff8f81b01ecd3383abf30814bc37ef40792838d7/";

// This transaction is sending the tokens
var transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      [],
      1000000, // This is transferring 1 token, not 1000000 tokens
    ),
  );

  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWallet],
    {commitment: 'confirmed'},
  );
  
  console.log("SIGNATURE: ", signature);
  let tokenBalance = await toTokenAccount.amount;
  console.log("token balance: ", tokenBalance);