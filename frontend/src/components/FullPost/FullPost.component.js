import {
  PostContainer,
  PostContent,
  PostHeader,
  Title,
  PostDetails,
  FullContent,
} from "./FullPost.styled";
import { ReactToPost } from "../ReactToPost/ReactToPost.component";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";
import { Details } from "../Details/Details.component";

export const FullPost = ({ post, onLike, onDislike }) => {
  const {
    _id,
    title,
    content,
    tags,
    createdBy,
    likeCount,
    dislikeCount,
    createdAt,
    liked,
    disliked,
  } = post;
  return (
    <PostContainer>
      <PostContent>
        <PostHeader>
          <Title>{title}</Title>
          <ReactToPost
            likes={likeCount}
            dislikes={dislikeCount}
            userLiked={liked}
            userDisliked={disliked}
            onLike={onLike}
            onDislike={onDislike}
          />
        </PostHeader>
        <FullContent>{content}</FullContent>
        <TagList>
          {tags.map((tag) => (
            <Tag name={tag.content} />
          ))}
        </TagList>
      </PostContent>
      <PostDetails>
        <Details timestamp={createdAt} createdBy={createdBy} />
      </PostDetails>
    </PostContainer>
  );
};
