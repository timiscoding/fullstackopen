import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ellipsis } from "polished";
import Skeleton from "react-loading-skeleton";
import { ReactComponent as SortUpIcon } from "../../icons/triangle-up.svg";
import { ReactComponent as SortDownIcon } from "../../icons/triangle-down.svg";

const border = css`1px solid ${({ theme }) => theme.grey};`;

const BaseRow = styled.li`
  display: grid;
  grid-template-columns: minmax(100px, 20%) 1fr;
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

const StyledSortUpIcon = styled(SortUpIcon)`
  width: 1em;
  height: 1em;
  fill: ${({ theme }) => theme.secondary};
  vertical-align: sub;
`;

const Name = styled.div`
  ${ellipsis("100%")}
`;

const SortLinks = ({ name }) => {
  return (
    <>
      <Link to={{ search: `?sort[${name}]=asc` }}>
        <StyledSortUpIcon />
      </Link>{" "}
      <Link to={{ search: `?sort[${name}]=desc` }}>
        <StyledSortUpIcon as={SortDownIcon} />
      </Link>
    </>
  );
};

const SkeletonRow = styled(BaseRow)`
  &:first-child {
    background-color: ${({ theme }) => theme.greyDark};
  }
`;

const TableSkeleton = () => {
  return (
    <div>
      {Array(10)
        .fill(Array(2).fill())
        .map((cols, i) => (
          <SkeletonRow key={i}>
            {cols.map((_, j) => (
              <div key={j}>
                <Skeleton />
              </div>
            ))}
          </SkeletonRow>
        ))}
    </div>
  );
};

const UsersView = ({ users, onUserClick }) => {
  if (!users) {
    return <TableSkeleton />;
  }

  return (
    <section>
      <Table>
        <Row>
          <div>
            Name <SortLinks name="name" />
          </div>
          <div>
            Blogs created <SortLinks name="blogCount" />
          </div>
        </Row>
        {users.map(({ id, blogs, name }) => (
          <Row key={id} onClick={() => onUserClick(id)}>
            <Name>{name}</Name>
            <div>{blogs.length}</div>
          </Row>
        ))}
      </Table>
    </section>
  );
};

UsersView.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      blogs: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  )
};

export default UsersView;
