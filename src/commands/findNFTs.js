require("dotenv").config();
const { PublicKey } = require("@solana/web3.js");
const { Metaplex } = require("@metaplex-foundation/js");
const { Connection } = require("@solana/web3.js");

const creatorAddress = "CDd3LcqtBQ7JkGfnypLHdBpAiwFqqHS3xZaEFMKpdY9C";

(async () => {
    const connection = new Connection(process.env.RPC_TWO, "confirmed");
    
    const address = (creatorAddress);
    
    const metaplex = new Metaplex(connection);
    
    const creator = new PublicKey(address);
    
    const task = await metaplex.nfts().findAllByCreator({
        creator,
    });

    console.log(task[0]);
})();
