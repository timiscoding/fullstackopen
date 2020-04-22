import React from "react";
import { CoursePart } from "./types";
import { assertNever } from "./utils";

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  const { exerciseCount, name } = coursePart;
  const partItems: React.ReactNode[] = [`${exerciseCount} exercises`];
  let desc;
  switch (coursePart.name) {
    case "Fundamentals":
      desc = coursePart.description;
      break;
    case "Using props to pass data": {
      const { groupProjectCount } = coursePart;
      partItems.push(`${groupProjectCount} group projects`);
      break;
    }
    case "Deeper type usage": {
      const { exerciseSubmissionLink, description } = coursePart;
      desc = description;
      partItems.push(<a href={exerciseSubmissionLink}>Submit exercises</a>);
      break;
    }
    case "Types with secret special sauce": {
      const { sauces, burgermeister, description } = coursePart;
      desc = description;
      partItems.push(`Burgermeister: ${burgermeister}`);
      partItems.push(`Sauces: ${sauces}`);
      break;
    }
    default:
      return assertNever(coursePart);
  }
  return (
    <p>
      <h2>{name}</h2>
      <ul>
        {partItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      {desc}
    </p>
  );
};

export default Part;
