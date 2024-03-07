import { CASTLES, DICE } from "./datasets.js";

// TODO
// ask how many players
// keep track of them
// decide who goes first (randomly)
// roll the 7 dices
// show which castles can be attacked (based on the dices)
// either an unconquered castle or a castle already conquered by different player
// select which military units to use (based on the dices)
// Roll the remaining dices
// if from the remainig dices, the player has a samuray, he can conquer a castle
// repeat until the castle is conquered or if the player ran out of dices

const addPlayer = (name = null) => {};

// TODO: make editable variables
let playerNames = ["Allison", "Camila", "Israel", "Dafne", "Pascal", "Jorge"];
let selected_number_of_players = 2;

const setupPlayers = () => {
  const players = [];
  for (let i = 0; i < selected_number_of_players; i++) {
    if (i <= 6) {
      const number = players.length + 1;
      const player = {
        name: playerNames[i] || `Player #${number}`,
        conquered_castles: [],
      };
      players.push(player);
    } else throw new Error("Max number of players is 6");
  }
  return players;
};

// roll the dice
function rollDice(dice) {
  // Flatten the dice array based on quantity to simulate individual faces
  let diceFaces = [];
  dice.forEach((die) => {
    for (let i = 0; i < die.quantity; i++) {
      diceFaces.push(die);
    }
  });

  // Randomly select a face to simulate the dice roll
  let rollIndex = Math.floor(Math.random() * diceFaces.length);
  return diceFaces[rollIndex];
}

function rollMultipleDice(quantity) {
  let rolls = [];
  for (let i = 0; i < quantity; i++) {
    rolls.push(rollDice(DICE));
  }
  return rolls;
}

function Game() {
  let turn = 1;
  let isGameOver = true;
  const players = setupPlayers();

  console.log(players);

  // game loop
  while (true) {
    console.log(`Turn: ${turn}`);
    let remainigDices = 7;

    while (remainigDices > 0) {
      console.log(`Remaining dices: ${remainigDices}`);
      console.table(rollMultipleDice(remainigDices));
      remainigDices--;
    }

    if (isGameOver) {
      console.log("Game Over");
      break;
    }
  }
}

Game();
