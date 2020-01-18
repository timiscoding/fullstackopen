const blogItemHeight = 50;

const StyledBlogItemSkeleton = styled.li`
  list-style-type: none;
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.grey};
  }

  &:empty:before {
    --blog-item-height: ${blogItemHeight}px;
    --blog-item-padding: 5px;
    --element-color: ${({ theme }) => theme.greyLight};
    --text-padding: 10px;

    --likes-height: 40px;
    --likes-width: 40px;
    --likes-position: var(--blog-item-padding) var(--blog-item-padding);
    --likes-skeleton: linear-gradient(
      var(--element-color) var(--likes-height),
      transparent 0
    );

    --title-height: 20px;
    --title-width: calc(75% - var(--likes-width) - var(--text-padding));
    --title-position: calc(
        var(--blog-item-padding) + var(--likes-width) + var(--text-padding)
      )
      var(--blog-item-padding);
    --title-skeleton: linear-gradient(
      var(--element-color) var(--title-height),
      transparent 0
    );

    --author-height: 15px;
    --author-width: calc(50% - var(--likes-width) - var(--text-padding));
    --author-position: calc(
        var(--blog-item-padding) + var(--likes-width) + var(--text-padding)
      )
      calc(var(--blog-item-padding) + var(--title-height) + 2px);
    --author-skeleton: linear-gradient(
      var(--element-color) var(--author-height),
      transparent 0
    );

    content: "";
    display: block;
    height: var(--blog-item-height);
    background-color: white;
    background-image: var(--likes-skeleton), var(--title-skeleton),
      var(--author-skeleton);
    background-size: var(--likes-width) var(--likes-height),
      var(--title-width) var(--title-height),
      var(--author-width) var(--author-height);
    background-position: var(--likes-position), var(--title-position),
      var(--author-position);
    background-origin: content-box;
    background-repeat: no-repeat;
  }
`;

const BlogItemSkeleton = ({ children, pending }) => {
  return (
    <StyledBlogItemSkeleton>{pending ? null : children}</StyledBlogItemSkeleton>
  );
};

export default BlogItemSkeleton;
