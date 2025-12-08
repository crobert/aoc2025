const sendBeam = (manifold: string[]) => {
  const initialStep = manifold.shift().replace("S", "1").split("");
  const defaultStep = initialStep.map((_) => ".");
  let splitCount = 0;
  const output = manifold.reduce((lastStep, currentStep) => {
    let currentStepWithBeam = [...defaultStep];
    for (let i = 0; i < currentStep.length; i++) {
      const isIncomingBeam = lastStep[i].match(/\d+/);
      if (isIncomingBeam) {
        const beamValue = parseInt(lastStep[i], 10);
        if (currentStep[i] === ".") {
          const currentStepValue =
            currentStepWithBeam[i] !== "."
              ? parseInt(currentStepWithBeam[i], 10)
              : 0;
          currentStepWithBeam[i] = (currentStepValue + beamValue).toString();
        } else if (currentStep[i] === "^") {
          splitCount++;

          if (i - 1 >= 0) {
            const currentStepValue =
              currentStepWithBeam[i - 1] !== "."
                ? parseInt(currentStepWithBeam[i - 1], 10)
                : 0;
            currentStepWithBeam[i - 1] = (
              currentStepValue + beamValue
            ).toString();
          }
          if (i + 1 < currentStepWithBeam.length) {
            const currentStepValue =
              currentStepWithBeam[i + 1] !== "."
                ? parseInt(currentStepWithBeam[i + 1], 10)
                : 0;
            currentStepWithBeam[i + 1] = (
              currentStepValue + beamValue
            ).toString();
          }
        }
      }
    }
    return currentStepWithBeam;
  }, initialStep);
  const nbTotalPath = output.reduce((acc, path) => {
    if (path.match(/\d+/)) {
      return acc + parseInt(path, 10);
    }
    return acc;
  }, 0);

  return [splitCount, nbTotalPath];
};

const main = (data: string) => {
  const manifold = data.split("\n");
  const [nbSplit, nbTotalPath] = sendBeam(manifold);
  console.log("result part 1", nbSplit);
  console.log("result part 2", nbTotalPath);
};
export default main;
