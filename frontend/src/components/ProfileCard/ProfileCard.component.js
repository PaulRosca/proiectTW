import { Icon } from "@iconify/react"
import { Container, Username } from "./ProfileCard.styled";
import ReactImageFallback from "react-image-fallback";

export const ProfileCard = ({user}) => {
    const { username } = user;
    const defaultImage = <Icon icon="bx:bx-user" style={{"fontSize": "3rem"}}></Icon>;
    return(<Container>
        <ReactImageFallback
                src={`http://localhost:9000/profilePicture/user/${user._id}`}
                fallbackImage={defaultImage}
                style={{width: '3rem', height: '3rem', alignSelf: 'center', objectFit: 'cover', 'borderRadius': '4px'}}
            />
        <Username style={{marginLeft: "1rem"}}>{username}</Username>
    </Container>)
}