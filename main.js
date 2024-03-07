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

let isGamePlaying = true;
const playerBaseObject = {
  name: "",
  castlesConquered: [],
  dices: [],
};
let players = [];
let currentPlayer = null;

const playTurn = (player) => {};

while (isGamePlaying) {}
