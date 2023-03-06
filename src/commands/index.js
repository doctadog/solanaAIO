require("dotenv").config();
const fs = require("fs");
const {Connection, PublicKey} = require("@solana/web3.js");
const convertPrivateKey = require("./convertPrivateKey.js");
const findNfts = require("./findNFTs.js");

const connection = new Connection(process.env.RPC_TWO, "confirmed");
const privateKey = process.env.PRIVATE_KEY;

// async function init_commands() {
//     const commandFiles = fs.readdirSync("./src/commands")
//     .filter((file) => file.endsWith(".js"));

//     const commands = new Collection();

//     for (command in commandFiles) {
//         if (commandFiles) {
//             console.log(commandFiles[command]);
//             //use the name of the file as the command name
//             const (commandFiles[command])
//                .split('.js') = require(`./${commandFiles[command]}`);

//         } else (!commandFiles) {
//             console.log("No commands found");
//         }
//     }
// }

(async () => {
    const keypair = await convertPrivateKey.convertString(privateKey);

    console.log(keypair.publicKey);

    findNfts.findNfts();
})();

