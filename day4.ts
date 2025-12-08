const computeNeighboors = (matrix: string[], x: number, y: number) => {
  let nbNeighboors = 0;
  if (matrix[y - 1]?.[x - 1] === "@") {
    nbNeighboors++;
  }
  if (matrix[y - 1]?.[x] === "@") {
    nbNeighboors++;
  }
  if (matrix[y - 1]?.[x + 1] === "@") {
    nbNeighboors++;
  }
  if (matrix[y]?.[x - 1] === "@") {
    nbNeighboors++;
  }
  if (matrix[y]?.[x + 1] === "@") {
    nbNeighboors++;
  }
  if (matrix[y + 1]?.[x - 1] === "@") {
    nbNeighboors++;
  }
  if (matrix[y + 1]?.[x] === "@") {
    nbNeighboors++;
  }
  if (matrix[y + 1]?.[x + 1] === "@") {
    nbNeighboors++;
  }
  return nbNeighboors;
};

const findMoveableRoller = (matrix: string[]): [number, string[]] => {
  const nextMatrix = [...matrix];
  let nbMoveableRoller = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "@") {
        const nbNeighboors = computeNeighboors(matrix, x, y);
        if (nbNeighboors < 4) {
          nbMoveableRoller++;
          nextMatrix[y] =
            nextMatrix[y].substring(0, x) +
            "." +
            nextMatrix[y].substring(x + 1);
        }
      }
    }
  }
  return [nbMoveableRoller, nextMatrix];
};

const main = (data: string) => {
  const matrix = data.split("\n");
  let firstRoundMoveableRoller: number;
  let totalMoveableRoller = 0;
  let currentMatrix = matrix;
  let lastMoveableRoller = 0;
  do {
    [lastMoveableRoller, currentMatrix] = findMoveableRoller(currentMatrix);
    totalMoveableRoller += lastMoveableRoller;
    if (!firstRoundMoveableRoller) {
      firstRoundMoveableRoller = lastMoveableRoller;
    }
  } while (lastMoveableRoller !== 0);
  console.log("result part 1", firstRoundMoveableRoller);
  console.log("result part 2", totalMoveableRoller);
};
export default main;
