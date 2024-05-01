// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/chainlink/AggregatorV2V3Interface.sol";

/**
This Dummy Oracle is compatible with Chainlink's AggregatorV2V3Interface, meaning projects currently using
Chainlink can seamlessly migrate. The updating of the price feed happens in the interval you specified on
the Acurast script.

At the moment no check on the signer/source is being performed, making this implementation INSECURE. However
with a minimal effort you can extend the "setPrice" entrypoint to reflext the kind of logic you are looking for
(i.e. Aggregation Consensus, Check sources, thresholds, etc).
**/

contract DummyChainlinkCompatibleOracle is AggregatorV2V3Interface {
    int256 private latestPrice;
    uint256 private latestPriceTimestamp;
    uint256 private latestRoundId;

    // Assuming price can be set without restriction for simplicity
    // In a real-world scenario, there should be access control mechanisms
    function setPrice(int256 _price) external {
        latestPrice = _price;
        latestPriceTimestamp = block.timestamp;
        latestRoundId++;

        emit AnswerUpdated(latestPrice, latestRoundId, latestPriceTimestamp);
        emit NewRound(latestRoundId, msg.sender, latestPriceTimestamp);
    }

    // AggregatorInterface functions
    function latestAnswer() external view override returns (int256) {
        return latestPrice;
    }

    function latestTimestamp() external view override returns (uint256) {
        return latestPriceTimestamp;
    }

    function latestRound() external view override returns (uint256) {
        return latestRoundId;
    }

    function getAnswer(uint256 _roundId) external view override returns (int256) {
        if(_roundId == latestRoundId) {
            return latestPrice;
        }
        return 0; // Simplification, should handle historical data
    }

    function getTimestamp(uint256 _roundId) external view override returns (uint256) {
        if(_roundId == latestRoundId) {
            return latestPriceTimestamp;
        }
        return 0; // Simplification, should handle historical data
    }

    // AggregatorV3Interface functions
    function decimals() external pure override returns (uint8) {
        return 6; // Assume a common decimal value for simplicity
    }

    function description() external pure override returns (string memory) {
        return "Sample Price Feed";
    }

    function version() external pure override returns (uint256) {
        return 1;
    }

    function getRoundData(uint80 _roundId)
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        require(_roundId == latestRoundId, "Only latest round data available");
        return (uint80(latestRoundId), latestPrice, latestPriceTimestamp, latestPriceTimestamp, uint80(latestRoundId));
    }

    function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (uint80(latestRoundId), latestPrice, latestPriceTimestamp, latestPriceTimestamp, uint80(latestRoundId));
    }
}