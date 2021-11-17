import { PostContainer, PostContent, PostHeader, Title, PostDetails, FullContent } from "./FullPost.styled";
import { ReactToPost } from "../ReactToPost/ReactToPost.component";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";
import { Details } from "../Details/Details.component";

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
                <Details timestamp={timestamp} createdBy={createdBy}/>
            </PostDetails>
        </PostContainer>
    )
}