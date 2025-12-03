const checkNumber = (valueToCheck: string) => {
  //Regex chiffres répétés une fois à la suite
  if (/^(\d+)\1+$/.test(valueToCheck)) {
    return parseInt(valueToCheck, 10);
  }
  return 0;
};
const checkRange = (result: number, from: string, to: string) => {
  const fromValue = parseInt(from, 10);
  const toValue = parseInt(to, 10);
  let currValue = fromValue;
  while (currValue <= toValue) {
    result += checkNumber(currValue.toString());
    currValue += 1;
  }
  return result;
};

const main = (data: string) => {
  let result = 0;
  data.split(",").map((range) => {
    const [from, to] = range.split("-");
    result = checkRange(result, from, to);
  });
  console.log("result", result);
};
export default main;
