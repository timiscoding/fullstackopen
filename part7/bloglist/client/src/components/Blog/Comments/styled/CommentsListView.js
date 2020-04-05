import styled, { css } from "styled-components/macro";

const border = css`
  1px solid ${({ theme }) => theme.greyLight}
`;

export const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  border-top: ${border};
`;

export const Time = styled.time`
  font-size: 0.7rem;
  font-weight: 250;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
`;

export const Comment = styled.li`
  padding: 5px 0;
  border-bottom: ${border};
  font-size: 0.9rem;
`;

export const Body = styled.div`
  white-space: pre-line;
`;
