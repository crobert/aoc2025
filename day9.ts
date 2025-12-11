type PointType = {
  x: number;
  y: number;
};

type SurfaceType = {
  cornerA: PointType;
  cornerB: PointType;
  surface: number;
};

const computeSurface = (a: PointType, b: PointType) => {
  return (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
};

const getLargestSwitchableSurface = (
  rectanglesToCheck: SurfaceType[],
  polygone: PointType[][]
) => {
  // Trouver le premier rectangle qui ne croise pas le polygone
  for (let i = 0; i < rectanglesToCheck.length; i++) {
    const { surface, cornerA, cornerB } = rectanglesToCheck[i];
    const x1 = cornerA.x;
    const x2 = cornerB.x;
    let y1Sorted = cornerA.y;
    let y2Sorted = cornerB.y;

    if (y1Sorted > y2Sorted) {
      [y1Sorted, y2Sorted] = [y2Sorted, y1Sorted];
    }

    // On vérifie les intersections entre le rectangle courrant et toutes les bordures
    if (
      !polygone.some(([p1, p2]) => {
        const x3 = p1.x;
        const y3 = p1.y;
        const x4 = p2.x;
        const y4 = p2.y;
        return x4 > x1 && x3 < x2 && y4 > y1Sorted && y3 < y2Sorted;
      })
    ) {
      return surface;
    }
  }

  return 0;
};

const computeAllSurfaces = (redCorners: PointType[]) => {
  const allRectangles: SurfaceType[] = [];
  for (let i = 0; i < redCorners.length; i++) {
    for (let j = i + 1; j < redCorners.length; j++) {
      const [cornerA, cornerB] = [redCorners[i], redCorners[j]].sort((a, b) =>
        a.x === b.x ? a.y - b.y : a.x - b.x
      );
      allRectangles.push({
        cornerA,
        cornerB,
        surface: computeSurface(redCorners[i], redCorners[j]),
      });
    }
  }
  return allRectangles.sort((a, b) => b.surface - a.surface);
};

const getEdges = (redCorners: PointType[]) => {
  const edges: [PointType, PointType][] = [];
  for (let i = 0; i < redCorners.length; i++) {
    // On lit les points successifs pour former le polygone
    const edge = [
      redCorners[i],
      redCorners[i === 0 ? redCorners.length - 1 : i - 1],
    ].sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x)) as [
      PointType,
      PointType
    ];
    edges.push(edge);
  }
  return edges;
};

const main = (data: string) => {
  let resultPart2 = 0;
  let resultPart1 = 0;

  const redCorners = data.split("\n").map((input) => {
    const coordinates = input.split(",");
    return {
      x: parseInt(coordinates[0], 10),
      y: parseInt(coordinates[1], 10),
    };
  });
  const allRectangles = computeAllSurfaces(redCorners);
  resultPart1 = allRectangles[0].surface;
  const polygon = getEdges(redCorners);
  resultPart2 = getLargestSwitchableSurface(allRectangles, polygon);
  console.log("result part 1", resultPart1);
  console.log("result part 2", resultPart2);
};

export default main;
