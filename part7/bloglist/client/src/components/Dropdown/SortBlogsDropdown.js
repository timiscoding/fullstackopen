import React from "react";
import styled from "styled-components/macro";
import Dropdown from "./";

const sortOptions = [
  {
    value: "createdAt-desc",
    title: "By newest first"
  },
  {
    value: "createdAt-asc",
    title: "By oldest first"
  },
  {
    value: "title-asc",
    title: "By title A-Z"
  },
  {
    value: "title-desc",
    title: "By title Z-A"
  },
  {
    value: "likes-desc",
    title: "By most popular first"
  },
  {
    value: "likes-asc",
    title: "By least popular first"
  }
];

const SortDropdown = styled(Dropdown)`
  float: right;
  --dd-width: 180px;
`;

const DEFAULT_VALUE = sortOptions[0].value;

const SortBlogsDropdown = ({ defaultValue, onChange }) => {
  return (
    <SortDropdown
      options={sortOptions}
      defaultValue={defaultValue || DEFAULT_VALUE}
      onChange={onChange}
    />
  );
};

SortBlogsDropdown.DEFAULT_VALUE = DEFAULT_VALUE;

export default SortBlogsDropdown;
