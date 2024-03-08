import { CASTLES, DICE, UNIT_IMAGES } from "./datasets.js";

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

// logic functions

const setupPlayers = () => {
  const players = [];
  for (let i = 0; i < selected_number_of_players; i++) {
    if (i <= 6) {
      const number = players.length + 1;
      const player = {
        name: playerNames[i] || `Player #${number}`,
        // conquered_castles: [],
      };
      players.push(player);
    } else throw new Error("Max number of players is 6");
  }
  return players;
};

const setupCastlesUnitImages = (castles) => {
  return castles.map((castle) => {
    return {
      ...castle,
      needed_units_to_defeat: castle.needed_units_to_defeat.map((unit) => {
        const unitImg = UNIT_IMAGES.find((unitImg) => {
          return unitImg.type.includes(unit.type);
        });
        if (!unitImg) return;
        unit.img = unitImg.img;
        return unit;
      }),
    };
  });
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

function checkIfCastleCanBeAttacked(roll, castle) {
  if (!castle) return [false, []];
  const neededUnits = castle.needed_units_to_defeat;
  const isConqueredByAnotherPlayer = castle.conquered_by !== null;
  const needsSamuray = castle.require_samuray_to_conquer;
  if (isConqueredByAnotherPlayer && needsSamuray) {
    neededUnits.push({ type: "samuray", quantity: 1 });
  }
  let canBeAttacked = false;
  let remainingRoll = roll;
  let unitsThatCanAttack = [];
  // console.log({ neededUnits });
  neededUnits.forEach((unit) => {
    const index = remainingRoll.findIndex((r) => {
      return r.type === unit.type && r.quantity >= unit.quantity;
    });
    if (index === -1) return;
    unitsThatCanAttack.push(remainingRoll[index]);
    remainingRoll.splice(index, 1);
  });
  if (unitsThatCanAttack.length > 0) {
    canBeAttacked = true;
  }
  return [canBeAttacked, unitsThatCanAttack];
}

// draw functions

// draw castles

function drawCastle(castle, selector) {
  const castleElement = document.createElement("div");
  castleElement.classList = "border border-black p-4 m-4 ";
  castleElement.style.backgroundColor = castle.color;
  castleElement.innerHTML = `
    <div class="aspect-square flex flex-col justify-between">
      <div class="flex justify-between h-full">
        <div class="flex flex-col justify-between">
          <div>
            ${
              castle.require_samuray_to_conquer
                ? `<img src="/assets/units/red-samuray.png" class="ratio-square w-12" />`
                : ""
            }
          </div>
          <div class="flex flex-col">
            <p class="text-xl font-bold">${castle.influence}</p>
            <span class="text-2xl">${castle.name}</span>
            <span class="text-sm">${castle.realm}</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-1 gap-y-3 min-w-[80px] h-fit">
          ${castle.needed_units_to_defeat
            .map((unit) => {
              return unit.type === "swordsman"
                ? `<div class="border p-2 flex gap-1 justify-between items-center col-span-2">
                      <div class="p-2">${unit.quantity}</div>  
                      <img src="/assets/units/${unit.img}" class="ratio-square w-12" />
                    </div>`
                : `<img src="/assets/units/${unit.img}" class="ratio-square w-12" />`;
            })
            .join("")}
        </div>
      </div>
    </div>
    `;

  document.querySelector(selector).appendChild(castleElement);
}

// draw dices

function Game() {
  let turn = 1;
  let isGameOver = true;
  const players = setupPlayers();
  const castles = setupCastlesUnitImages(CASTLES);

  // console.log(castles);

  castles.forEach((castle) => {
    drawCastle(castle, "#board");
  });

  // game loop
  while (true) {
    console.log(`Turn: ${turn}`);
    let remainigDices = 7;
    let selectedCastle = null;

    // roll dices
    while (remainigDices > 0) {
      console.log(`Remaining dices: ${remainigDices}`);
      const roll = rollDices(remainigDices);
      // console.table(roll);
      // show which castles can be attacked

      // test here if you already have a selected castle
      selectedCastle = castles.find((castle) => {
        return castle.name === "Azuchi";
      });

      if (!selectedCastle) {
        castles.forEach((castle, _index) => {
          const [canAttack, unitsThatCanAttack] = checkIfCastleCanBeAttacked(
            roll,
            castle
          );

          // test
          if (canAttack) {
            // setting the last castle that can be attacked as the selected castle for testing purposes
            selectedCastle = castle;
          }

          // HIGHLIGHT CASTLES THAT CAN BE ATTACKED
          // HICHLIGHT THE UNITS THAT we can use to attack the castle, both in the roll and in the castle
          // select which castle to attack with user input (await primise)
        });
      }

      //! TODO: can checkIfCastleCanBeAttacked is not working as expected
      const canAttackSelectedCastle = checkIfCastleCanBeAttacked(
        roll,
        selectedCastle
      );

      // if !canAttackSelectedCastle, the player can't keep trying to conquer the castle and a end of turn is triggered
      if (!canAttackSelectedCastle) {
        console.log("Can't attack the selected castle");
        --remainigDices;
        break;
      }

      console.log("can attack the selected castle", selectedCastle.name);

      // Attack the selectedcastle with the selected units from the roll

      const usedToAttack = [];

      // rest the amount of dices used from the remaining dices

      // at lest -1 but can grow to all the dice used
      remainigDices--;

      // run the loop again
    }

    if (isGameOver) {
      console.log("Game Over");
      break;
    }
  }
}

Game();
