// SPDX-License-Identifier: MIT
pragma solidity ^0.4.25;

contract IPFSStorage {
    string public ipfsHash;

    function setIPFSHash(string memory _ipfsHash) public {
        ipfsHash = _ipfsHash;
    }
}