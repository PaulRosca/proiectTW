import { Container, ContentContainer } from "../styles/Global.style";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Header } from "../components/Header/Header.component";
import { SignOutButton } from "../components/Header/Header.styled";
import { useHistory } from "react-router-dom";
import { ProfileCard } from "../components/ProfileCard/ProfileCard.component";
import { AskedBy } from "../components/AskedBy/AskedBy.component";

const user = {
  username: "Scott Walton"
}


export const Profile = () => {
  const history = useHistory();
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Profile">
          <SignOutButton onClick={(e) => {localStorage.removeItem("user"); history.push(`/`)}}>Log out</SignOutButton>
        </Header>
        <ProfileCard user={user}/>
        <AskedBy user={user}></AskedBy>
      </ContentContainer>
    </Container>
  );
};
