import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { ReactComponent as NextIcon } from "../../icons/right-chevron.svg";
import { ReactComponent as PrevIcon } from "../../icons/left-chevron.svg";

const StyledNextIcon = styled(NextIcon)`
  width: 1em;
  height: 1em;
  vertical-align: sub;
  fill: ${({ theme, disabled }) =>
    disabled ? theme.greyLight : theme.secondaryDark};
`;

const Link = styled.a`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  color: ${({ isActive, disabled, theme }) =>
    isActive ? "black" : disabled ? theme.greyLight : null};
  border: ${({ isActive, theme }) =>
    !isActive ? `1px solid ${theme.greyLight}` : "none"};
  display: inline-block;
  padding: 10px;
  &:hover {
    transition: border 0.5s;
    text-decoration: none;
    border: ${({ theme, isActive }) =>
      !isActive ? `1px solid ${theme.primary}` : "none"};
  }
  &:active {
    text-decoration: none;
    background-color: ${({ theme, isActive }) =>
      !isActive && theme.primaryLight};
    color: ${({ theme, isActive }) => !isActive && theme.secondaryDark};
  }
`;

const ListItem = styled.li`
  list-style-type: none;
  text-align: center;
  &:not(:first-child) {
    margin-left: 5px;
  }
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const PageLink = ({ children, onClick, value, isActive, disabled }) => {
  const handleClick = event => {
    event.preventDefault();
    onClick(value);
  };
  const props = !isActive ? { href: "#", onClick: handleClick } : {};
  const child = React.Children.only(children);
  return (
    <ListItem>
      <Link {...props} isActive={isActive} disabled={disabled}>
        {React.cloneElement(child, { disabled })}
      </Link>
    </ListItem>
  );
};

const PagerView = ({
  onClick,
  currentPage,
  lastPage,
  maxNavPages = 5,
  pending,
  className
}) => {
  if (pending) {
    const itemWidths = [70, ...Array(3).fill(40), 70];
    return (
      <nav className={className}>
        <List>
          {itemWidths.map((width, i) => (
            <ListItem key={i}>
              <Skeleton width={`${width}px`} height="40px" />
            </ListItem>
          ))}
        </List>
      </nav>
    );
  }

  currentPage = Math.max(Math.min(lastPage, currentPage), 1); // clamp between [1, lastPage]
  let pageStart = 1;
  if (lastPage > maxNavPages && currentPage >= maxNavPages) {
    const pagesAfter = Math.floor(maxNavPages / 2); // pages to show after currentPage
    const pagesLeft = lastPage - currentPage;
    if (pagesLeft >= pagesAfter) {
      const pagesBefore = maxNavPages & 1 ? pagesAfter : pagesAfter - 1;
      pageStart = currentPage - pagesBefore;
    } else {
      pageStart = lastPage - maxNavPages + 1;
    }
  }
  const pages = Array(lastPage > maxNavPages ? maxNavPages : lastPage)
    .fill()
    .map((_, i) => pageStart + i);

  return (
    <nav className={className}>
      <List>
        <PageLink onClick={onClick} value={1} disabled={currentPage === 1}>
          <span>First</span>
        </PageLink>
        <PageLink
          onClick={onClick}
          value={currentPage - 1}
          disabled={currentPage === 1}
        >
          <StyledNextIcon as={PrevIcon} />
        </PageLink>
        {pages.map((pageNum, i) => (
          <PageLink
            key={i}
            onClick={onClick}
            value={pageNum}
            isActive={currentPage === pageNum}
          >
            <span>{pageNum}</span>
          </PageLink>
        ))}
        <PageLink
          onClick={onClick}
          value={currentPage + 1}
          disabled={lastPage === 0 || currentPage === lastPage}
        >
          <StyledNextIcon />
        </PageLink>
        <PageLink
          onClick={onClick}
          value={lastPage}
          disabled={lastPage === 0 || currentPage === lastPage}
        >
          <span>Last</span>
        </PageLink>
      </List>
    </nav>
  );
};

export default PagerView;
