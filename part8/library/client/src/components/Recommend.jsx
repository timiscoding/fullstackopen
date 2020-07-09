import React from "react";
import { useQuery } from "@apollo/client";

import { Loading, BookList } from "./";
import { RECOMMEND } from "../queries";

export const Recommend = ({ show }) => {
  const { data, loading } = useQuery(RECOMMEND);

  if (!show) {
    return null;
  }

  if (loading) {
    return <Loading pageName="Recommendations" />;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre: {data.me.favoriteGenre}</p>
      <BookList books={data.recommend} />
    </div>
  );
};
