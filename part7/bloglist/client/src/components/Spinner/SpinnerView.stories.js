import React from "react";
import Spinner from "./";

export default {
  title: "Spinner",
  decorators: [
    storyFn => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        {storyFn()}
      </div>
    )
  ]
};

export const constantArcLength = () => (
  <>
    <Spinner size="sm" arcLen="const" />
    <Spinner size="md" arcLen="const" />
    <Spinner size="lg" arcLen="const" />
  </>
);

export const variableArcLength = () => (
  <>
    <Spinner size="sm" arcLen="var" />
    <Spinner size="md" arcLen="var" />
    <Spinner size="lg" arcLen="var" />
  </>
);
