import styled, { css } from "styled-components/macro";
import { ellipsis } from "polished";
import { styling } from "../../constants";

const border = css`1px solid ${({ theme }) => theme.grey};`;

export const BaseRow = styled.li`
  display: grid;
  grid-template-columns: 3fr 2fr minmax(min-content, 1fr);
  list-style-type: none;
  border-top: ${border}
  border-left: ${border}
  & > div {
    border-right: ${border};
    border-bottom: ${border};
    padding: 2px 5px;
  }
  ${styling.mobile(`
    & > div {
      padding: 10px 5px;
    }
  `)}
`;

export const Row = styled(BaseRow)`
  &:first-child {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.fontLight};
  }
  &:nth-child(2n + 3) {
    background-color: ${({ theme }) => theme.primaryLighter};
  }
  ${styling.hover(css`
    &:nth-child(n + 2):hover {
      background-color: ${({ theme }) => theme.secondary};
      cursor: pointer;
    }
  `)}
  &:nth-child(n + 2):active {
    background-color: ${({ theme }) => theme.secondaryDark};
    cursor: pointer;
  }
`;

export const Table = styled.ul`
  margin: 0;
  padding: 0;
`;

export const Name = styled.div`
  ${ellipsis("100%")}
`;

export const SkeletonRow = styled(BaseRow)`
  &:first-child {
    background-color: ${({ theme }) => theme.greyDark};
  }
`;
