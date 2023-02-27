require("dotenv").config();
const {Metaplex, keypairIdentity} = require("@metaplex-foundation/js");
const {Connection, Keypair, PublicKey} = require("@solana/web3.js");
const connection = new Connection(process.env.RPC_TWO);
const metaplex = new Metaplex(connection);

async function getWalletNfts(PRIVATE_KEY) {
    const keypair = await convertPrivateKey
        .convertString(PRIVATE_KEY);

    console.log(keypair.publicKey);

    metaplex.use(keypairIdentity(keypair));

    const owner = new PublicKey(keypair.publicKey);
    const allNFTs = await metaplex.nfts().findAllByOwner(owner);

    console.log(allNFTs);
}

module.exports = {
    getWalletNfts,

};

getWalletNfts();

