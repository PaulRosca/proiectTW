import { Container, ContentContainer } from "../styles/Global.style";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Header } from "../components/Header/Header.component";

export const Ask = () => {
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Ask a question">
        </Header>
        <p>Ask</p>
      </ContentContainer>
     
    </Container>
  );
};
