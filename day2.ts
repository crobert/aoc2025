const checkNumber = (valueToCheck: string, part: "one" | "two") => {
  const regExp = new RegExp(`^(\\d+)\\1${part === "one" ? "" : "+"}$`);
  if (regExp.test(valueToCheck)) {
    return parseInt(valueToCheck, 10);
  }
  return 0;
};
const checkRange = (from: string, to: string, part: "one" | "two") => {
  const fromValue = parseInt(from, 10);
  const toValue = parseInt(to, 10);
  let currValue = fromValue;
  let sumInvalid = 0;
  while (currValue <= toValue) {
    sumInvalid += checkNumber(currValue.toString(), part);
    currValue += 1;
  }
  return sumInvalid;
};

const main = (data: string) => {
  let result = 0;
  let resultPart1 = 0;
  data.split(",").map((range) => {
    const [from, to] = range.split("-");
    resultPart1 += checkRange(from, to, "one");
    result += checkRange(from, to, "two");
  });
  console.log("result part 1", resultPart1);
  console.log("result part 2", result);
};
export default main;
