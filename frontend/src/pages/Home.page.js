import { NavBar } from "../components/Navbar/NavBar.component";
import { Posts } from "../components/Posts/Posts.component";
import { Container, ContentContainer } from "../styles/Global.style";
import { Header } from "../components/Header/Header.component";
import { SearchBar } from "../components/SearchBar/SearchBar.component";

export const Home = () => {
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Home">
          <SearchBar type="question"/>
        </Header>
        <Posts />
      </ContentContainer>
    </Container>
  );
};
