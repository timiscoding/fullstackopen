import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Table, SkeletonRow, Row, Name } from "./styled";

const TableSkeleton = ({ className }) => (
  <Table className={className}>
    {Array(10)
      .fill(Array(3).fill())
      .map((cols, i) => (
        <SkeletonRow key={i}>
          {cols.map((_, j) => (
            <div key={j}>
              <Skeleton width="50%" />
            </div>
          ))}
        </SkeletonRow>
      ))}
  </Table>
);

const UsersView = ({ users, onUserClick, pending, className }) => {
  if (pending) {
    return <TableSkeleton className={className} />;
  }
  if (!pending && users?.length === 0) {
    return <p>No users yet</p>;
  }
  return (
    <Table className={className}>
      <Row>
        <div>Username</div>
        <div>Name</div>
        <div>Total Blogs</div>
      </Row>
      {users.map(({ id, blogCount, name, username }) => (
        <Row key={id} onClick={() => onUserClick(id)}>
          <Name>{username}</Name>
          <Name>{name}</Name>
          <div>{blogCount}</div>
        </Row>
      ))}
    </Table>
  );
};

UsersView.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      blogCount: PropTypes.number.isRequired
    })
  ),
  onUserClick: PropTypes.func,
  pending: PropTypes.bool
};

export default UsersView;
