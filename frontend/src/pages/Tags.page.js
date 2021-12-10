import {
  Container,
  ContentContainer,
  PageDescription,
} from "../styles/Global.style";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Header } from "../components/Header/Header.component";
import { SearchBar } from "../components/SearchBar/SearchBar.component";
import { DetailedTags } from "../components/DetailedTags/DetailedTags.component";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const Tags = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const search = async (query) => {
    if (query === "" || query.length < 2) {
      const res = await axios.get(`http://localhost:9000/posts/hotTags`);
      setTags(res.data);
      setIsLoading(false);
    } else {
      const res = await axios.get(`http://localhost:9000/posts/tags`, {
        params: { search: query },
      });
      setTags(res.data);
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Tags">
          <SearchBar type="tag" search={search} />
        </Header>
        <PageDescription>
          Tags make finding and answering questions easeier
        </PageDescription>
        <DetailedTags tags={tags} isLoading={isLoading} />
      </ContentContainer>
    </Container>
  );
};
