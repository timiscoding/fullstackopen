import React from "react";
import styled from "styled-components";
import Dropdown from "./";

const sortOptions = [
  {
    value: "createdAt-desc",
    title: "Sort by: Newest first"
  },
  {
    value: "createdAt-asc",
    title: "Sort by: Oldest first"
  },
  {
    value: "title-asc",
    title: "Sort by: Title A-Z"
  },
  {
    value: "title-desc",
    title: "Sort by: Title Z-A"
  },
  {
    value: "likes-desc",
    title: "Sort by: Most popular first"
  },
  {
    value: "likes-asc",
    title: "Sort by: Least popular first"
  }
];

const SortDropdown = styled(Dropdown)`
  --dd-width: 200px;
  float: right;
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
