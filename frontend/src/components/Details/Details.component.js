import { Container, Time, Username } from "./Details.styled"
import { Icon } from "@iconify/react";
import { getTimeSince } from "./Details.bl";

export const Details = ({ timestamp, createdBy }) => {
    return (
        <Container>
            <Time>Asked {getTimeSince(new Date(timestamp))} ago</Time>
            <Username>{createdBy.username}</Username>
            <Icon icon="bx:bx-user" style={{"fontSize": "2rem", "alignSelf":"center", "marginTop": ".2rem"}}></Icon>
        </Container>
    )
}
