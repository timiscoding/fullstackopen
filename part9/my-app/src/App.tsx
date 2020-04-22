import React from "react";
import { CoursePart } from "./types";

/**
 * Helper functino for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

function App() {
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
  ];

  courseParts.forEach((part) => {
    switch (part.name) {
      case "Fundamentals":
        // TS knows that we can use name, exerciseCount and description
        break;
      case "Using props to pass data":
        // TS knows that we can use name, exerciseCount and groupProjectCount
        break;
      case "Deeper type usage":
        // TS knows that we can use name, exerciseCount, description and exerciseSubmissionLink
        break;
      default:
        return assertNever(part);
    }
  });
  return <div>hi</div>;
}

export default App;
