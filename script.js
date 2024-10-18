var cryptoZombies;
var userAccount;
const showZombieButton = document.querySelector('.showZombieButton');
const createzombieButton = document.querySelector('.createzombieButton');
const levelupButton = document.querySelector('.levelupButton');

function startApp() {

  // ZombieOwnership contract address. Must be updated to match Ganache
  var cryptoZombiesAddress = "0x1AAB936D33b7C29E1E90F25CAFA8bDE18c110271";

  cryptoZombies = new web3.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);

  cryptoZombies.events.Transfer({ filter: { _to: userAccount } })
    .on("data", function (event) {
      let data = event.returnValues;
      getZombiesByOwner(userAccount).then(displayZombies);
    }).on("error", console.error);

    const accountHeader = document.getElementById('accountHeader');
    accountHeader.textContent = `Account: ${userAccount}`;
}

function displayZombies(ids) {
  $("#zombies").empty();
  for (id of ids) {
    getZombieDetails(id)
      .then(function (zombie) {
        $("#zombies").append(`<div class="zombie">
          <ul>
            <li>Name: ${zombie.name}</li>
            <li>DNA: ${zombie.dna}</li>
            <li>Level: ${zombie.level}</li>
            <li>Wins: ${zombie.winCount}</li>
            <li>Losses: ${zombie.lossCount}</li>
            <li>Ready Time: ${zombie.readyTime}</li>
          </ul>
        </div>`);
      });
  }
}

async function createRandomZombie(name) {

  // if the user already has a zombie
  const ids = await getZombiesByOwner(userAccount);
  if (ids.length > 0) {
      $("#txStatus").text("You already have a zombie!");
      return;
  }

  $("#txStatus").text("Creating new zombie on the blockchain. This may take a while...");

  return cryptoZombies.methods.createRandomZombie(name)
    .send({ from: userAccount })
    .on("receipt", function (receipt) {
      $("#txStatus").text("Successfully created " + name + "!");

      getZombiesByOwner(userAccount).then(displayZombies);
    })
    .on("error", function (error) {
      $("#txStatus").text("Transaction cancelled");
    });
}

function feedOnKitty(zombieId, kittyId) {
  $("#txStatus").text("Eating a kitty. This may take a while...");
  return cryptoZombies.methods.feedOnKitty(zombieId, kittyId)
    .send({ from: userAccount })
    .on("receipt", function (receipt) {
      $("#txStatus").text("Ate a kitty and spawned a new Zombie!");
      getZombiesByOwner(userAccount).then(displayZombies);
    })
    .on("error", function (error) {
      $("#txStatus").text(error);
    });
}

function levelUp(zombieId) {
  $("#txStatus").text("Leveling up your zombie...");
  return cryptoZombies.methods.levelUp(zombieId)
    .send({ from: userAccount, value: web3.utils.toWei("0.001", "ether") })
    .on("receipt", function (receipt) {
      $("#txStatus").text("Power overwhelming! Zombie successfully leveled up");
      showZombieButton.click();
    })
    .on("error", function (error) {
      $("#txStatus").text("Transaction cancelled");
    });
}

function getZombieDetails(id) {
  return cryptoZombies.methods.zombies(id).call()
}

function zombieToOwner(id) {
  return cryptoZombies.methods.zombieToOwner(id).call()
}

function getZombiesByOwner(owner) {
  return cryptoZombies.methods.getZombiesByOwner(owner).call()
}

window.addEventListener('load', async () => {
if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
        const accounts = await ethereum.enable();
        userAccount = accounts[0];
        startApp()
    } catch (error) {
    }
}
else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    userAccount = web3.eth.accounts[0];
    startApp()
}
else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

const ids = await getZombiesByOwner(userAccount);
  if (ids.length <= 0) {
    document.getElementById('createZombieButton').style.display = 'block';
    document.getElementById('zombieNameInput').style.display = 'block';
  }
});

ethereum.on('accountsChanged', (accounts) => {
   window.location.reload();
});

ethereum.on('chainChanged', (chainId) => {
   window.location.reload(); 
});  

createzombieButton.addEventListener('click', () => {
  const zombieName = document.getElementById('zombieNameInput').value;

  // check if a name was entered
  if (zombieName.trim() === "") {
      alert("Please enter a zombie name.");
      return;
  }

  createRandomZombie(zombieName);
});

showZombieButton.addEventListener('click', async () => {

    // if there are no zombies
    const ids = await getZombiesByOwner(userAccount);
    if (ids.length <= 0) {
      $("#txStatus").text("You don't have any zombies yet!");
      return;
    }
  
  getZombiesByOwner(userAccount)
        .then(displayZombies);
});

levelupButton.addEventListener('click', async () => {

  // if there are no zombies
  const ids = await getZombiesByOwner(userAccount);
  if (ids.length <= 0) {
    $("#txStatus").text("You don't have any zombies yet!");
    return;
  }

  getZombiesByOwner(userAccount)
        .then(levelUp);
});
