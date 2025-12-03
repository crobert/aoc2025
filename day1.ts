const computeRotation = (result: number, currValue: number, str: string) => {
  const dir = str.substring(0, 1);
  const parsedValue = parseInt(str.substring(1), 10);
  result += Math.floor(parsedValue / 100);
  const value = parsedValue % 100;

  if (dir === "R") {
    currValue += value;
  } else {
    if (currValue - value < 0) {
      if (currValue > 0) {
        result += 1;
      }
      currValue += 100;
    }
    currValue -= value;
  }
  if (currValue === 0) {
    result += 1;
  } else {
    result += Math.floor(currValue / 100);
  }
  return [currValue % 100, result];
};

const main = (data: string) => {
  let result = 0;
  let currValue = 50;
  data.split("\n").map((v) => {
    [currValue, result] = computeRotation(result, currValue, v);
  });
  console.log("result", result);
};

export default main;
