import { ChildrenContainer, Container, Title } from "./Header.styled"

export const Header = (props) => {
    return(
        <Container>
            <Title>{props.title}</Title>
            <ChildrenContainer>{props.children}</ChildrenContainer>
        </Container>
    )
}