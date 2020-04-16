interface BmiValues {
  height: number;
  mass: number;
}

const calculateBmi = (height: number, mass: number): string => {
  const heightMeters = height / 100;
  const bmi = mass / (heightMeters * heightMeters);
  const bmiCat = new Map([
    [[0, 15], "Very severely underweight"],
    [[15, 16], "Severely underweight"],
    [[16, 18.5], "Underweight"],
    [[18.5, 25], "Normal (healthy weight)"],
    [[25, 30], "Overweight"],
    [[30, 35], "Obese Class I (Moderately obese)"],
    [[35, 40], "Obese Class II (Severely obese)"],
    [[40, Infinity], "Obese Class III (Very severely obese)"],
  ]);
  for (let [[min, max], cat] of bmiCat) {
    if (bmi >= min && bmi < max) {
      return cat;
    }
  }
};

const parseArgs = (args: Array<string>): BmiValues => {
  if (args.length !== 4) {
    throw Error("Must provide 2 arguments: height (cm) and mass (kg)");
  }
  const height = Number(args[2]);
  const mass = Number(args[3]);
  if (Number.isNaN(height) || Number.isNaN(mass)) {
    throw Error("Height and mass must be a number");
  }
  return {
    height,
    mass,
  };
};

try {
  const { height, mass } = parseArgs(process.argv);
  console.log(calculateBmi(height, mass));
} catch (e) {
  console.error(`Error: ${e.message}`);
}
