import { Container, ContentContainer } from "../styles/Global.style";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Header } from "../components/Header/Header.component";
import { SearchBar } from "../components/SearchBar/SearchBar.component";

export const Tags = () => {
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Tags">
          <SearchBar type="tag"/>
        </Header>
        <p>Tags</p>
      </ContentContainer>
    </Container>
  );
};
