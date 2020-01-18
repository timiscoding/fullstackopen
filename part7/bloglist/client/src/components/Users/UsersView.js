import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ellipsis } from "polished";
import Skeleton from "react-loading-skeleton";

const border = css`1px solid ${({ theme }) => theme.grey};`;

const BaseRow = styled.li`
  display: grid;
  grid-template-columns: minmax(100px, 20%) minmax(100px, 20%) 1fr;
  list-style-type: none;
  border-top: ${border}
  border-left: ${border}
  & > div {
    border-right: ${border};
    border-bottom: ${border};
    padding: 2px 5px;
  }
`;

const Row = styled(BaseRow)`
  &:first-child {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.fontLight};
  }
  &:nth-child(2n + 3) {
    background-color: ${({ theme }) => theme.primaryLighter};
  }
  &:nth-child(n + 2):hover {
    background-color: ${({ theme }) => theme.secondary};
    cursor: pointer;
  }
`;

const Table = styled.ul`
  margin: 0;
  padding: 0;
`;

const Name = styled.div`
  ${ellipsis("100%")}
`;

const SkeletonRow = styled(BaseRow)`
  &:first-child {
    background-color: ${({ theme }) => theme.greyDark};
  }
`;

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
  if (!pending && users.length === 0) {
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
  )
};

export default UsersView;
