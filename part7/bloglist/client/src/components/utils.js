import React from "react";

const monthStr = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
export const formatTimestamp = (ts) => {
  const d = new Date(ts);
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")} ${
    monthStr[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()}`;
};

export const formatNum = (num) => {
  if (num / 1000 < 1) return num;
  if (num % 1000 >= 100) return Number(num / 1000).toFixed(1) + "k";
  return Math.floor(num / 1000) + "k";
};

// Given a list of props, remove them from a component before rendering
//
// When using styled-components, sometimes you want to pass in a prop
// to conditionally style it. eg. <StyledLink grey />
//
// The problem is that the grey prop gets passed down to Link and
// ends up being added as a HTML attribute which we don't want
//
// The fix would be to generate an intermediate component factory without the prop:
// styled(filterProps(Link, ['grey']))
//
// see https://github.com/styled-components/styled-components/issues/1198
export const filterProps = (Comp, filter) => (props) => {
  const filtered = Object.entries(props).reduce(
    (r, [k, v]) => (!filter.includes(k) ? { ...r, [k]: v } : r),
    {}
  );
  return <Comp {...filtered} />;
};
