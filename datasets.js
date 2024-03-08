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
      { type: "samuray", quantity: 1 },
      { type: "samuray", quantity: 1 },
      {
        type: "swordsman",
        quantity: 4,
      },
    ],
    conquered_by: null,
  },
  //   ---
  {
    color: "orange",
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
    conquered_by: null,
  },
  {
    color: "orange",
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
    conquered_by: null,
  },
  //   ---
  {
    color: "lightgray",
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
    conquered_by: null,
  },
  {
    color: "lightgray",
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
    conquered_by: null,
  },
  {
    color: "lightgray",
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
    color: "darkgray",
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
    conquered_by: null,
  },
  {
    color: "darkgray",
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
    color: "purple",
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
    color: "purple",
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
    conquered_by: null,
  },
  // ---

  {
    color: "yellow",
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
    color: "yellow",
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
    conquered_by: null,
  },
  {
    color: "yellow",
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
    conquered_by: null,
  },
  {
    color: "yellow",
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
    conquered_by: null,
  },
];

const DICE = [
  { type: "archer", quantity: 1, img: "archer.webp" },
  { type: "cavalry", quantity: 1, img: "cavalry.webp" },
  { type: "samuray", quantity: 1, img: "samuray.webp" },
  { type: "swordsman", quantity: 1, img: "swordsman-1.webp" },
  { type: "swordsman", quantity: 2, img: "swordsman-2.webp" },
  { type: "swordsman", quantity: 3, img: "swordsman-3.webp" },
];

const UNIT_IMAGES = [
  { type: "archer-1", img: "archer.webp" },
  { type: "cavalry-1", img: "cavalry.webp" },
  { type: "samuray-1", img: "samuray.webp" },
  { type: "swordsman", img: "swordsman-1.webp" },
];

export { CASTLES, DICE, UNIT_IMAGES };
