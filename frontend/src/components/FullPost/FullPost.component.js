import { PostContainer, PostContent, PostHeader, Title, PostDetails, FullContent } from "./FullPost.styled";
import { ReactToPost } from "../ReactToPost/ReactToPost.component";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";
import { Time, Username } from "../PostThumbnail/PostThumbnail.styled";
import { Icon } from "@iconify/react";
import { getTimeSince } from "../PostThumbnail/PostThumbnail.bl";

export const FullPost = ({post}) => {
    const {id, title, content, tags, createdBy, stats, timestamp} = post;
    return (
        <PostContainer>
            <PostContent>
            <PostHeader>
                <Title>{title}</Title>
                <ReactToPost likes={stats.likes} dislikes={stats.dislikes}/> 
            </PostHeader>
            <FullContent>{content}</FullContent>
            <TagList>
                {tags.map(tag => <Tag name={tag}/>)}
            </TagList>
            </PostContent>
            <PostDetails>
                <Time>Asked {getTimeSince(timestamp)} ago</Time>
                <Username>{createdBy.username}</Username>
                <Icon icon="bx:bx-user" style={{"fontSize": "3rem", margin: "1rem 0"}}></Icon>
            </PostDetails>
        </PostContainer>
    )
}