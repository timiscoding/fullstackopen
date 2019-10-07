import PropTypes from "prop-types";

export const comments = PropTypes.arrayOf(
  PropTypes.shape({
    body: PropTypes.string.isRequired
  })
);

export const blog = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired
});
