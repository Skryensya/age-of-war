const CASTLES = [
  {
    color: "green",
    realm: "shimazu",
    name: "Kumamoto",
    influence: 3,
    require_samuray_to_conquer: false,
    needed_units_to_defeat: [
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "samuray", quantity: 2 },
      {
        type: "swordsman",
        quantity: 4,
      },
    ],
  },
  //   ---
  {
    realm: "orange",
    name: "Gassantoda",
    influence: 2,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "samuray", quantity: 1 },
      {
        type: "swordsman",
        quantity: 8,
      },
    ],
  },
  {
    realm: "orange",
    name: "Takahashi",
    influence: 2,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "cavalry", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      {
        type: "swordsman",
        quantity: 5,
      },
      {
        type: "swordsman",
        quantity: 2,
      },
    ],
  },
  //   ---
  {
    realm: "lightgray",
    name: "Edo",
    influence: 3,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "archer", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      {
        type: "swordsman",
        quantity: 3,
      },
    ],
  },
  {
    realm: "lightgray",
    name: "kiyosu",
    influence: 2,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "samuray", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      {
        type: "swordsman",
        quantity: 3,
      },
    ],
  },
  {
    realm: "lightgray",
    name: "Inuyama",
    influence: 1,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "samuray", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "archer", quantity: 1 },
    ],
  },
  // ---
  {
    realm: "darkgray",
    name: "Matsuyama",
    influence: 2,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "samuray", quantity: 1 },
      {
        type: "swordsman",
        quantity: 4,
      },
      {
        type: "swordsman",
        quantity: 4,
      },
    ],
  },
  {
    realm: "darkgray",
    name: "Marugame",
    influence: 1,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "samuray", quantity: 1 },
      { type: "samuray", quantity: 1 },
      { type: "cavalry", quantity: 1 },
    ],
  },
  // ---
  {
    realm: "purple",
    name: "Kasugayama",
    influence: 4,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "archer", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "cavalry", quantity: 1 },
    ],
  },
  {
    realm: "purple",
    name: "Kitanosho",
    influence: 3,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "samuray", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      {
        type: "swordsman",
        quantity: 4,
      },
    ],
  },
  // ---

  {
    realm: "yellow",
    name: "Gifu",
    influence: 1,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "samuray", quantity: 1 },
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
    ],
  },
  {
    realm: "yellow",
    name: "Matsumoto",
    influence: 2,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "archer", quantity: 1 },
      { type: "archer", quantity: 1 },
      {
        type: "swordsman",
        quantity: 7,
      },
    ],
  },
  {
    realm: "yellow",
    name: "Odani",
    influence: 1,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      {
        type: "swordsman",
        quantity: 10,
      },
    ],
  },
  {
    realm: "yellow",
    name: "Azuchi",
    influence: 3,
    require_samuray_to_conquer: true,
    needed_units_to_defeat: [
      { type: "archer", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      { type: "cavalry", quantity: 1 },
      {
        type: "swordsman",
        quantity: 5,
      },
    ],
  },
];

const DICE = [
  { type: "archer", quantity: 1 },
  { type: "cavalry", quantity: 1 },
  { type: "samuray", quantity: 1 },
  { type: "swordsman", quantity: 1 },
  { type: "swordsman", quantity: 2 },
  { type: "swordsman", quantity: 3 },
];

export { CASTLES, DICE };
