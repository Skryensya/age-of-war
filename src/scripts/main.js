import { Game } from "./game";

new Game().startGameLoop();
// import { CASTLES, DICE_FACES } from "./datasets/index";
// import { removeDuplicates } from "./utils";

// // TODO: make editable variables
// let playerNames = ["Allison", "Camila", "Israel", "Dafne", "Pascal", "Jorge"];
// let numberOfPlayers = 2;
// const MAX_PLAYERS = 6;

// // --- logic functions ---

// const setupPlayers = () => {
//   const players = [];
//   for (let i = 1; i < numberOfPlayers; i++) {
//     if (i <= MAX_PLAYERS) {
//       const number = players.length + 1;
//       const player = {
//         name: playerNames[i] || `Player #${number}`,
//       };
//       players.push(player);
//     } else throw new Error("Max number of players is 6");
//   }
//   return players;
// };

// function rollDices(quantity) {
//   function _rollDice(dice) {
//     return dice[Math.floor(Math.random() * dice.length)];
//   }

//   return Array.from({ length: quantity }, () => _rollDice(DICE_FACES));
// }

// function canAttackCastle(
//   rolledUnits,
//   castleUnits,
//   castleUnitsAlreadyAttacked = []
// ) {
//   const totalSwordsman = rolledUnits.reduce(
//     (acc, curr) => (curr.type === "swordsman" ? acc + curr.quantity : acc),
//     0
//   );

//   const castleUnitsFiltered = castleUnits.filter((unit) => {
//     const alreadyAttacked = castleUnitsAlreadyAttacked.find(
//       (u) => u.type === unit.type && u.quantity === unit.quantity
//     );
//     return !alreadyAttacked || unit.quantity > alreadyAttacked.quantity;
//   });

//   const canAttack = castleUnitsFiltered.some((unit) => {
//     const rollUnit = rolledUnits.find((u) => u.type === unit.type);
//     const rollUnitQuantity =
//       unit.type === "swordsman" ? totalSwordsman : rollUnit?.quantity || 0;
//     return rollUnitQuantity >= unit.quantity;
//   });

//   return canAttack;
// }

// function getAvailableToAttackCastles(roll, castles) {
//   return castles
//     .map((castle) => {
//       const canAttack = canAttackCastle(roll, castle.units);
//       return { ...castle, canAttack };
//     })
//     .filter((castle) => castle.canAttack);
// }

// async function selectUnits(castle, currentCard) {
//   const card = document.getElementById(castle.name);
//   let selectedUnitsBuffer = {
//     [castle.name]: {},
//   };

//   function ToggleSelectedUnits(castle, unit, index) {
//     currentCard = castle.name;
//     const key = `${unit.id}-${index}`;

//     if (!unit.getAttribute("selectable")) return;
//     if (!selectedUnitsBuffer[castle.name][key]) {
//       selectedUnitsBuffer[castle.name][key] = {
//         ...castle.units.find((u, index) => {
//           return key === `${u.type}-${index}`;
//         }),
//         element: unit,
//       };
//       unit.classList.remove("ring-red-600", "hover:ring-green-600");
//       unit.classList.add("ring-blue-600");
//     } else {
//       delete selectedUnitsBuffer[castle.name][key];
//       console.log(selectedUnitsBuffer);
//       unit.classList.remove("ring-blue-600");
//       unit.classList.add("ring-red-600", "hover:ring-green-600");
//     }

//     const otherCastles = CASTLES.filter((c) => {
//       return c.name !== castle.name;
//     });

//     otherCastles.forEach((c) => {
//       unHighlightUnits(c);
//     });

//     return Object.entries(selectedUnitsBuffer).map((entries) => {
//       return entries[1];
//     });
//   }

//   // card.addEventListener("click", async (e) => {

//   return await new Promise((resolve) => {
//     let selectedUnits;
//     let unitsOfCastle = removeDuplicates(
//       castle.units.map((unit) => {
//         return card.querySelectorAll(`#${unit.type}`);
//       })
//     );

//     unitsOfCastle.forEach((unit, index) => {
//       unit.addEventListener("click", () => {
//         selectedUnits = ToggleSelectedUnits(castle, unit, index);
//       });
//     });

//     document.getElementById("play-turn").addEventListener("click", () => {
//       if (currentCard === castle.name) resolve(selectedUnits);
//     });
//   });
// }

// async function selectCastleAndUnits(roll, castles) {
//   const selectableCastles = getAvailableToAttackCastles(roll, castles);

//   return new Promise((resolve) => {
//     // add a click event listener to each card
//     let currentCard = null;
//     selectableCastles.forEach(async (castle) => {
//       highlightSelectableUnits(roll, castle);

//       const selectedUnitsToAttack = await selectUnits(castle, currentCard);

//       // --- Remove Event listeners ---
//       selectableCastles.forEach((castle) => {
//         const card = document.getElementById(castle.name);
//         card.removeEventListener("click", () => {});
//       });

//       resolve([castle, selectedUnitsToAttack]);
//     });
//   });
//   // });
// }

// // --- draw functions ---

// // draw castles

