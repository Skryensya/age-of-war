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

const _buildUnit = (type, quantity) => ({
  type,
  quantity,
  img: UNIT_IMAGES[type],
  code: UNIT_CODE[type],
});

const CASTLES = [
  {
    color: "green",
    realm: "shimazu",
    name: "Kumamoto",
    influence: 3,
    extraSamuray: false,
    units: [
      _buildUnit("archer", 1),
      _buildUnit("cavalry", 1),
      _buildUnit("samuray", 1),
      _buildUnit("samuray", 1),
      _buildUnit("swordsman", 3),
    ],
    conquered_by: null,
  },
  //   ---
  {
    color: "orange",
    realm: "orange",
    name: "Gassantoda",
    influence: 2,
    extraSamuray: true,
    units: [_buildUnit("samuray", 1), _buildUnit("swordsman", 8)],
    conquered_by: null,
  },
  {
    color: "orange",
    realm: "orange",
    name: "Takahashi",
    influence: 2,
    extraSamuray: true,
    units: [
      _buildUnit("cavalry", 1),
      _buildUnit("cavalry", 1),
      _buildUnit("swordsman", 5),
      _buildUnit("swordsman", 2),
    ],
    conquered_by: null,
  },
  //   ---
  {
    color: "lightgray",
    realm: "lightgray",
    name: "Edo",
    influence: 3,
    extraSamuray: true,
    units: [
      _buildUnit("archer", 1),
      _buildUnit("archer", 1),
      _buildUnit("cavalry", 1),
      _buildUnit("cavalry", 1),
      _buildUnit("swordsman", 3),
    ],
    conquered_by: null,
  },
  {
    color: "lightgray",
    realm: "lightgray",
    name: "kiyosu",
    influence: 2,
    extraSamuray: true,
    units: [
      _buildUnit("samuray", 1),
      _buildUnit("archer", 1),
      _buildUnit("cavalry", 1),
      _buildUnit("swordsman", 3),
    ],
    conquered_by: null,
  },
  {
    color: "lightgray",
    realm: "lightgray",
    name: "Inuyama",
    influence: 1,
    extraSamuray: true,
    units: [
      _buildUnit("samuray", 1),
      _buildUnit("archer", 1),
      _buildUnit("archer", 1),
    ],
  },
  // ---
  {
    color: "darkgray",
    realm: "darkgray",
    name: "Matsuyama",
    influence: 2,
    extraSamuray: true,
    units: [
      _buildUnit("samuray", 1),
      _buildUnit("swordsman", 4),
      _buildUnit("swordsman", 4),
    ],
    conquered_by: null,
  },
  {
    color: "darkgray",
    realm: "darkgray",
    name: "Marugame",
    influence: 1,
    extraSamuray: true,
    units: [
      _buildUnit("samuray", 1),
      _buildUnit("samuray", 1),
      _buildUnit("cavalry", 1),
    ],
  },
  // ---
  {
    color: "purple",
    realm: "purple",
    name: "Kasugayama",
    influence: 4,
    extraSamuray: true,
    units: [
      _buildUnit("archer", 1),
      _buildUnit("archer", 1),
      _buildUnit("cavalry", 1),
      _buildUnit("cavalry", 1),
    ],
  },
  {
    color: "purple",
    realm: "purple",
    name: "Kitanosho",
    influence: 3,
    extraSamuray: true,
    units: [
      _buildUnit("samuray", 1),
      _buildUnit("archer", 1),
      _buildUnit("cavalry", 1),
      _buildUnit("swordsman", 4),
    ],
    conquered_by: null,
  },
  // ---

  {
    color: "yellow",
    realm: "yellow",
    name: "Gifu",
    influence: 1,
    extraSamuray: true,
    units: [
      _buildUnit("samuray", 1),
      _buildUnit("archer", 1),
      _buildUnit("cavalry", 1),
    ],
  },
  {
    color: "yellow",
    realm: "yellow",
    name: "Matsumoto",
    influence: 2,
    extraSamuray: true,
    units: [
      _buildUnit("archer", 1),
      _buildUnit("archer", 1),
      _buildUnit("swordsman", 7),
    ],
    conquered_by: null,
  },
  {
    color: "yellow",
    realm: "yellow",
    name: "Odani",
    influence: 1,
    extraSamuray: true,
    units: [_buildUnit("swordsman", 10)],
    conquered_by: null,
  },
  {
    color: "yellow",
    realm: "yellow",
    name: "Azuchi",
    influence: 3,
    extraSamuray: true,
    units: [
      _buildUnit("archer", 1),
      _buildUnit("cavalry", 1),
      _buildUnit("cavalry", 1),
      _buildUnit("swordsman", 5),
    ],
    conquered_by: null,
  },
];

export { CASTLES };
