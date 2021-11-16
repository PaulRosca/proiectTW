import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";
import { getShortContent, getTimeSince } from "./PostThumbnail.bl";
import { Container, PostContent, PostDetails, Title, Content, PostStats, Time, Username, TagPlace } from "./PostThumbnail.styled";
import { Stat } from "../Stat/Stat.component";

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
                <Time>Asked {getTimeSince(timestamp)} ago</Time>
                <Username>{createdBy.username}</Username>
                <Icon icon="bx:bx-user" style={{"fontSize": "3rem", "alignSelf":"center", "flex": "1"}}></Icon>
            </PostDetails>
            
        </Container>
    )
}
