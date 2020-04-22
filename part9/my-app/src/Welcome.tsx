import React from "react";

const Welcome: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};

export default Welcome;
