import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addComment, fetchComments } from "../../../actions";
import * as actionTypes from "../../../constants/actionTypes";
import * as selectors from "../../../reducers";
import CommentForm from "./CommentFormView";
import CommentList from "./CommentListView";
import Pager from "../../Pager";
import AddIcon from "../../../icons/add.svg";
import {
  Heading,
  Actions,
  SortDropdown,
  Toggleable
} from "./styled/CommentsContainer";

const SORT_OPTIONS = [
  { value: "createdAt-desc", title: "By newest first" },
  { value: "createdAt-asc", title: "By oldest First" }
];

const SORT_BY_NEWEST = SORT_OPTIONS[0].value;

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
  const commentFormRef = useRef();
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
      <Heading>Comments</Heading>
      <Actions>
        <SortDropdown
          options={SORT_OPTIONS}
          onChange={sort => handleChange("sort", sort)}
          defaultValue={
            new URLSearchParams(location.search).get("sort") || SORT_BY_NEWEST
          }
        />
        <Toggleable
          buttonLabel="Add comment"
          buttonIcon={AddIcon}
          ref={commentFormRef}
        >
          <CommentForm onComment={handleComment} pending={isCommenting} />
        </Toggleable>
      </Actions>
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
