import { Comment } from "../Comment/Comment.component";
import { Container, Title } from "../CommentSection/CommentSection.styled";

export const CommentSection = ({
  comments,
  likeComment,
  dislikeComment,
  loading,
}) => {
  return (
    <Container>
      <Title>Answers</Title>
      <div>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            onLike={likeComment}
            onDislike={dislikeComment}
            key={comment._id}
          />
        ))}
      </div>
      {loading ? <div>Loading ...</div> : null}
    </Container>
  );
};
