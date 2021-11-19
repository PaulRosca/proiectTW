import { NavBar } from "../components/Navbar/NavBar.component";
import { Container, ContentContainer } from "../styles/Global.style";
import { Header } from "../components/Header/Header.component";
import { SearchBar } from "../components/SearchBar/SearchBar.component";
import { PostThumbnail } from "../components/PostThumbnail/PostThumbnail.component";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const getPosts = () => {
    if (postsState.lastPostID !== "same") {
      axios
        .get(
          `http://localhost:9000/posts/getPosts?postID=${postsState.lastPostID}`
        )
        .then(({ data }) => {
          setPostsState((state) => {
            return {
              ...state,
              posts: [...state.posts, ...data.posts],
              lastPostID: data.lastPostID,
              error: false,
              loading: false,
            };
          });
        })
        .catch((e) => {
          setPostsState((state) => {
            return {
              ...state,
              error: true,
              loading: false,
            };
          });
        });
    }
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      getPosts();
    }
  };

  const [postsState, setPostsState] = useState({
    posts: [],
    loading: false,
    error: false,
    lastPostID: undefined,
    hasMore: true,
  });
  useEffect(() => {
    setPostsState((state) => {
      return {
        ...state,
        loading: true,
      };
    });
    getPosts();
  }, []);
  return (
    <Container>
      <NavBar />
      <ContentContainer onScroll={handleScroll}>
        <Header title="Home">
          <SearchBar type="question" />
        </Header>
        {postsState.posts.map((post) => (
          <PostThumbnail post={post} key={post._id}></PostThumbnail>
        ))}
        {postsState.loading ? <div>Loading ...</div> : null}
      </ContentContainer>
    </Container>
  );
};
