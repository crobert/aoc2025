type PointType = {
  x: number;
  y: number;
  z: number;
};

type DistanceType = {
  boxA: number;
  boxB: number;
  distance: number;
};

type CircuitType = number[];

const mergeCircuits = (
  circuits: CircuitType[],
  indexToMergeA: number,
  indexToMergeB: number
) => {
  let circuitsA: CircuitType;
  let circuitsB: CircuitType;
  if (indexToMergeA < indexToMergeB) {
    circuitsB = circuits.splice(indexToMergeB, 1)[0];
    circuitsA = circuits.splice(indexToMergeA, 1)[0];
  } else {
    circuitsA = circuits.splice(indexToMergeA, 1)[0];
    circuitsB = circuits.splice(indexToMergeB, 1)[0];
  }
  return [...circuits, [...circuitsA, ...circuitsB]];
};

const isBoxInCircuit = (boxIdx: number, circuits: number[][]) => {
  for (let i = 0; i < circuits.length; i++) {
    if (circuits[i].includes(boxIdx)) {
      return i;
    }
  }
  return -1;
};

const joinBoxes = (boxes: DistanceType[], nbJoin: number) => {
  let circuits: CircuitType[] = [];
  for (let i = 0; i < nbJoin; i++) {
    const boxACircuitIdx = isBoxInCircuit(boxes[i].boxA, circuits);
    const boxBCircuitIdx = isBoxInCircuit(boxes[i].boxB, circuits);
    if (boxACircuitIdx === -1) {
      if (boxBCircuitIdx === -1) {
        // Nouveau circuit
        circuits.push([boxes[i].boxA, boxes[i].boxB]);
      } else {
        // Ajoute A au circuit B
        circuits[boxBCircuitIdx].push(boxes[i].boxA);
      }
    } else {
      if (boxBCircuitIdx === -1) {
        // Ajoute B au circuit A
        circuits[boxACircuitIdx].push(boxes[i].boxB);
      } else {
        if (boxACircuitIdx !== boxBCircuitIdx) {
          // Fusionne les circuits
          circuits = mergeCircuits(circuits, boxACircuitIdx, boxBCircuitIdx);
        }
      }
    }
  }
  return circuits.sort((a, b) => b.length - a.length);
};
const joinBoxesPart2 = (boxes: DistanceType[], nbBoxes: number) => {
  let circuits: CircuitType[] = [];

  for (let i = 0; i < boxes.length; i++) {
    const boxACircuit = isBoxInCircuit(boxes[i].boxA, circuits);
    const boxBCircuit = isBoxInCircuit(boxes[i].boxB, circuits);
    if (boxACircuit === -1) {
      if (boxBCircuit === -1) {
        // Nouveau circuit
        circuits.push([boxes[i].boxA, boxes[i].boxB]);
      } else {
        // Ajoute A au circuit B
        circuits[boxBCircuit].push(boxes[i].boxA);
      }
    } else {
      if (boxBCircuit === -1) {
        // Ajoute B au circuit A
        circuits[boxACircuit].push(boxes[i].boxB);
      } else {
        if (boxACircuit !== boxBCircuit) {
          // Fusionne les circuits
          circuits = mergeCircuits(circuits, boxACircuit, boxBCircuit);
        }
      }
    }
    if (circuits[0].length === nbBoxes) {
      return boxes[i];
    }
  }
};

const computeDistance = (a: PointType, b: PointType) => {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);
};

const computeAllDistances = (junctionBoxes: PointType[]) => {
  const allDistances: DistanceType[] = [];
  for (let i = 0; i < junctionBoxes.length; i++) {
    for (let j = i + 1; j < junctionBoxes.length; j++) {
      allDistances.push({
        boxA: i,
        boxB: j,
        distance: computeDistance(junctionBoxes[i], junctionBoxes[j]),
      });
    }
  }
  return allDistances.sort((a, b) => a.distance - b.distance);
};

const main = (data: string) => {
  const junctionBoxes = data.split("\n").map((input) => {
    const coordinates = input.split(",");
    return {
      x: parseInt(coordinates[0], 10),
      y: parseInt(coordinates[1], 10),
      z: parseInt(coordinates[2], 10),
    };
  });
  const allDistances = computeAllDistances(junctionBoxes);
  const circuits = joinBoxes(
    allDistances,
    junctionBoxes.length > 20 ? 1000 : 10
  );
  const lastJoin = joinBoxesPart2(allDistances, junctionBoxes.length);
  const resultPart1 =
    circuits[0].length *
    (circuits[1]?.length || 1) *
    (circuits[2]?.length || 1);
  const resultPart2 =
    junctionBoxes[lastJoin.boxA].x * junctionBoxes[lastJoin.boxB].x;

  console.log("result part 1", resultPart1);
  console.log("result part 2", resultPart2);
};
export default main;
