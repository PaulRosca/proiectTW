import { NavLink } from "react-router-dom";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";
import { Container, PostContent, PostDetails, Title, Content, PostStats, TagPlace } from "./PostThumbnail.styled";
import { Stat } from "../Stat/Stat.component";
import { Details } from "../Details/Details.component";

export const PostThumbnail = ({post}) => {
    const {id, title, content, tags, createdBy, views,likeCount,dislikeCount, createdAt, commentCount} = post;
    return(
        <Container>
            <PostContent>
                <Title>
                    <NavLink to={`/post/${id}`} style={{"textDecoration": "none"}}>{title}</NavLink>
                </Title>
                <Content>{content}</Content>
                <TagPlace>
                <TagList>
                {tags.map(tag => <Tag name={tag.content}/>)}
                </TagList>
                </TagPlace>
            </PostContent>
            <PostDetails>
                <PostStats>
                    <Stat value={views} string={`view`} />
                    <Stat value={commentCount} string={`answer`}/>
                    <Stat value={likeCount - dislikeCount} string={"vote"}/>
                </PostStats>
                <Details timestamp={createdAt} createdBy={createdBy} />
            </PostDetails>
            
        </Container>
    )
}
