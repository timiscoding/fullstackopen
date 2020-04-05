import React from "react";
import faker from "faker";
import FadeOverflow from "./";

export default {
  title: "Fade Overflow",
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
};

export const MobileWidth = () => (
  <FadeOverflow>{faker.lorem.paragraph()}</FadeOverflow>
);
