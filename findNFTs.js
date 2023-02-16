const { PublicKey } = require("@solana/web3.js");

const { Metaplex } = require("@metaplex-foundation/js");

const { Connection } = require("@solana/web3.js");

const creatorAddress = "CDd3LcqtBQ7JkGfnypLHdBpAiwFqqHS3xZaEFMKpdY9C";

const rpcUrl = "https://special-falling-leaf.solana-mainnet.discover.quiknode.pro/ff8f81b01ecd3383abf30814bc37ef40792838d7/";

const testnet = "https://api.testnet.solana.com";

const rpcTwo = "https://patient-billowing-moon.solana-mainnet.quiknode.pro/826c360201e137f0f078c807e8d8743a07831870/";

const mainnet = "https://api.mainnet-beta.solana.com";

const devnet = "https://api.devnet.solana.com";

const alchemy = "https://solana-mainnet.g.alchemy.com/v2/iQcYGk4Un9DIT-rH9BIRQ4dHx03z4JcB";

(async () => {
    const connection = new Connection(rpcTwo, "confirmed");
    
    const address = (creatorAddress);
    
    const metaplex = new Metaplex(connection);
    
    const creator = new PublicKey(address);
    
    const task = await metaplex.nfts().findAllByCreator({
        creator,
    });

    console.log(task[0]);
})();
