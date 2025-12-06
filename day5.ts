type RangeType = [number, number];

const inRange = (ingredient: number, range: RangeType) => {
  return ingredient >= range[0] && ingredient <= range[1];
};

const addRange = (range: RangeType, allRanges: RangeType[]) => {
  const tmpRanges = [];
  let rangeToAdd = [...range];
  for (let i = 0; i < allRanges.length; i++) {
    // Si on a une intersection on fusionne les deux intervalles
    if (
      inRange(rangeToAdd[0], allRanges[i]) ||
      inRange(rangeToAdd[1], allRanges[i])
    ) {
      rangeToAdd = [
        Math.min(rangeToAdd[0], allRanges[i][0]),
        Math.max(rangeToAdd[1], allRanges[i][1]),
      ];
    } else {
      // Sinon on garde l'intervalle
      tmpRanges.push(allRanges[i]);
    }
  }
  tmpRanges.push(rangeToAdd);
  return tmpRanges;
};

const mergeRanges = (allRanges: RangeType[]) => {
  let mergedRanges: RangeType[] = [];
  for (let i = 0; i < allRanges.length; i++) {
    const range = allRanges[i];
    mergedRanges = addRange(range, mergedRanges);
  }
  return mergedRanges;
};

const getFreshIngredients = (
  freshRanges: RangeType[],
  ingredients: number[]
) => {
  let nbFresh = 0;
  for (let i = 0; i < ingredients.length; i++) {
    let j = 0;
    let isInRange = false;
    while (
      j < freshRanges.length &&
      (isInRange = inRange(ingredients[i], freshRanges[j])) !== true
    ) {
      j++;
    }
    if (isInRange) {
      nbFresh += 1;
    }
  }
  return nbFresh;
};

const readData = (data: string): [RangeType[], number[]] => {
  const [freshRangesStr, ingredients] = data.split("\n\n");
  const freshRanges: RangeType[] = freshRangesStr.split("\n").map((range) => {
    const [min, max] = range.split("-");
    return [parseInt(min, 10), parseInt(max, 10)];
  });
  return [freshRanges, ingredients.split("\n").map((i) => parseInt(i, 10))];
};

const main = (data: string) => {
  let result = 0;
  const [freshRanges, ingredients] = readData(data);
  const freshRangesMerged = mergeRanges(freshRanges);
  const allIngredientsCount = freshRangesMerged.reduce((acc, range) => {
    return acc + range[1] - range[0] + 1;
  }, 0);
  result = getFreshIngredients(freshRanges, ingredients);
  console.log("result part 1", result);
  console.log("result part 2", allIngredientsCount);
};
export default main;
