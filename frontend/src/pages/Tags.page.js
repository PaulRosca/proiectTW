import { Container, ContentContainer, PageDescription } from "../styles/Global.style";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Header } from "../components/Header/Header.component";
import { SearchBar } from "../components/SearchBar/SearchBar.component";
import { DetailedTags } from "../components/DetailedTags/DetailedTags.component";

export const Tags = () => {
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Tags">
          <SearchBar type="tag"/>
        </Header>
        <PageDescription>Tags make finding and answering questions easeier</PageDescription>
        <DetailedTags />
      </ContentContainer>
    </Container>
  );
};
