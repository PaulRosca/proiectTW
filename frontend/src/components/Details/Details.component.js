import { Container, Time, Username } from "./Details.styled"
import { Icon } from "@iconify/react";
import { getTimeSince } from "./Details.bl";
import { NavLink } from "react-router-dom";

export const Details = ({ timestamp, createdBy }) => {
    return (
        <Container>
            <Time>Asked {getTimeSince(new Date(timestamp))} ago</Time>
            <NavLink 
                to={`/profile/${createdBy._id}`}
                style={{textDecoration: 'none', "alignSelf": "center"}}>
                    <Username>{createdBy.username}</Username>
            </NavLink>

            <Icon icon="bx:bx-user" style={{"fontSize": "2rem", "alignSelf":"center", "marginTop": ".2rem"}}></Icon>
        </Container>
    )
}
