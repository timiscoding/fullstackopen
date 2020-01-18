import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { clearFix } from "polished";
import { addComment, fetchComments } from "../../../actions";
import * as actionTypes from "../../../constants/actionTypes";
import * as selectors from "../../../reducers";
import CommentForm from "./CommentFormView";
import CommentList from "./CommentListView";
import Pager from "../../Pager";
import Dropdown from "../../Dropdown";

const SORT_OPTIONS = [
  { value: "createdAt-desc", title: "Sort by: Newest first" },
  { value: "createdAt-asc", title: "Sort by: Oldest first" }
];

const SORT_BY_NEWEST = SORT_OPTIONS[0].value;

const SortDropdown = styled(Dropdown)`
  --dd-width: 200px;
  float: right;
`;

const SortWrapper = styled.div`
  ${clearFix()}
`;

const CommentsContainer = ({
  isCommenting,
  isFetching,
  addComment,
  match,
  fetchComments,
  page,
  history,
  location
}) => {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page") || 1;
    const sort = params.get("sort") || SORT_BY_NEWEST;
    fetchComments({ blogId: match.params.id, page, sort });
  }, [fetchComments, match.params.id, location]);
  const handleComment = comment =>
    addComment(match.params.id, comment, history);
  const handleChange = (type, value) => {
    const params = new URLSearchParams(location.search);
    if (type === "page") {
      params.set("page", value);
    }
    if (type === "sort") {
      params.set("page", 1);
      params.set("sort", value);
    }
    history.push(`?${params}`);
  };
  const pending = isFetching || !page?.currentPage;
  return (
    <div>
      <h3>Comments</h3>
      <CommentForm onComment={handleComment} pending={isCommenting} />
      <SortWrapper>
        <SortDropdown
          options={SORT_OPTIONS}
          onChange={sort => handleChange("sort", sort)}
          defaultValue={
            new URLSearchParams(location.search).get("sort") || SORT_BY_NEWEST
          }
        />
      </SortWrapper>
      <CommentList comments={page?.items} pending={pending} />
      <Pager
        currentPage={page?.currentPage}
        lastPage={page?.lastPage}
        maxNavPages={6}
        onClick={page => handleChange("page", page)}
        pending={pending}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isCommenting: selectors.getPending(state, actionTypes.ADD_COMMENT_REQUEST),
  isFetching: selectors.getPending(state, actionTypes.FETCH_COMMENTS_REQUEST),
  page: selectors.getPage(state, actionTypes.FETCH_COMMENTS_REQUEST)
});

export default connect(mapStateToProps, { addComment, fetchComments })(
  withRouter(CommentsContainer)
);
