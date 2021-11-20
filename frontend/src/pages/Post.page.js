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
import { useSelector } from "react-redux";

export const Post = (props) => {
  const user = useSelector(state => state.user);
  const [postState, setPostState] = useState({
    post: {},
    loading: true,
    error: false,
  });
  const [commentsState, setCommentsState] = useState({
    comments: [],
    loading: true,
    error: false,
    lastCommentID: undefined,
  });

  const likeComment = (commentID) => {
    axios
      .post(
        `http://localhost:9000/posts/likeComment/${commentID}`,
        {},
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        setCommentsState((state) => {
          return {
            ...state,
            comments: state.comments.map((comment) => {
              if (comment._id === commentID) {
                const updatedComment = {
                  ...comment,
                  likeCount: comment.liked
                    ? comment.likeCount - 1
                    : comment.likeCount + 1,
                  dislikeCount: comment.disliked
                    ? comment.dislikeCount - 1
                    : comment.dislikeCount,
                  liked: !comment.liked,
                  disliked: false,
                };
                return updatedComment;
              }
              return comment;
            }),
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const dislikeComment = (commentID) => {
    axios
      .post(
        `http://localhost:9000/posts/dislikeComment/${commentID}`,
        {},
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        setCommentsState((state) => {
          return {
            ...state,
            comments: state.comments.map((comment) => {
              if (comment._id === commentID) {
                const updatedComment = {
                  ...comment,
                  dislikeCount: comment.disliked
                    ? comment.dislikeCount - 1
                    : comment.dislikeCount + 1,
                  likeCount: comment.liked
                    ? comment.likeCount - 1
                    : comment.likeCount,
                  disliked: !comment.disliked,
                  liked: false,
                };
                return updatedComment;
              }
              return comment;
            }),
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
              dislikeCount: state.post.disliked
                ? state.post.dislikeCount - 1
                : state.post.dislikeCount,
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
              likeCount: state.post.liked
                ? state.post.likeCount - 1
                : state.post.likeCount,
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
  const getComments = () => {
    if (commentsState.lastCommentID !== "same") {
      const id = props.match.params.id;
      setCommentsState((state) => {
        return {
          ...state,
          loading: true,
        };
      });

      axios
        .get(
          `http://localhost:9000/posts/getPost/${id}/comments?commentID=${commentsState.lastCommentID}`,
          {
            withCredentials: true,
          }
        )
        .then(({ data }) => {
          setCommentsState((state) => {
            return {
              ...state,
              loading: false,
              error: false,
              comments: [...state.comments, ...data.comments],
              lastCommentID: data.lastCommentID,
            };
          });
        })
        .catch(() => {
          setCommentsState((state) => {
            return {
              ...state,
              loading: false,
              error: true,
            };
          });
        });
    }
  };

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
    getComments();
  }, []);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      getComments();
    }
  };

  const addComment = (content) => {
    const id = props.match.params.id;
    axios
      .post(
        `http://localhost:9000/posts/addComment/${id}`,
        { content },
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        setCommentsState((state) => {
          return {
            ...state,
            comments: [data.comment, ...state.comments],
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <NavBar />
      <ContentContainer onScroll={handleScroll}>
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
        {user && 
        <AddComment addComment={addComment} />}
        <CommentSection
          comments={commentsState.comments}
          likeComment={likeComment}
          dislikeComment={dislikeComment}
          loading={commentsState.loading}
        />
      </ContentContainer>
    </Container>
  );
};
