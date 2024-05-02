/**
 * This Oracle Script observes the BTC USDT Pair and posts the price on-chain.
 * Deploying the script is easy using console.acurast.com and simply copy/pasting
 * this script. Make sure to update `DESTINATION_CONTRACT` and `EVM_RPC_NODE` to 
 * reflect your deployment. For RPC's with API keys like i.e. infura make sure
 * to work with the Acurast confidential environment variables. After having set
 * them for your job, you can access them easily with a `_STD_.env["MY_KEY"]`. They 
 * also come in handy for paid API KEYs, that you don't want to share publicly. 
 */

const DESTINATION_CONTRACT = "INSERT_CONTRACT_ADDRESS";
const EVM_RPC_NODE = "INSERT_APPCHAIN_RPC_URL";

httpGET(
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    {},
    (response, certificate) => {
      	if(certificate === "4795062d13e1ed971c6b6e5699764681e4d090bad39a7ef367cc9cb705652384"){
          //const price = BigInt(JSON.parse(response)["price"] * 10 ** 18); // if you need more precision, just keep in mind that JS stored bigger numbers in float format, rounding up/down your stuff.
          const price = BigInt(JSON.parse(response)["price"] * 10 ** 6); 
          const int256AsBytes = "0x" + price.toString(16).padStart(64, '0');
          const payload = "0x" + _STD_.chains.ethereum.abi.encode(int256AsBytes);
          _STD_.chains.ethereum.fulfill(
              EVM_RPC_NODE,
              DESTINATION_CONTRACT,
              payload,
              {
                  methodSignature: "setPrice(int256)",
                  gasLimit: "9000000",
                  maxFeePerGas: "2550000000",
                  maxPriorityFeePerGas: "2550000000",
              },
              (opHash) => {
                  console.log("Succeeded: " + opHash)
              },
              (err) => {
                  console.log("Failed: " + err)
              },
          )
    	}
    },
    (err) => {
        console.log("Failed: " + err)
    }
);