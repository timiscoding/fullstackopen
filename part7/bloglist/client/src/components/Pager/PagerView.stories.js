import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";
import Pager from "./PagerView";

export default {
  title: "Pager",
  decorators: [withKnobs],
};

const PagerWrapper = ({ children }) => {
  const letters = [..."abcdefghijklmnopqrstuvwxyz"];
  const itemsPerPage = 3;
  const lastPage = Math.ceil(letters.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageItems, setPageItems] = useState(letters.slice(0, itemsPerPage));
  const handleClick = (page) => {
    action(`Clicked page ${page}`);
    setCurrentPage(page);
    const offset = (page - 1) * itemsPerPage; // page starts from 1
    const items = letters.slice(offset, offset + itemsPerPage);
    setPageItems(items);
  };

  return children({ onClick: handleClick, currentPage, lastPage, pageItems });
};

export const navOnly = () => {
  const pending = boolean("pending", false);
  return (
    <Pager
      onClick={action("Clicked on page")}
      currentPage={!pending ? number("Current page", 1) : null}
      lastPage={!pending ? number("Last page", 6) : null}
      maxNavPages={number("Max nav pages", 5)}
      pending={pending}
    />
  );
};

export const withPageItems = () => (
  <PagerWrapper>
    {({ pageItems, ...props }) => (
      <>
        <div>
          {pageItems.map((item, i) => (
            <p
              key={i}
              style={{ textAlign: "center", textTransform: "uppercase" }}
            >
              {item}
            </p>
          ))}
        </div>
        <Pager {...props} maxNavPages={number("Max nav pages", 5)} />
      </>
    )}
  </PagerWrapper>
);
