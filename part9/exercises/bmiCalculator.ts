interface BmiValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  const bmiRanges = [
    [0, 15],
    [15, 16],
    [16, 18.5],
    [18.5, 25],
    [25, 30],
    [30, 35],
    [35, 40],
    [40, Infinity],
  ];
  const cats = [
    "Very severely underweight",
    "Severely underweight",
    "Underweight",
    "Normal (healthy weight)",
    "Overweight",
    "Obese Class I (Moderately obese)",
    "Obese Class II (Severely obese)",
    "Obese Class III (Very severely obese)",
  ];
  const index = bmiRanges.findIndex(([min, max]) => bmi >= min && bmi < max);
  return cats[index];
};

export const parseArgs = (args: Array<string>): BmiValues => {
  if (args.length !== 4) {
    throw Error("Must provide 2 arguments: height (cm) and weight (kg)");
  }
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (Number.isNaN(height) || Number.isNaN(weight)) {
    throw Error("Height and weight must be a number");
  }
  return {
    height,
    weight,
  };
};
