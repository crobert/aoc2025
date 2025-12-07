type RawProblemType = {
  numbers: string[];
  operation: "*" | "+";
};
type ProblemType = {
  numbers: number[];
  operation: "*" | "+";
};

const computeProblem = (problem: ProblemType) => {
  return problem.numbers.reduce(
    (acc, value) => {
      if (problem.operation === "+") {
        return acc + value;
      } else {
        return acc * value;
      }
    },
    problem.operation === "+" ? 0 : 1
  );
};

const defaultTransform = (numbers: string[]) =>
  numbers.map((number) => parseInt(number.trim(), 10));

const cephalopodMathTransform = (numbers: string[]) => {
  const nbInputs = numbers.length;
  const inputsLength = numbers[0].length;
  const parsedNumbers: number[] = [];
  for (let i = inputsLength - 1; i >= 0; i--) {
    let strValue = "";
    for (let j = 0; j < nbInputs; j++) {
      strValue += numbers[j][i].trim();
    }
    parsedNumbers.push(parseInt(strValue, 10));
  }
  return parsedNumbers;
};

const parseProblems = (rawProblems: RawProblemType[], mode: "one" | "two") => {
  return rawProblems.map((problem) => {
    const numbers =
      mode === "one"
        ? defaultTransform(problem.numbers)
        : cephalopodMathTransform(problem.numbers);
    return {
      numbers,
      operation: problem.operation,
    };
  });
};

const solve = (problemsInput: ProblemType[]) => {
  let total = 0;

  for (let i = 0; i < problemsInput.length; i++) {
    total += computeProblem(problemsInput[i]);
  }
  return total;
};

const readData = (data: string) => {
  const lines = data.split("\n");
  const problemsOperations = lines[lines.length - 1].match(/([+|*]\s*)/g);
  const rawProblems: RawProblemType[] = [];

  let currentIdx = 0;
  for (let i = 0; i < problemsOperations.length; i++) {
    const currentOperation = problemsOperations[i];
    const numbers: string[] = [];
    const toIndex =
      currentIdx +
      currentOperation.length -
      (i === problemsOperations.length - 1 ? 0 : 1);
    for (let j = 0; j < lines.length - 1; j++) {
      numbers.push(lines[j].substring(currentIdx, toIndex));
    }
    const problem: RawProblemType = {
      numbers,
      operation: currentOperation.trim() as "*" | "+",
    };
    rawProblems.push(problem);
    currentIdx += currentOperation.length;
  }
  return rawProblems;
};

const main = (data: string) => {
  const rawProblems = readData(data);
  const part1Problems = parseProblems(rawProblems, "one");
  const part2Problems = parseProblems(rawProblems, "two");
  console.log("result part 1", solve(part1Problems));
  console.log("result part 2", solve(part2Problems));
};
export default main;
