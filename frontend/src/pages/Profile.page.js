import { Container, ContentContainer } from "../styles/Global.style";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Header } from "../components/Header/Header.component";
import { SignOutButton } from "../components/Header/Header.styled";
import { useHistory } from "react-router-dom";
import { ProfileCard } from "../components/ProfileCard/ProfileCard.component";
import { AskedBy } from "../components/AskedBy/AskedBy.component";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import axios from "axios";

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const history = useHistory();
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Profile">
          <SignOutButton onClick={(e) => {
          localStorage.removeItem("user");
          dispatch(logout()); 
          history.push(`/`);
          axios.get(
        "http://localhost:9000/user/logout",
        { withCredentials: true }).then(res => {    
          });
         }}>Log out</SignOutButton>
        </Header>
        <ProfileCard user={user}/>
        <AskedBy user={user}></AskedBy>
      </ContentContainer>
    </Container>
  );
};
