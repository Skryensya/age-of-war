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

function rollDices(quantity) {
  const dice = DICE;
  let rolls = [];
  for (let i = 0; i < quantity; i++) {
    // Flatten the dice array based on quantity to simulate individual faces
    let diceFaces = [];
    dice.forEach((die) => {
      for (let i = 0; i < die.quantity; i++) {
        diceFaces.push(die);
      }
    });

    // Randomly select a face to simulate the dice roll
    let rollIndex = Math.floor(Math.random() * diceFaces.length);

    rolls.push(diceFaces[rollIndex]);
  }
  return rolls;
}

function checkCastlesToAttack(dices) {
  //  go dice by dice, check if the it has a match between the military units needed to conquer the dice face, if so, push to an object with the name of the castle as the key and the value being an array of the military units needed to conquer it
  // const available = [];
  // make it a MAP
  const available = new Map();
  dices.forEach((dice) => {
    CASTLES.forEach((castle) => {
      let units_already_rolled = [];
      if (
        castle.needed_units_to_defeat.some((unit) => {
          const match =
            unit.type === dice.type && unit.quantity <= dice.quantity;
          if (match) units_already_rolled.push(unit);
          return match;
        })
      ) {
        // can beconquered instantly
        const canBeConquered =
          units_already_rolled.length === castle.needed_units_to_defeat.length;
        available.set(castle.name, {
          needed_units_to_defeat: castle.needed_units_to_defeat,
          units_already_rolled: units_already_rolled,
          canBeConquered,
        });
      }
    });
  });
  return available;
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

    // roll dices
    while (remainigDices > 0) {
      console.log(`Remaining dices: ${remainigDices}`);
      const roll = rollDices(remainigDices);
      // console.table(roll);
      // show which castles can be attacked
      const available = checkCastlesToAttack(roll);
      console.log(Array.from(available).map((castle) => castle.canBeConquered));

      remainigDices--;
    }

    if (isGameOver) {
      console.log("Game Over");
      break;
    }
  }
}

Game();
