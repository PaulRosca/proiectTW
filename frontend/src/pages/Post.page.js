import { Icon } from "@iconify/react";
import { useHistory } from "react-router";
import { Header } from "../components/Header/Header.component";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Container, ContentContainer } from "../styles/Global.style";
import { FullPost } from "../components/FullPost/FullPost.component";
import { CommentSection } from "../components/CommentSection/CommentSection.component";
import { AddComment } from "../components/AddComment/AddComment.component";
import { useEffect, useState } from "react";
import axios from "axios";

const post = {
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
  comments: [
    {
      content:
        "Yblablablablablablablablabldagsadgashsahsahdsaaaaaaaaaaaaaaaaaaaaaaaasdhashashsahashadgaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      createdBy: { username: "Scott Walton" },
      timestamp: new Date(1636654683618),
      likes: 2,
      dislikes: 0,
    },
    {
      content: "Yes its a comment as well",
      createdBy: { username: "Scott Walton" },
      timestamp: new Date(1636658683618),
      likes: 2,
      dislikes: 4,
    },
  ],
};

export const Post = (props) => {
  const [postState, setPostState] = useState({
    post: {},
    loading: true,
    error: false,
  });

  const likePost = () => {
    const id = props.match.params.id;
    axios
      .post(
        `http://localhost:9000/posts/likePost/${id}`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        setPostState((state) => {
          return {
            ...state,
            post: {
              ...state.post,
              likeCount: state.post.liked
                ? state.post.likeCount - 1
                : state.post.likeCount + 1,
              disliked: false,
              liked: !state.post.liked,
            },
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const dislikePost = () => {
    const id = props.match.params.id;
    axios
      .post(
        `http://localhost:9000/posts/dislikePost/${id}`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        setPostState((state) => {
          return {
            ...state,
            post: {
              ...state.post,
              dislikeCount: state.post.disliked
                ? state.post.dislikeCount - 1
                : state.post.dislikeCount + 1,
              liked: false,
              disliked: !state.post.disliked,
            },
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const history = useHistory();
  const getPost = () => {
    const id = props.match.params.id;
    setPostState((state) => {
      return {
        loading: true,
      };
    });
    axios
      .get(`http://localhost:9000/posts/getPost/${id}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setPostState((state) => {
          return {
            ...state,
            loading: false,
            error: false,
            post: data.post,
          };
        });
      })
      .catch((e) => {
        setPostState((state) => {
          return {
            ...state,
            loading: false,
            error: true,
          };
        });
      });
  };
  useEffect(() => {
    console.log(props.match.params.id);
    getPost();
  }, []);
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Post">
          <Icon
            icon="akar-icons:arrow-back-thick"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={(e) => history.goBack()}
          ></Icon>
        </Header>
        {postState.loading ? (
          <div>Loading ...</div>
        ) : (
          postState.post && (
            <FullPost
              post={postState.post}
              onLike={likePost}
              onDislike={dislikePost}
            ></FullPost>
          )
        )}
        <AddComment />
        <CommentSection comments={post.comments} />
      </ContentContainer>
    </Container>
  );
};
