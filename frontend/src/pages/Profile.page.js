import { Container } from "../styles/Global.style";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar/NavBar.component";

export const Profile = () => {
  return (
    <Container>
      <NavBar />
      <p>Profile id: {useParams().id}</p>
    </Container>
  );
};
