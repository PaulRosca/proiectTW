import { Container, Content, CommentDetails } from "./Comment.styled"
import { Time, Username } from "../PostThumbnail/PostThumbnail.styled";
import { getTimeSince } from "../PostThumbnail/PostThumbnail.bl";
import { Icon } from "@iconify/react";

export const Comment = ({comment}) => {
    return(
        <Container>
            <Content>{comment.content}</Content>
            <CommentDetails>
                <Time>{getTimeSince(comment.timestamp)} ago</Time>
                <Username>{comment.createdBy}</Username>
                <Icon icon="bx:bx-user" style={{"fontSize": "3rem", margin: "1rem 0"}}></Icon>
            </CommentDetails>
        </Container>
    )
}