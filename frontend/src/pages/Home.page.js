import { NavBar } from "../components/Navbar/NavBar.component";
import { Posts } from "../components/Posts/Posts.component";
import { Container } from "../styles/Global.style";

export const Home = () => {
  return (
    <Container>
      <NavBar />
      <Posts />
    </Container>
  );
};
