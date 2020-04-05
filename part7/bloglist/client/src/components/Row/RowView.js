import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { styling } from "../../constants";

const Row = styled.div`
  display: grid;
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  grid-template-columns: repeat(
    ${({ cols }) => cols},
    ${({ colWidth }) => colWidth}
  );
  gap: 10px;
  ${({ noResponsive }) =>
    !noResponsive &&
    styling.mobile(`
    grid-template-columns: none;
    justify-content: normal;
  `)}
`;

const RowView = ({
  children,
  cols,
  justify = "start",
  colWidth = "auto",
  align = "center",
  noResponsive,
}) => {
  return (
    <Row
      cols={cols}
      justify={justify}
      align={align}
      colWidth={colWidth}
      noResponsive={noResponsive}
    >
      {children}
    </Row>
  );
};

RowView.propTypes = {
  cols: PropTypes.number,
  justify: PropTypes.string,
  align: PropTypes.string,
  width: PropTypes.string,
};

export default RowView;
