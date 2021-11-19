import { NavBar } from "../components/Navbar/NavBar.component";
import { Container, ContentContainer } from "../styles/Global.style";
import { Header } from "../components/Header/Header.component";
import { SearchBar } from "../components/SearchBar/SearchBar.component";
import { PostThumbnail } from "../components/PostThumbnail/PostThumbnail.component";
import { useEffect, useState } from "react";
import axios from "axios";

/*
const posts = [
  {
    id: 1,
    title: "How to reverse a binary tree?",
    content:
      "I aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsasdgashashdashdas",
    tags: ["JavaScript", "Binary tree", "ASD"],
    createdBy: {
      username: "Jimmy Jones",
    },
    stats: {
      views: 2,
      answers: 0,
      likes: 15,
      dislikes: 14,
    },
    timestamp: new Date(1637003895118),
  },
  {
    id: 2,
    title:
      "Yoyoyoyoyo?YoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?",
    content:
      "I aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaIaasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsasdgashashdashdas I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this",
    tags: [
      "JavaScript",
      "Binary tree",
      "ASD",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
    ],
    createdBy: {
      username: "Jimmy Jones",
    },
    stats: {
      views: 2,
      answers: 0,
      likes: 18,
      dislikes: 14,
    },
    timestamp: new Date(1636654483618),
  },
  {
    id: 3,
    title:
      "Yoyoyoyoyo?YoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?",
    content:
      "I aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaIaasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsasdgashashdashdas I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this",
    tags: [
      "JavaScript",
      "Binary tree",
      "ASD",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
    ],
    createdBy: {
      username: "Jimmy Jones",
    },
    stats: {
      views: 1,
      answers: 1,
      likes: 14,
      dislikes: 14,
    },
    timestamp: new Date(1636654483618),
  },
  {
    id: 4,
    title:
      "Yoyoyoyoyo?YoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?",
    content:
      "I aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaIaasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsasdgashashdashdas I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this",
    tags: [
      "JavaScript",
      "Binary tree",
      "ASD",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
      "Tag1",
    ],
    createdBy: {
      username: "Jimmy Jones",
    },
    stats: {
      views: 2,
      answers: 5,
      likes: 15,
      dislikes: 14,
    },
    timestamp: new Date(1636654483618),
  },
];
*/

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
