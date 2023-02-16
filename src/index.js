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



const functionFolder = fs.readdirSync('./src/functions'); 
for (const folder of functionFolder) { 
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js')
    );
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
};