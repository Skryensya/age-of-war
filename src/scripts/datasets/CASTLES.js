const UNIT_IMAGES = {
  archer: "archer.webp",
  cavalry: "cavalry.webp",
  samuray: "samuray.webp",
  swordsman: "swordsman-1.webp",
};

const UNIT_CODE = {
  archer: "ar",
  cavalry: "ca",
  samuray: "sa",
  swordsman: "sw",
};

const _buildUnit = (type, quantity, key) => ({
  type,
  quantity,
  img: UNIT_IMAGES[type],
  code: UNIT_CODE[type],
  key,
});

const _buildCastle = ({
  name,
  realm,
  influence,
  color,
  extraSamuray,
  unitsArray,
}) => ({
  name,
  color,
  realm,
  influence,
  extraSamuray,
  units: unitsArray.map((u, index) => {
    return _buildUnit(
      u.type,
      u.quantity,
      `${u.quantity}-${u.type}--${name}-${index}`
    );
  }),
  conquered_by: null,
});

const CASTLES = [
  _buildCastle({
    color: "green",
    realm: "shimazu",
    name: "Kumamoto",
    influence: 3,
    extraSamuray: false,
    unitsArray: [
      { type: "archer", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "samuray", quantity: 1 },
      { type: "samuray", quantity: 1 },
      { type: "swordsman", quantity: 3 },
    ],
  }),
  //   ---
  _buildCastle({
    color: "orange",
    realm: "orange",
    name: "Gassantoda",
    influence: 2,
    extraSamuray: true,
    unitsArray: [
      { type: "samuray", quantity: 1 },
      { type: "swordsman", quantity: 8 },
    ],
  }),
  _buildCastle({
    color: "orange",
    realm: "orange",
    name: "Takahashi",
    influence: 2,
    extraSamuray: true,
    unitsArray: [
      { type: "cavalry", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "swordsman", quantity: 5 },
      { type: "swordsman", quantity: 2 },
    ],
  }),
  //   ---
  _buildCastle({
    color: "lightgray",
    realm: "lightgray",
    name: "Edo",
    influence: 3,
    extraSamuray: true,
    unitsArray: [
      { type: "archer", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "swordsman", quantity: 3 },
    ],
  }),
  _buildCastle({
    color: "lightgray",
    realm: "lightgray",
    name: "kiyosu",
    influence: 2,
    extraSamuray: true,
    unitsArray: [
      { type: "samuray", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "swordsman", quantity: 3 },
    ],
  }),
  _buildCastle({
    color: "lightgray",
    realm: "lightgray",
    name: "Inuyama",
    influence: 1,
    extraSamuray: true,
    unitsArray: [
      { type: "samuray", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "archer", quantity: 1 },
    ],
  }),
  // ---
  _buildCastle({
    color: "darkgray",
    realm: "darkgray",
    name: "Matsuyama",
    influence: 2,
    extraSamuray: true,
    unitsArray: [
      { type: "samuray", quantity: 1 },
      { type: "swordsman", quantity: 4 },
      { type: "swordsman", quantity: 4 },
    ],
  }),
  _buildCastle({
    color: "darkgray",
    realm: "darkgray",
    name: "Marugame",
    influence: 1,
    extraSamuray: true,
    unitsArray: [
      { type: "samuray", quantity: 1 },
      { type: "samuray", quantity: 1 },
      { type: "cavalry", quantity: 1 },
    ],
  }),
  // ---
  _buildCastle({
    color: "purple",
    realm: "purple",
    name: "Kasugayama",
    influence: 4,
    extraSamuray: true,
    unitsArray: [
      { type: "archer", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "cavalry", quantity: 1 },
    ],
  }),
  _buildCastle({
    color: "purple",
    realm: "purple",
    name: "Kitanosho",
    influence: 3,
    extraSamuray: true,
    unitsArray: [
      { type: "samuray", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "swordsman", quantity: 4 },
    ],
  }),
  // ---
  _buildCastle({
    color: "yellow",
    realm: "yellow",
    name: "Gifu",
    influence: 1,
    extraSamuray: true,
    unitsArray: [
      { type: "samuray", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
    ],
  }),
  _buildCastle({
    color: "yellow",
    realm: "yellow",
    name: "Matsumoto",
    influence: 2,
    extraSamuray: true,
    unitsArray: [
      { type: "archer", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "swordsman", quantity: 7 },
    ],
  }),
  _buildCastle({
    color: "yellow",
    realm: "yellow",
    name: "Odani",
    influence: 1,
    extraSamuray: true,
    unitsArray: [{ type: "swordsman", quantity: 10 }],
    conquered_by: null,
  }),
  _buildCastle({
    color: "yellow",
    realm: "yellow",
    name: "Azuchi",
    influence: 3,
    extraSamuray: true,
    unitsArray: [
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "swordsman", quantity: 5 },
    ],
  }),
];

export { CASTLES };
