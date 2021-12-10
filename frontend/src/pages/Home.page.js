import { NavBar } from "../components/Navbar/NavBar.component";
import { Container, ContentContainer } from "../styles/Global.style";
import { Header } from "../components/Header/Header.component";
import { SearchBar } from "../components/SearchBar/SearchBar.component";
import { PostThumbnail } from "../components/PostThumbnail/PostThumbnail.component";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Filter } from "../components/Filter/Filter.component";
export const Home = () => {
  const location = useLocation();
  const history = useHistory();

  const getPosts = () => {
    if (postsState.lastValue !== "same" && postsState.lastID !== "same") {
      axios
        .get(`http://localhost:9000/posts/getPosts`, {
          params: {
            lastValue: postsState.lastValue,
            lastID: postsState.lastID,
            tags: new URLSearchParams(location.search).get("tags"),
            sorting: new URLSearchParams(location.search).get("sorting"),
            search: new URLSearchParams(location.search).get("search"),
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

  const reloadPosts = () => {
    axios
      .get(`http://localhost:9000/posts/getPosts`, {
        params: {
          tags: new URLSearchParams(location.search).get("tags"),
          sorting: new URLSearchParams(location.search).get("sorting"),
          search: new URLSearchParams(location.search).get("search"),
        },
      })
      .then(({ data }) => {
        setPostsState((state) => {
          return {
            ...state,
            posts: [...data.posts],
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
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      getPosts();
    }
  };
  const initialPostsState = {
    posts: [],
    loading: false,
    error: false,
    lastValue: undefined,
    lastID: undefined,
    hasMore: true,
  };
  const [postsState, setPostsState] = useState(initialPostsState);
  useEffect(() => {
    setPostsState((state) => {
      return {
        ...state,
        loading: true,
      };
    });
    getPosts();
  }, []);
  useEffect(() => {
    reloadPosts();
  }, [location.search]);
  const search = (query) => {
    console.log(location.search);
    const tags = new URLSearchParams(location.search).get("tags");
    const sorting = new URLSearchParams(location.search).get("sorting");
    let paramObj = { search: query };
    if (tags) {
      paramObj.tags = tags;
    }
    if (sorting) {
      paramObj.sorting = sorting;
    }
    history.push({
      pathname: "/",
      search: "?" + new URLSearchParams(paramObj),
    });
  };
  return (
    <Container>
      <NavBar />
      <ContentContainer onScroll={handleScroll}>
        <Header title="Home">
          
          <SearchBar type="question" search={search} />
        </Header>
        <Filter />
        {postsState.posts.map((post) => (
          <PostThumbnail post={post} key={post._id}></PostThumbnail>
        ))}
        {postsState.loading ? <div>Loading ...</div> : null}
      </ContentContainer>
    </Container>
  );
};
