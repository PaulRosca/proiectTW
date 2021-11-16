import { Comment } from "../Comment/Comment.component"
import { Container, Title } from "../CommentSection/CommentSection.styled";

export const CommentSection = ({comments}) => {
    return(
        <Container>
            <Title>Answers</Title>
        <div>
        {comments.map(comment => <Comment comment={comment} />)}
        </div>
        </Container>
    )
}