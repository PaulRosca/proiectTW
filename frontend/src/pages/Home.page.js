import { NavBar } from "../components/Navbar/NavBar.component";
import { Container, ContentContainer } from "../styles/Global.style";
import { Header } from "../components/Header/Header.component";
import { SearchBar } from "../components/SearchBar/SearchBar.component";
import { PostThumbnail } from "../components/PostThumbnail/PostThumbnail.component";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
export const Home = () => {
  const location = useLocation();
  const history = useHistory();
  const getPosts = () => {
    if (postsState.lastValue !== "same" && postsState.lastID !== "same") {
      console.log(postsState);
      axios
        .get(`http://localhost:9000/posts/getPosts`, {
          params: {
            lastValue: postsState.lastValue,
            lastID: postsState.lastID,
            tags: new URLSearchParams(location.search).get("tags"),
            sorting: new URLSearchParams(location.search).get("sorting"),
          },
        })
        .then(({ data }) => {
          setPostsState((state) => {
            return {
              ...state,
              posts: [...state.posts, ...data.posts],
              lastValue: data.lastValue,
              lastID: data.lastID,
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
    lastValue: undefined,
    lastID: undefined,
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
          <select
            value={
              new URLSearchParams(location.search).get("sorting") || "date:desc"
            }
            onChange={(e) => {
              history.push({
                pathname: "/",
                search: "?" + new URLSearchParams({ sorting: e.target.value }),
              });
              history.go(0);
            }}
            style={{ backgroundColor: "black" }}
          >
            <option value="date:asc">Date ascending</option>
            <option value="date:desc">Date descending</option>
            <option value="rating:asc">Rating ascending</option>
            <option value="rating:desc">Rating descending</option>
            <option value="views:asc">Views ascending</option>
            <option value="views:desc">Views descending</option>
            <option value="commentCount:asc">Comments ascending</option>
            <option value="commentCount:desc">Comments descending</option>
          </select>
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
