export function removeDuplicates(arrays) {
  // Flatten the array of arrays and convert elements to unique references
  const uniqueSet = new Set();
  arrays.forEach((arr) => {
    Array.from(arr).forEach((element) => uniqueSet.add(element));
  });

  // Convert the Set back to an array
  const uniqueArray = Array.from(uniqueSet);

  return uniqueArray;
}
