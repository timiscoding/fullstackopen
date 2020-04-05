import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ListItem, Link, Page, List, NextIcon, PrevIcon } from "./styled";

const PagerView = ({
  onClick,
  currentPage,
  lastPage,
  maxNavPages = 5,
  pending,
  className
}) => {
  const [mobileWidth, setMobileWidth] = useState(false);
  useEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 768px)");
    const handleWidthChange = mql => {
      if (mql.matches) {
        setMobileWidth(true);
      } else {
        setMobileWidth(false);
      }
    };
    mediaQueryList.addListener(handleWidthChange);
    handleWidthChange(mediaQueryList);
    return () => {
      mediaQueryList.removeListener(handleWidthChange);
    };
  }, []);

  const PageLink = ({ children, value, disabled }) => {
    const handleClick = event => {
      event.preventDefault();
      onClick(value);
    };
    return (
      <ListItem>
        <Link href="#" onClick={handleClick} disabled={disabled}>
          {children}
        </Link>
      </ListItem>
    );
  };

  const renderPageNumbers = () => {
    const CurrentPage = () => (
      <ListItem>
        <Page>{currentPage}</Page>
      </ListItem>
    );
    if (pending) {
      return <PageLink disabled>...</PageLink>;
    }
    if (mobileWidth) return <CurrentPage />;
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
    return pages.map((pageNum, i) =>
      currentPage !== pageNum ? (
        <PageLink key={i} onClick={onClick} value={pageNum}>
          {pageNum}
        </PageLink>
      ) : (
        <CurrentPage key="currentPage" />
      )
    );
  };

  return (
    <nav className={className}>
      <List>
        <PageLink key="first" value={1} disabled={pending || currentPage === 1}>
          First
        </PageLink>
        <PageLink
          key="previous"
          value={currentPage - 1}
          disabled={pending || currentPage === 1}
        >
          <PrevIcon />
        </PageLink>
        {renderPageNumbers()}
        <PageLink
          key="next"
          value={currentPage + 1}
          disabled={pending || lastPage === 0 || currentPage === lastPage}
        >
          <NextIcon />
        </PageLink>
        <PageLink
          key="last"
          value={lastPage}
          disabled={pending || lastPage === 0 || currentPage === lastPage}
        >
          Last
        </PageLink>
      </List>
    </nav>
  );
};

PagerView.propTypes = {
  onClick: PropTypes.func,
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  maxNavPages: PropTypes.number,
  pending: PropTypes.bool
};

export default PagerView;
