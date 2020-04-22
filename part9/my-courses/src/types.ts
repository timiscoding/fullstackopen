interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface WithDesc {
  description: string;
}

interface CoursePartOne extends CoursePartBase, WithDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase, WithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartSpecial extends CoursePartBase, WithDesc {
  name: "Types with secret special sauce";
  sauces: string;
  burgermeister: string;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartSpecial;
