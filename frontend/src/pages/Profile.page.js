import { Container, ContentContainer } from "../styles/Global.style";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Header } from "../components/Header/Header.component";

export const Profile = () => {
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Profile">
          <button>Log out</button>
        </Header>
        <p>Profile id: {useParams().id}</p>
      </ContentContainer>
      
    </Container>
  );
};
