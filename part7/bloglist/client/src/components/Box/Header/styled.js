import styled, { css } from "styled-components/macro";

const titleOutlineColor = css`
  ${({ theme }) => theme.fontDark}
`;
const titleOutlineWidth = "1";

export const Header = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.fontLight};
  margin: 0;
  padding: 10px 0;
  letter-spacing: 0.1em;
  font-size: 1.5rem;
  text-shadow: ${titleOutlineWidth}px ${titleOutlineWidth}px
      ${titleOutlineColor},
    -${titleOutlineWidth}px -${titleOutlineWidth}px ${titleOutlineColor},
    ${titleOutlineWidth}px -${titleOutlineWidth}px ${titleOutlineColor},
    -${titleOutlineWidth}px ${titleOutlineWidth}px ${titleOutlineColor};
  background: linear-gradient(
    ${({ theme }) => `${theme.primaryLighter}, ${theme.primary}`}
  );
`;
