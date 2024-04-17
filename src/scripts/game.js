import { CASTLES, DICE_FACES } from "./datasets/index";
import { removeDuplicates } from "./utils";
import { cardStyle1, cardStyle2 } from "./datasets/cardStyles";

// TODO: make editable variables
let playerNames = ["Allison", "Camila", "Israel", "Dafne", "Pascal", "Jorge"];
let numberOfPlayers = 2;
const MAX_PLAYERS = 6;

export class Game {
  constructor() {
    this.turn = 1;
    this.isGameOver = false;
    this.players = this.setupPlayers();
    this.castles;
    this.setCastles(CASTLES);

    // TODO: randomly select who goes first
    // TODO: this is not random, its decides by a dice Roll
    this.currentPlayer = this.players[0];

    this.selectedUnitsBuffer = {};
    this.currentCard;
  }

  setCastles(newCastles) {
    this.castles = newCastles;

    // TODO: make a callback
    console.log("recreate");
    this.castles.forEach((castle) => {
      this.drawCard(castle, "#board");
    });
  }

  async startGameLoop() {
    while (true) {
      console.log(`Turn: ${this.turn} ------------------------------`);
      let remainigDices = 7;
      let selectedCastle = null;
      let unitsAttacked = [];

      // roll dices
      while (remainigDices > 0) {
        console.log(`Remaining dices: ${remainigDices}`);

        const roll = this.rollDices(remainigDices);

        this.drawDiceRoll(roll, "#dice-roll"); // -> Draw roll

        let unitsUsedToAttack;
        if (!selectedCastle) {
          let selectedUnits;
          [selectedCastle, selectedUnits] = await this.selectCastleAndUnits(
            roll
          );
          unitsUsedToAttack = selectedUnits;
        } else {
          if (
            !this.canAttackCastle(roll, selectedCastle.units, unitsAttacked)
          ) {
            //
            console.log("cannot attack this castle");
            --remainigDices;
            break;
          }
          unitsUsedToAttack = await this.selectUnits(
            selectedCastle,
            selectedCastle.name
          );
        }

        unitsUsedToAttack.forEach((unit) => unitsAttacked.push(unit));

        const isSelectedCastleConquered = this.checkIfConquered(
          selectedCastle.units,
          unitsAttacked
        );

        console.log({ isSelectedCastleConquered });
        if (isSelectedCastleConquered) {
          const copyOfCastles = JSON.parse(JSON.stringify(this.castles));
          const conqueredCastle = copyOfCastles.find(
            (castle) => castle.name === selectedCastle.name
          );
          conqueredCastle.conquered_by = this.currentPlayer.name;

          this.setCastles(copyOfCastles);

          // TODO: change to next player, trigger next turn
          this.selectedCastle = null;
          remainigDices = 7;
          break;
        }

        if (unitsUsedToAttack.length) {
          remainigDices -= unitsUsedToAttack.length;
        } else remainigDices--;

        // run the loop again
      }

      if (this.isGameOver) {
        console.log("Game Over");
        break;
      }

      this.turn++;
    }
  }

  // --- logic functions ---

  checkIfConquered(castleUnits, rolledUnits) {
    // Check if the arrays have the same length
    if (castleUnits.length !== rolledUnits.length) {
      console.log({
        cUnitLenght: castleUnits.length,
        rUnitLenght: olledUnits.length,
      });
      return false;
    }

    const sortedCastleUnits = castleUnits.slice().sort((a, b) => {
      // Compare the entire key strings
      return a.key.localeCompare(b.key);
    });

    const sortedRolledUnits = rolledUnits.slice().sort((a, b) => {
      // Compare the entire key strings
      return a.key.localeCompare(b.key);
    });

    // console.table([
    //   sortedCastleUnits.map((e) => e.key),
    //   sortedRolledUnits.map((e) => e.key),
    // ]);

    // Iterate over each object in the arrays and compare their properties
    for (let i = 0; i < sortedCastleUnits.length; i++) {
      const cUnit = sortedCastleUnits[i];
      const rUnit = sortedRolledUnits[i];

      delete rUnit.element;

      // Check if the objects have the same number of properties
      if (Object.keys(cUnit).length !== Object.keys(rUnit).length) {
        return false;
      }

      // Check if the properties of the objects are equal
      for (const key in cUnit) {
        if (cUnit[key] !== rUnit[key]) {
          return false;
        }
      }
    }

    return true;
  }

  setupPlayers() {
    const players = [];
    for (let i = 1; i < numberOfPlayers; i++) {
      if (i <= MAX_PLAYERS) {
        const number = players.length + 1;
        const player = {
          name: playerNames[i] || `Player #${number}`,
        };
        players.push(player);
      } else throw new Error("Max number of players is 6");
    }
    return players;
  }

  rollDices(quantity) {
    const rd = (dice) => {
      return dice[Math.floor(Math.random() * dice.length)];
    };

    return Array.from({ length: quantity }, () => rd(DICE_FACES));
  }

  canAttackCastle(rolledUnits, castleUnits, castleUnitsAlreadyAttacked = []) {
    const totalSwordsman = rolledUnits.reduce(
      (acc, curr) => (curr.type === "swordsman" ? acc + curr.quantity : acc),
      0
    );

    const castleUnitsFiltered = castleUnits.filter((unit) => {
      const alreadyAttacked = castleUnitsAlreadyAttacked.find(
        (u) => u.type === unit.type && u.quantity === unit.quantity
      );
      return !alreadyAttacked || unit.quantity > alreadyAttacked.quantity;
    });

    const canAttack = castleUnitsFiltered.some((unit) => {
      const rollUnit = rolledUnits.find((u) => u.type === unit.type);
      const rollUnitQuantity =
        unit.type === "swordsman" ? totalSwordsman : rollUnit?.quantity || 0;
      return rollUnitQuantity >= unit.quantity;
    });

    return canAttack;
  }

