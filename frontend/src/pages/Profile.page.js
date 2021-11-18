import { Container, ContentContainer } from "../styles/Global.style";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Header } from "../components/Header/Header.component";
import { SignOutButton } from "../components/Header/Header.styled";
import { useHistory } from "react-router-dom";

export const Profile = () => {
  const history = useHistory();
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Profile">
          <SignOutButton onClick={(e) => {localStorage.removeItem("user"); history.push(`/`)}}>Log out</SignOutButton>
        </Header>
        <p>Profile id: {useParams().id}</p>
      </ContentContainer>
    </Container>
  );
};
