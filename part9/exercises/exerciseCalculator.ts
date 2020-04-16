interface ExerciseValues {
  hrs: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratings = [
  "not too bad but could be better",
  "Target reached, well done!",
  "Amazing job, you exceeded your target!",
];

export const calculateExercises = (
  exerciseHrs: number[],
  dailyTarget: number
): Result => {
  const average: number =
    exerciseHrs.length > 0
      ? exerciseHrs.reduce((sum, h) => sum + h, 0) / exerciseHrs.length
      : 0;
  const success = average >= dailyTarget;
  const rating = average < dailyTarget ? 1 : average === dailyTarget ? 2 : 3;
  return {
    periodLength: exerciseHrs.length,
    trainingDays: exerciseHrs.filter(Boolean).length,
    average,
    success,
    target: dailyTarget,
    rating,
    ratingDescription: ratings[rating - 1],
  };
};

export const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) {
    throw Error("Not enough args");
  }
  const [, , t, ...h] = args;
  const target = Number(t);
  const hrs = h.map(Number);

  if (!isNaN(target) && hrs.every((h) => !isNaN(h))) {
    return {
      hrs,
      target,
    };
  } else {
    throw Error("Args must be numbers");
  }
};
