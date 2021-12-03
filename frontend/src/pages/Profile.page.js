import { Container, ContentContainer } from "../styles/Global.style";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar/NavBar.component";
import { Header } from "../components/Header/Header.component";
import { SignOutButton } from "../components/Header/Header.styled";
import { useHistory } from "react-router-dom";
import { ProfileCard } from "../components/ProfileCard/ProfileCard.component";
import { AskedBy } from "../components/AskedBy/AskedBy.component";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log("bottom");

      getUserPosts();
    }
  };
  const getUserPosts = () => {
    if (postsState.lastPostID !== "same") {
      axios
        .get(`http://localhost:9000/posts/getPosts`, {
          params: {
            postID: postsState.lastPostID,
            createdBy: user._id,
          },
        })
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
    getUserPosts();
  }, []);
  return (
    <Container>
      <NavBar />
      <ContentContainer onScroll={handleScroll}>
        <Header title="Profile">
          <SignOutButton
            onClick={(e) => {
              localStorage.removeItem("user");
              dispatch(logout());
              history.push(`/`);
              axios
                .get("http://localhost:9000/user/logout", {
                  withCredentials: true,
                })
                .then((res) => {});
            }}
          >
            Log out
          </SignOutButton>
        </Header>
        <ProfileCard user={user} />
        <AskedBy user={user} postsState={postsState}></AskedBy>
      </ContentContainer>
    </Container>
  );
};
