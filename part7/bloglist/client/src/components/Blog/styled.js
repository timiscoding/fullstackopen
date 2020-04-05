import styled from "styled-components/macro";
import { ellipsis } from "polished";
import Button, { LikeButton as LikeButtonBase } from "../Button";
import { styling } from "../../constants";
import { ReactComponent as LinkGlyph } from "../../icons/link.svg";
import { ReactComponent as GarbageGlyph } from "../../icons/garbage.svg";
import { ReactComponent as CircleGlyph } from "../../icons/filled-circle.svg";
import { ReactComponent as CommentGlyph } from "../../icons/message.svg";

export const Likes = styled.div`
  margin-right: 10px;
  font-size: 1.3rem;
  text-align: center;
  font-weight: 400;
  width: 3rem;
  display: inline-block;
`;

export const BlogInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LinkIcon = styled(LinkGlyph)`
  width: 1rem;
  height: 1rem;
  margin-right: 5px;
  vertical-align: middle;
  fill: ${({ theme }) => theme.primaryDark};
`;

export const GarbageIcon = styled(GarbageGlyph)`
  width: 1rem;
  height: 1rem;
  fill: #fff;
`;

export const CircleIcon = styled(CircleGlyph)`
  width: 0.5em;
  height: 0.5em;
  vertical-align: middle;
  fill: ${({ theme }) => theme.greyLight};
  margin: 0 7px;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.2;
  text-transform: capitalize;
  ${styling.mobile(`
    font-weight: 550;
    font-size: 1.1rem;
  `)}
`;

export const Author = styled.div`
  margin-top: 5px;
  font-weight: 450;
  min-width: 100%;
  text-transform: capitalize;
  &:before {
    content: "by ";
  }
`;

export const Metadata = styled.span`
  color: ${({ theme }) => theme.fontDark};
  font-size: 0.8rem;
  margin-top: 5px;
`;

export const BlogLink = styled.a`
  ${ellipsis("100%")};
`;

export const DeleteButton = styled(Button)`
  align-self: start;
`;

export const Wrapper = styled.div`
  position: relative;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.primaryLighter};
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.25);
`;

export const CommentIcon = styled(CommentGlyph)`
  height: 0.8em;
  width: 0.8em;
  fill: ${({ theme }) => theme.greenDark};
  margin-left: 5px;
`;

export const Creator = styled.span`
  &:before {
    content: "Added by ";
  }
`;

export const BlogWrapper = styled.div`
  display: flex;
`;

export const Time = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.1rem;
`;

export const LikeButton = styled(LikeButtonBase)`
  margin-top: 5px;
`;
