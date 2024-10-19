// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./zombiefeeding.sol"; // Make sure to import the appropriate file

contract KittyContract is KittyInterface {
    // Sample storage for kitties
    struct Kitty {
        bool isGestating;
        bool isReady;
        uint256 cooldownIndex;
        uint256 nextActionAt;
        uint256 siringWithId;
        uint256 birthTime;
        uint256 matronId;
        uint256 sireId;
        uint256 generation;
        uint256 genes;
    }

    // Mapping to store kitties by their ID
    mapping(uint256 => Kitty) public kitties;

    // Constructor to create some default kitties
    constructor() {
        // Creating default kitties for demonstration
        kitties[1] = Kitty(false, true, 0, 0, 0, block.timestamp, 0, 0, 1, 123456789);
        kitties[2] = Kitty(false, true, 0, 0, 0, block.timestamp, 0, 0, 1, 987654321);
    }

    // Implementing the getKitty function
    function getKitty(uint256 _id) external view override returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
    ) {
        Kitty memory kitty = kitties[_id];
        return (
            kitty.isGestating,
            kitty.isReady,
            kitty.cooldownIndex,
            kitty.nextActionAt,
            kitty.siringWithId,
            kitty.birthTime,
            kitty.matronId,
            kitty.sireId,
            kitty.generation,
            kitty.genes
        );
    }
}