  getAvailableToAttackCastles(roll) {
    return this.castles
      .map((castle) => {
        const canAttack = this.canAttackCastle(roll, castle.units);
        return { ...castle, canAttack };
      })
      .filter((castle) => castle.canAttack);
  }

  deleteEntriesMatchingRegex(obj, regex) {
    const newObj = {};
    for (const key in obj) {
      if (!key.match(regex)) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }

  ToggleSelectedUnits(castle, unit, index) {
    this.currentCard = castle.name;
    const key = `${castle.name}-${unit.id}-${index}`;
    if (!unit.getAttribute("selectable")) return;

    // delete all units that doesnt have the same castle name prefix
    Object.keys(this.selectedUnitsBuffer)
      .filter((k) => {
        return !k.includes(`${castle.name}-`);
      })
      .forEach((k) => {
        delete this.selectedUnitsBuffer[k];
      });

    const isInBuffer = Boolean(this.selectedUnitsBuffer[key]);
    if (!isInBuffer) {
      // add to buffer
      this.selectedUnitsBuffer[key] = {
        ...castle.units.find((u, index) => {
          return key === `${castle.name}-${u.type}-${index}`;
        }),
        element: unit,
      };

      // show that it has been selected
      // TODO: make a function do it
      unit.classList.remove("ring-red-600", "hover:ring-green-600");
      unit.classList.add("ring-blue-600");
    } else {
      // Remove from buffer
      delete this.selectedUnitsBuffer[key];

      // show that it has been de-selected
      // TODO: make a function do it
      unit.classList.remove("ring-blue-600");
      unit.classList.add("ring-red-600", "hover:ring-green-600");
    }

    // console.table({ ...this.selectedUnitsBuffer });

    // remove highlight from other castle units
    // TODO: make it a function
    CASTLES.filter((c) => {
      return c.name !== castle.name;
    }).forEach((c) => {
      this.unHighlightUnits(c);
    });

    return Object.values(this.selectedUnitsBuffer);
  }

  async selectUnits(castle) {
    const card = document.getElementById(castle.name);
    this.selectedUnitsBuffer = {};

    return await new Promise((resolve) => {
      let selectedUnits;
      let unitsOfCastle = removeDuplicates(
        castle.units.map((unit) => {
          return card.querySelectorAll(`#${unit.type}`);
        })
      );

      unitsOfCastle.forEach((unit, index) => {
        unit.addEventListener("click", () => {
          selectedUnits = this.ToggleSelectedUnits(castle, unit, index);
        });
      });

      document.getElementById("play-turn").addEventListener("click", () => {
        if (this.currentCard === castle.name && selectedUnits)
          resolve(selectedUnits);
      });
    });
  }

  async selectCastleAndUnits(roll) {
    const selectableCastles = this.getAvailableToAttackCastles(roll);

    return new Promise((resolve) => {
      // add a click event listener to each card
      this.currentCard = null;
      selectableCastles.forEach(async (castle) => {
        this.highlightSelectableUnits(roll, castle);

        if (!castle.canAttack) resolve([castle, null]);
        const selectedUnitsToAttack = await this.selectUnits(castle);

        resolve([castle, selectedUnitsToAttack]);
      });
    });
    // });
  }

  // --- draw functions ---

  drawCard(castle, selector) {
    // delete if already exits
    const alreadyExists = document.getElementById(castle.name);
    if (alreadyExists) alreadyExists.remove();

    const cardElement = document.createElement("div");
    cardElement.id = castle.name;
    cardElement.innerHTML = cardStyle2(castle);

    document.querySelector(selector).appendChild(cardElement);
  }

  // draw dices
  drawDiceRoll(roll, selector) {
    // remove  "dice-roll-container";
    const diceRollContainer = document.querySelector("#dice-roll-container");
    if (diceRollContainer) {
      diceRollContainer.remove();
    }

    const diceElement = document.createElement("div");
    diceElement.classList = "flex gap-2";
    // add data-attr rice roll

    diceElement.id = "dice-roll-container";
    roll.forEach((diceRoll) => {
      const rollDiceElement = document.createElement("img");
      rollDiceElement.src = `/assets/units/${diceRoll.img}`;
      rollDiceElement.classList = "w-12 h-12";
      diceElement.appendChild(rollDiceElement);
    });
    document.querySelector(selector).appendChild(diceElement);
  }

  highlightSelectableUnits(roll, castle) {
    const unitsNeeded = castle.units;
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

      if (rollUnit && rollUnitTypeQuantity >= unitQuantity) {
        unit.classList.add("ring-4", "ring-red-600", "hover:ring-green-600");
        unit.setAttribute("selectable", "true");
      }
    });
  }

  unHighlightUnits(castle) {
    const card = document.getElementById(castle.name);
    const units = card.querySelectorAll("div[id]");
    units.forEach((unit) => {
      if (unit.getAttribute("selectable")) {
        unit.classList.remove("ring-blue-600");
        unit.classList.add("ring-4", "ring-red-600", "hover:ring-green-600");
      }
    });
  }
}
