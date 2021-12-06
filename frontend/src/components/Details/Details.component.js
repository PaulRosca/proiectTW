import { Container, Time, Username } from "./Details.styled"
import { Icon } from "@iconify/react";
import { getTimeSince } from "./Details.bl";
import { NavLink } from "react-router-dom";
import ReactImageFallback  from 'react-image-fallback';

export const Details = ({ timestamp, createdBy }) => {
    const defaultImage = <Icon icon="bx:bx-user" style={{"fontSize": "2rem", "alignSelf":"center", "marginTop": ".2rem"}}></Icon>;
    return (
        <Container>
            <Time>Asked {getTimeSince(new Date(timestamp))} ago</Time>
            <NavLink 
                to={`/profile/${createdBy._id}`}
                style={{textDecoration: 'none', "alignSelf": "center"}}>
                    <Username>{createdBy.username}</Username>
            </NavLink>
            <ReactImageFallback
                src={`http://localhost:9000/profilePicture/user/${createdBy._id}`}
                fallbackImage={defaultImage}
                style={{width: '2rem', height: '2rem', alignSelf: 'center', objectFit: 'cover', borderRadius: '4px'}}
            />
        </Container>
    )
}
