import fs from "fs";

import day1 from "./day1.ts";
import day2 from "./day2.ts";
import day3 from "./day3.ts";
import day4 from "./day4.ts";
import day5 from "./day5.ts";

const execDay = (dayNumber, isDemo) => {
  switch (dayNumber) {
    case "1":
      day1(
        fs.readFileSync(`./day1-${isDemo ? "demo" : "full"}-input.txt`, {
          encoding: "utf8",
        })
      );
      break;
    case "2":
      day2(
        fs.readFileSync(`./day2-${isDemo ? "demo" : "full"}-input.txt`, {
          encoding: "utf8",
        })
      );
      break;
    case "3":
      day3(
        fs.readFileSync(`./day3-${isDemo ? "demo" : "full"}-input.txt`, {
          encoding: "utf8",
        })
      );
    case "4":
      day4(
        fs.readFileSync(`./day4-${isDemo ? "demo" : "full"}-input.txt`, {
          encoding: "utf8",
        })
      );
      break;
    case "5":
      day5(
        fs.readFileSync(`./day5-${isDemo ? "demo" : "full"}-input.txt`, {
          encoding: "utf8",
        })
      );
      break;
  }
};

const main = () => {
  const args = process.argv.slice(2);
  const daysToRun = [];
  let isDemoData = false;
  args.forEach((arg) => {
    if (arg.match(/^\d{1,2}$/)) {
      daysToRun.push(arg);
    }
    if (arg === "demo") {
      isDemoData = true;
    }
  });

  daysToRun.forEach((day) => {
    execDay(day, isDemoData);
  });
};

main();
