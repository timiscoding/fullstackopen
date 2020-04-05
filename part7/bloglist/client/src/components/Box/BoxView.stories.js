import React from "react";
import Box from "./";

export default {
  title: "Box"
};

export const normal = () => (
  <Box>
    <Box.Header>Star Trek</Box.Header>
    <Box.Body>To boldly go where no one has gone before...</Box.Body>
  </Box>
);
