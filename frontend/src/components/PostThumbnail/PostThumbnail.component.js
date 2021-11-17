import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";
import { getShortContent } from "./PostThumbnail.bl";
import { Container, PostContent, PostDetails, Title, Content, PostStats, TagPlace } from "./PostThumbnail.styled";
import { Stat } from "../Stat/Stat.component";
import { Details } from "../Details/Details.component";

export const PostThumbnail = ({post}) => {
    const {id, title, content, tags, createdBy, stats, timestamp} = post;
    return(
        <Container>
            <PostContent>
                <Title>
                    <NavLink to={`/post/${id}`} style={{"textDecoration": "none"}}>{title}</NavLink>
                </Title>
                <Content>{getShortContent(content, 490)}</Content>
                <TagPlace>
                <TagList>
                {tags.map(tag => <Tag name={tag}/>)}
                </TagList>
                </TagPlace>
            </PostContent>
            <PostDetails>
                <PostStats>
                    <Stat value={stats.views} string={`view`} />
                    <Stat value={stats.answers} string={`answer`}/>
                    <Stat value={stats.likes - stats.dislikes} string={"vote"}/>
                </PostStats>
                <Details timestamp={timestamp} createdBy={createdBy} />
            </PostDetails>
            
        </Container>
    )
}
