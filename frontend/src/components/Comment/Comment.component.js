import {
  Container,
  Content,
  CommentDetails,
  ContentContainer,
} from "./Comment.styled";
import { Details } from "../Details/Details.component";
import { ReactToPost } from "../ReactToPost/ReactToPost.component";

export const Comment = ({ comment, onLike, onDislike }) => {
  const handleLike = () => {
    onLike(comment._id);
  };
  const handleDislike = () => {
    onDislike(comment._id);
  };
  return (
    <Container>
      <ContentContainer>
        <Content>{comment.content}</Content>
        <ReactToPost
          likes={comment.likeCount}
          dislikes={comment.dislikeCount}
          isForComment={true}
          userLiked={comment.liked}
          userDisliked={comment.disliked}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      </ContentContainer>
      <CommentDetails>
        <Details timestamp={comment.createdAt} createdBy={comment.user} />
      </CommentDetails>
    </Container>
  );
};
