import {
  Container,
  Content,
  CommentDetails,
  ContentContainer,
  DeleteComment,
} from "./Comment.styled";
import { Details } from "../Details/Details.component";
import { ReactToPost } from "../ReactToPost/ReactToPost.component";
import { useSelector } from "react-redux";

export const Comment = ({ comment, onLike, onDislike, onDelete }) => {
  const user = useSelector((state) => state.user);
  const handleLike = () => {
    onLike(comment._id);
  };
  const handleDislike = () => {
    onDislike(comment._id);
  };

  const handleDelete = (_id) => {
    onDelete(_id);
  }
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
        {user && user._id === comment.user._id && <DeleteComment onClick={e => handleDelete(comment._id)}>Delete comment</DeleteComment>}
      </ContentContainer>
      <CommentDetails>
        <Details timestamp={comment.createdAt} createdBy={comment.user} />
      </CommentDetails>
    </Container>
  );
};
