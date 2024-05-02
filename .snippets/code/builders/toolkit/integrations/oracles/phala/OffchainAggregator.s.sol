// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {OffchainAggregator} from "../src/OffchainAggregator.sol";

contract OffchainAggregatorScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        OffchainAggregator aggregator = new OffchainAggregator(
          8,
          'BTC / USD'
        );
        console2.log(address(aggregator));
        vm.stopBroadcast();
    }
}
