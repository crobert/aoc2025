const findLargestDigit = (availableBankInput: string) => {
  let index = 0;
  let value = parseInt(availableBankInput[0], 10);

  for (let i = 1; i < availableBankInput.length; i++) {
    const currValue = parseInt(availableBankInput[i], 10);
    if (currValue > value) {
      index = i;
      value = currValue;
    }
    if (value === 9) {
      break;
    }
  }
  return [value, index];
};

const findLargestJoltage = (bankInput: string, size: number) => {
  if (bankInput.length < size) {
    return 0;
  }
  const joltage = [];
  let remainingBatteries = bankInput;
  for (let digitIndex = 0; digitIndex < size; digitIndex++) {
    const [value, index] = findLargestDigit(
      remainingBatteries.substring(
        0,
        remainingBatteries.length - size + 1 + digitIndex
      )
    );
    remainingBatteries = remainingBatteries.substring(index + 1);
    joltage.push(value);
  }

  return parseInt(joltage.join(""), 10);
};

const main = (data: string) => {
  let result = 0;
  data.split("\n").map((bank) => {
    result += findLargestJoltage(bank, 12);
  });
  console.log("result", result);
};
export default main;
