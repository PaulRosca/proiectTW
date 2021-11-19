import { Icon } from "@iconify/react"
import { Container, Username } from "./ProfileCard.styled";


export const ProfileCard = ({user}) => {
    const { username } = user;
    return(<Container>
        <Icon icon="bx:bx-user" style={{"fontSize": "2rem"}}></Icon>
        <Username style={{marginLeft: "1rem"}}>{username}</Username>
    </Container>)
}