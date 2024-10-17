const { ethers } = require('hardhat');
const { create } = require('ipfs-http-client');

const ipfs = create({ url: 'http://localhost:5001' });

async function uploadFileAndSetHash() {
    const file = {
        path: 'hello.txt',
        content: Buffer.from('Hello, IPFS!'),
    };

    const result = await ipfs.add(file);
    console.log('IPFS Hash:', result.path);

    // Connect to Ganache
    const [deployer] = await ethers.getSigners();
    const IPFSStorage = await ethers.getContractFactory("IPFSStorage");
    const ipfsStorage = await IPFSStorage.attach('<contract_address_here>');

    // Set the IPFS hash in the contract
    const tx = await ipfsStorage.setIPFSHash(result.path);
    await tx.wait();
    console.log("IPFS Hash set in contract:", result.path);
}

uploadFileAndSetHash().catch(console.error);