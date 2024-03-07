import { CASTLES, DICE } from "./datasets";

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

let isGamePlaying = true;
let players = [];
let currentPlayer = null;

while (isGamePlaying) {
  // ask how many players
  const numberOfPlayers = parseInt(prompt("How many players?"));
  for (let i = 0; i < numberOfPlayers; i++) {
    players.push({ name: `Player ${i + 1}`, castles: [] });
  }

  // decide who goes first (randomly)
  currentPlayer = players[Math.floor(Math.random() * players.length)];

  // roll the 7 dices
  const rolledDices = DICE.map((dice) => {
    return { type: dice.type, quantity: Math.floor(Math.random() * 6) + 1 };
  });

  // show which castles can be attacked (based on the dices)
  const castlesCanBeAttacked = CASTLES.filter((castle) => {
    return (
      castle.influence <=
      rolledDices.reduce((acc, dice) => {
        return acc + dice.quantity;
      }, 0)
    );
  });

  // either an unconquered castle or a castle already conquered by different player
  const castlesCanBeAttackedByCurrentPlayer = castlesCanBeAttacked.filter(
    (castle) => {
      return (
        !currentPlayer.castles.includes(castle.name) ||
        (currentPlayer.castles.includes(castle.name) &&
          castle.conqueredBy !== currentPlayer.name)
      );
    }
  );

  // select which military units to use (based on the dices)
  const selectedUnits = [];
  for (let i = 0; i < rolledDices.length; i++) {
    const dice = rolledDices[i];
    const quantity = parseInt(
      prompt(
        `How many ${dice.type} do you want to use? You have ${dice.quantity}`
      )
    );
    if (quantity > dice.quantity) {
      alert("You don't have enough units");
      break;
    }
    selectedUnits.push({ type: dice.type, quantity });
  }

  // Roll the remaining dices
  const remainingDices = rolledDices.map((dice) => {
    return { type: dice.type, quantity: dice.quantity };
  });

  // if from the remainig dices, the player has a samuray, he can conquer a castle
  const samurayDice = remainingDices.find((dice) => dice.type === "samuray");
  if (samurayDice) {
    const castle = prompt(
      `Which castle do you want to conquer? ${castlesCanBeAttackedByCurrentPlayer
        .map((castle) => castle.name)
        .join(", ")}`
    );
    const selectedCastle = prompt(
      `Which castle do you want to attack? ${castlesCanBeAttackedByCurrentPlayer
        .map((castle) => castle.name)
        .join(", ")}`
    );
    const castleToAttack = castlesCanBeAttackedByCurrentPlayer.find(
      (castle) => castle.name === selectedCastle
    );
    if (castleToAttack) {
      const neededUnits = castleToAttack.needed_units_to_defeat;

      // repeat until the castle is conquered or if the player ran out of dices
      let isCastleConquered = false;

      while (!isCastleConquered && remainingDices.length > 0) {
        for (let i = 0; i < neededUnits.length; i++) {
          const neededUnit = neededUnits[i];
          const selectedUnit = selectedUnits.find(
            (unit) => unit.type === neededUnit.type
          );
          if (selectedUnit) {
            if (selectedUnit.quantity >= neededUnit.quantity) {
              selectedUnit.quantity -= neededUnit.quantity;
              if (selectedUnit.quantity === 0) {
                selectedUnits.splice(
                  selectedUnits.findIndex(
                    (unit) => unit.type === selectedUnit.type
                  ),
                  1
                );
              }
              neededUnits.splice(i, 1);
              i--;
            }
          }
        }
        if (neededUnits.length === 0) {
          isCastleConquered = true;
        }
      }
      if (isCastleConquered) {
        castleToAttack.conqueredBy = currentPlayer.name;
        currentPlayer.castles.push(castleToAttack.name);
      }
    }
  }
}
