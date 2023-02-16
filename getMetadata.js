const {
    Connection,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    Keypair } =
    require("@solana/web3.js");

const { 
    Metaplex, 
    keypairIdentity } =
    require("@metaplex-foundation/js");

const Base58 = require("bs58");

(async () => {
    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
    const metaplex = new Metaplex(connection);
    const privateKeyString = "4s21YmzukEWDSPm6TKkhqTft4UJEY5g14YJLUBGcib81Pw3e1SNm2VPHiTeCaKNCsixL6s4xPpsrc8wcj51x57yF";

    const decodedString = Base58.decode(privateKeyString);

    const privateKey = Uint8Array.from(decodedString);

    const senderKeypair = Keypair.fromSecretKey(privateKey);

    metaplex.use(keypairIdentity(senderKeypair));

    const mint = new PublicKey("EbP7eskfEyn928K23UQVRFBmQCemYbxJxEiUbsbH1dkg");

    const nft = await metaplex.nfts().findByMint({mintAddress : mint});
  
    console.log(nft);
})();