// function drawCard(castle, selector) {
//   const cardElement = document.createElement("div");
//   cardElement.id = castle.name;
//   cardElement.classList = "border border-black p-2 m-1";
//   cardElement.style.backgroundColor = castle.color;
  // cardElement.innerHTML = `
  //   <div class="aspect-square w-48 relative">
  //     ${
  //       castle.extraSamuray
  //         ? `
  //     <div id="red-samuary" class="absolute top-0 left-0">
  //       <img src="/assets/units/red-samuray.png" class="aspect-square w-8" />
  //     </div>
  //     `
  //         : ""
  //     }
  //     <div class="flex justify-end">
  //       <div class=" w-5/12 grid grid-cols-2 gap-2">
  //         ${castle.units
  //           .map((unit) => {
  //             return unit.type === "swordsman"
  //               ? `
  //           <div id="${unit.type}" class=" border p-1 flex gap-1 justify-between itemas-center col-span-2">
  //             <div class="">${unit.quantity}</div>
  //             <img src="/assets/units/${unit.img}" class="aspect-square w-8" />
  //           </div>
  //         `
  //               : `
  //           <div id="${unit.type}" class="aspect-square w-8 ">
  //             <img src="/assets/units/${unit.img}" />
  //           </div>
  //         `;
  //           })
  //           .join("")}
  //       </div>
  //     </div>
  //     <div class="flex flex-col justify-between">
  //       <div class="flex flex-col">
  //         <p class="text-xl font-bold">${castle.influence}</p>
  //         <span class="text-2xl">${castle.name}</span>
  //         <span class="text-sm">${castle.realm}</span>
  //       </div>
  //     </div>
  //   </div>
  //   `;

//   document.querySelector(selector).appendChild(cardElement);
// }

// // draw dices

// function drawDiceRoll(roll, selector) {
//   // remove  "dice-roll-container";
//   const diceRollContainer = document.querySelector("#dice-roll-container");
//   if (diceRollContainer) {
//     diceRollContainer.remove();
//   }

//   const diceElement = document.createElement("div");
//   diceElement.classList = "flex gap-2";
//   // add data-attr rice roll

//   diceElement.id = "dice-roll-container";
//   roll.forEach((diceRoll) => {
//     const rollDiceElement = document.createElement("img");
//     rollDiceElement.src = `/assets/units/${diceRoll.img}`;
//     rollDiceElement.classList = "w-12 h-12";
//     diceElement.appendChild(rollDiceElement);
//   });
//   document.querySelector(selector).appendChild(diceElement);
// }

// function highlightSelectableUnits(roll, castle) {
//   const unitsNeeded = castle.units;
//   const totalSwordsman = roll.reduce((acc, curr) => {
//     if (curr.type === "swordsman") return acc + curr.quantity;
//     return acc;
//   }, 0);

//   const card = document.getElementById(castle.name);
//   const units = card.querySelectorAll("div[id]");
//   units.forEach((unit) => {
//     const unitType = unit.id;
//     const unitTypeNeeded = unitsNeeded.find((u) => u.type === unitType);
//     if (!unitTypeNeeded) return;
//     const rollUnit = roll.find((u) => u.type === unitType);
//     if (!rollUnit) return;
//     const unitQuantity = unitTypeNeeded.quantity;
//     const rollUnitTypeQuantity =
//       unitType === "swordsman" ? totalSwordsman : rollUnit.quantity;

//     if (rollUnit && rollUnitTypeQuantity >= unitQuantity) {
//       unit.classList.add("ring-4", "ring-red-600", "hover:ring-green-600");
//       unit.setAttribute("selectable", "true");
//     }
//   });
// }

// function unHighlightUnits(castle) {
//   const card = document.getElementById(castle.name);
//   const units = card.querySelectorAll("div[id]");
//   units.forEach((unit) => {
//     if (unit.getAttribute("selectable")) {
//       unit.classList.remove("ring-blue-600");
//       unit.classList.add("ring-4", "ring-red-600", "hover:ring-green-600");
//     }
//   });
// }

// async function Game() {
//   let turn = 1;
//   let isGameOver = true;
//   const players = setupPlayers();
//   const castles = CASTLES;

//   castles.forEach((castle) => {
//     drawCard(castle, "#board");
//   });

//   // TODO: randomly select who goes first
//   // TODO: this is not random, its decides by a dice Roll
//   let currentPlayer = players[0];

//   // game loop
//   while (true) {
//     console.log(`Turn: ${turn}`);
//     let remainigDices = 7;
//     let selectedCastle = null;

//     // roll dices
//     while (remainigDices > 0) {
//       console.log(`Remaining dices: ${remainigDices}`);

//       const roll = rollDices(remainigDices);

//       drawDiceRoll(roll, "#dice-roll"); // -> Draw roll

//       let unitsUsedToAttack = [];

//       if (!selectedCastle) {
//         let selectedUnits;
//         [selectedCastle, selectedUnits] = await selectCastleAndUnits(
//           roll,
//           castles
//         );
//         unitsUsedToAttack = selectedUnits;
//       } else {
//         unitsUsedToAttack = await selectUnits(
//           selectedCastle,
//           selectedCastle.name
//         );
//       }

//       console.log({
//         selectedCastle,
//         unitsUsedToAttack,
//       });

//       // UnhighlightEveytgin

//       // select only the units

//       // if !canAttackSelectedCastle, the player can't keep trying to conquer the castle and a end of turn is triggered
//       if (!canAttackCastle(roll, selectedCastle.units)) {
//         console.log("Can not attack the selected castle");
//         --remainigDices;
//         break;
//       }

//       console.log("can attack the selected castle", selectedCastle.name);

//       // Attack the selectedcastle with the selected units from the roll

//       // rest the amount of dices used from the remaining dices

//       // at lest -1 but can grow to all the dice used
//       remainigDices--;

//       // run the loop again
//     }

//     if (isGameOver) {
//       console.log("Game Over");
//       break;
//     }
//   }
// }

// Game();
