import React from "react";
import { CoursePart } from "./types";
import Part from "./Part";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </>
  );
};

export default Content;
