import { Icon } from "@iconify/react";
import { Tag } from "../Tag/Tag.component";
import { getShortContent, getCorrectFormOfNounBasedOnValue, getTimeSince } from "./PostThumbnail.bl";
import { Container, PostContent, PostDetails, Title, Content, Tags, PostStats, StatValue, StatName, Stat, Time, Username } from "./PostThumbnail.styled";

export const PostThumbnail = ({post}) => {
    const {id, title, content, tags, createdBy, stats, timestamp} = post;
    return(
        <Container>
            <PostContent>
                <Title>{title}</Title>
                <Content>{getShortContent(content, 490)}</Content>
                <Tags>
                {tags.map(tag => <Tag name={tag} />)}
                </Tags>
            </PostContent>
            <PostDetails>
                <PostStats>
                    <Stat>
                    <StatValue>{stats.views}</StatValue>
                    <StatName>{getCorrectFormOfNounBasedOnValue('view', stats.views)}</StatName>
                    </Stat>
                    <Stat>
                    <StatValue>{stats.answers}</StatValue>
                    <StatName>{getCorrectFormOfNounBasedOnValue('answer', stats.answers)}</StatName>
                    </Stat>
                    <Stat>
                    <StatValue>{stats.likes - stats.dislikes}</StatValue>
                    <StatName>{getCorrectFormOfNounBasedOnValue("vote", stats.likes - stats.dislikes)}</StatName>
                    </Stat>
                </PostStats>
                <Time>Asked {getTimeSince(timestamp)} ago</Time>
                <Username>{createdBy.username}</Username>
                <Icon icon="bx:bx-user" style={{"fontSize": "3rem", "alignSelf":"center", "flex": "1"}}></Icon>
            </PostDetails>
            
        </Container>
    )
}
