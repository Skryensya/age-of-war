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

// --- logic functions ---

const setupPlayers = () => {
  const players = [];
  for (let i = 0; i < selected_number_of_players; i++) {
    if (i <= 6) {
      const number = players.length + 1;
      const player = {
        name: playerNames[i] || `Player #${number}`,
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

function checkIfCastleCanBeAttacked(
  rolledUnits,
  castleUnits,
  castleUnitsAlreadyAttacked = []
) {
  // calculate the total of swordsman
  const totalSwordsman = rolledUnits.reduce((acc, curr) => {
    if (curr.type === "swordsman") return acc + curr.quantity;
    return acc;
  }, 0);

  // remove the units that have already been attacked
  const castleUnitsFiltered = castleUnits.filter((unit) => {
    const alreadyAttacked = castleUnitsAlreadyAttacked.find(
      (u) => {
        return {
          
        }
      }
    );
    if (alreadyAttacked) {
      return unit.quantity > alreadyAttacked.quantity;
    }
    return true;
  });

  // check if the castle can be attacked
  const canAttack = castleUnits.some((unit) => {
    const rollUnit = rolledUnits.find((u) => u.type === unit.type);
    if (!rollUnit) return false;
    const rollUnitQuantity =
      unit.type === "swordsman" ? totalSwordsman : rollUnit.quantity;
    return rollUnitQuantity >= unit.quantity;
  });

  return canAttack;
}

async function selectCastle(roll, castles) {
  // show which castles can be attacked
  const canAttack = castles
    .map((castle) => {
      const [canAttack] = checkIfCastleCanBeAttacked(roll, castle);
      return { canAttack, castle };
    })
    .filter((castle) => castle.canAttack)
    .map((castle) => castle.castle);

  // highlight the castles that can be attacked
  // console.log({ canAttack });

  canAttack.forEach((castle) => {
    highlightCards(roll, castle);
  });
}

// --- draw functions ---

// draw castles

function drawCard(castle, selector) {
  const cardElement = document.createElement("div");
  cardElement.id = castle.name;
  cardElement.classList = "border border-black p-4 m-4 ";
  cardElement.style.backgroundColor = castle.color;
  cardElement.innerHTML = `
    <div class="aspect-square flex flex-col justify-between">
      <div class="flex justify-between h-full">
        <div class="flex flex-col justify-between">
          <div >
            ${
              castle.require_samuray_to_conquer
                ? `
                <div id="red-samuary">
                  <img src="/assets/units/red-samuray.png" class="ratio-square w-12" />
                </div>
                `
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
                ? `
                    <div id="${unit.type}" class="border p-2 flex gap-1 justify-between items-center col-span-2">
                      <div class="p-2">${unit.quantity}</div>  
                      <img src="/assets/units/${unit.img}" class="ratio-square w-12" />
                    </div>
                  `
                : `
                    <div id="${unit.type}">
                      <img src="/assets/units/${unit.img}" class="ratio-square w-12" />
                    </div>
                  `;
            })
            .join("")}
        </div>
      </div>
    </div>
    `;

  document.querySelector(selector).appendChild(cardElement);
}

// draw dices

function drawDiceRoll(roll, selector) {
  // remove  "dice-roll-container";
  const diceRollContainer = document.querySelector("#dice-roll-container");
  if (diceRollContainer) {
    diceRollContainer.remove();
  }

  const diceElement = document.createElement("div");
  diceElement.classList = "flex gap-2";
  // add data-attr rice roll

  diceElement.id = "dice-roll-container";
  roll.forEach((rollDice) => {
    const rollDiceElement = document.createElement("img");
    rollDiceElement.src = `/assets/units/${rollDice.img}`;
    rollDiceElement.classList = "w-12 h-12";
    diceElement.appendChild(rollDiceElement);
  });
  document.querySelector(selector).appendChild(diceElement);
}

// function compareUnitsInRoll(unitsNeeded, roll, outsideFn) {
//   // Aggregate quantities for unitsNeeded
//   const unitsNeededAggregated = unitsNeeded.reduce((acc, unit) => {
//     acc[unit.type] = (acc[unit.type] || 0) + unit.quantity;
//     return acc;
//   }, {});

//   // Aggregate quantities for roll
//   const rollAggregated = roll.reduce((acc, unit) => {
//     acc[unit.type] = (acc[unit.type] || 0) + unit.quantity;
//     return acc;
//   }, {});

//   console.log({ unitsNeededAggregated, rollAggregated });

//   // Compare and find mismatches
//   Object.keys(rollAggregated).forEach((unitType) => {
//     const neededQuantity = unitsNeededAggregated[unitType] || 0;
//     const rollQuantity = rollAggregated[unitType];
//     if (rollQuantity > neededQuantity) {
//       const mismatchQuantity = rollQuantity - neededQuantity;
//       // Call outsideFn for each mismatch
//       outsideFn(unitType, mismatchQuantity);
//     }
//   });
// }

function highlightCards(roll, castle) {
  const unitsNeeded = castle.needed_units_to_defeat;
  const totalSwordsman = roll.reduce((acc, curr) => {
    if (curr.type === "swordsman") return acc + curr.quantity;
    return acc;
  }, 0);

  const card = document.getElementById(castle.name);
  const units = card.querySelectorAll("div[id]");
  units.forEach((unit) => {
    const unitType = unit.id;
    const unitTypeNeeded = unitsNeeded.find((u) => u.type === unitType);
    if (!unitTypeNeeded) return;
    const rollUnit = roll.find((u) => u.type === unitType);
    if (!rollUnit) return;
    const unitQuantity = unitTypeNeeded.quantity;
    const rollUnitTypeQuantity =
      unitType === "swordsman" ? totalSwordsman : rollUnit.quantity;

    if (unitType === "swordsman")
      console.log({
        castleName: castle.name,
        unitsNeeded,
        totalSwordsman,
      });

    if (rollUnit && rollUnitTypeQuantity >= unitQuantity) {
      unit.classList += " ring-4 ring-red-600 hover:ring-green-600";
    }
  });
}

async function Game() {
  let turn = 1;
  let isGameOver = true;
  const players = setupPlayers();
  const castles = setupCastlesUnitImages(CASTLES);

  // console.log(castles);

  castles.forEach((castle) => {
    drawCard(castle, "#board");
  });

  // TODO: randomly select who goes first
  let currentPlayer = players[0];

  // game loop
  while (true) {
    console.log(`Turn: ${turn}`);
    let remainigDices = 7;
    let selectedCastle = null;

    // roll dices
    while (remainigDices > 0) {
      console.log(`Remaining dices: ${remainigDices}`);
      const roll = rollDices(remainigDices);

      drawDiceRoll(roll, "#dice-roll");

      // console.table(roll);
      // show which castles can be attacked

      // selectedCastle = castles.find((castle) => {
      //   return castle.name === "Azuchi";
      // });

      // test here if you already have a selected castle
      if (!selectedCastle) {
        selectedCastle = await selectCastle(roll, castles);
      }

      break;
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
