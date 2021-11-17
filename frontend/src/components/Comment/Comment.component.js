import { Container, Content, CommentDetails, ContentContainer } from "./Comment.styled"
import { Details } from "../Details/Details.component";
import { ReactToPost } from "../ReactToPost/ReactToPost.component";

export const Comment = ({comment}) => {
    return(
        <Container>
            <ContentContainer>
                <Content>{comment.content}</Content>
                <ReactToPost likes={comment.likes} dislikes={comment.dislikes} isForComment={true}/>
            </ContentContainer>
            <CommentDetails>
                <Details timestamp={comment.timestamp} createdBy={comment.createdBy} />
            </CommentDetails>
        </Container>
    )
}