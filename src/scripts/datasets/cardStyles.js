export function cardStyle1(castle) {
  return `
        <div class="border border-black p-2 m-1 bg-[${castle.color}]">
            <div class="aspect-square w-48 relative">
                ${
                  castle.extraSamuray
                    ? `
                <div id="red-samuary" class="absolute top-0 left-0">
                    <img src="/assets/units/red-samuray.png" class="aspect-square w-8" />
                </div>
                `
                    : ""
                }
                <div class="flex justify-end">
                    <div class=" w-5/12 grid grid-cols-2 gap-2">
                        ${castle.units
                          .map((unit) => {
                            return unit.type === "swordsman"
                              ? `
                        <div id="${unit.type}" class=" border p-1 flex gap-1 justify-between itemas-center col-span-2">
                            <div class="">${unit.quantity}</div>
                            <img src="/assets/units/${unit.img}" class="aspect-square w-8" />
                        </div>
                        `
                              : `
                        <div id="${unit.type}" class="aspect-square w-8 ">
                            <img src="/assets/units/${unit.img}" />
                        </div>
                        `;
                          })
                          .join("")}
                    </div>
                </div>
                <div class="flex flex-col justify-between">
                    <div class="flex flex-col">
                        <p class="text-xl font-bold">${castle.influence}</p>
                        <span class="text-2xl">${castle.name}</span>
                        <span class="text-sm">${castle.realm}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function cardStyle2(castle) {
  return `
      <div class="aspect-square w-48  border border-black m-1 ">
          <div class="bg-[${castle.color}] p-2 flex justify-between">
              <div class="flex flex-col">
                  <span class="text-xl">${castle.name}</span>
                  <span class="text-xs">${castle.realm}</span>
              </div>
              <p class="text-xl font-bold">${castle.influence}</p>
          </div>

          <div class="relative p-2">
              ${
                castle.extraSamuray
                  ? `
                    <div id="red-samuary"  class="aspect-square w-8 flex justify-center items-center uppercase text-sm absolute top-2 left-2">
                        rs
                    </div>
                    `
                  : ""
              }
              <div class="flex justify-end">
                  <div class=" w-5/12 grid grid-cols-2 gap-2">
                      ${castle.units
                        .map((unit) => {
                          return unit.type === "swordsman"
                            ? `
                      <div id="${unit.type}" class=" border p-1 flex gap-1 justify-between itemas-center col-span-2">
                          <div class="">${unit.quantity}</div>
                          <div  class="aspect-square w-4 flex justify-center items-center uppercase text-sm">
                          ${unit.code}
                          </div>
                      </div>
                      `
                            : `
                      <div id="${unit.type}" class="aspect-square w-8 flex justify-center items-center uppercase text-sm">
                      ${unit.code}
                      </div>
                      `;
                        })
                        .join("")}
                  </div>
              </div>

          </div>
      </div>
      `;
}
