import { Container } from "./ReactToPost.styled";
import { Icon } from "@iconify/react";
import { Stat } from "../Stat/Stat.component";

export const ReactToPost = ({
  likes,
  dislikes,
  isForComment,
  userLiked,
  userDisliked,
  onLike,
  onDislike,
}) => {
  return (
    <div>
      {isForComment && (
        <Container>
          <Icon
            icon="ant-design:dislike-outlined"
            onClick={onDislike}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              "margin-right": "1rem",
              filter: userDisliked
                ? "invert(41%) sepia(45%) saturate(7056%) hue-rotate(340deg) brightness(102%) contrast(101%)"
                : "none",
            }}
          ></Icon>
          <Stat value={likes - dislikes} string={"vote"} />
          <Icon
            icon="ant-design:like-outlined"
            onClick={onLike}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              margin: "0 1rem",
              filter: userLiked
                ? "invert(63%) sepia(55%) saturate(371%) hue-rotate(100deg) brightness(90%) contrast(87%)"
                : "none",
            }}
          ></Icon>
        </Container>
      )}
      {!isForComment && (
        <Container>
          <Icon
            icon="ant-design:dislike-outlined"
            onClick={onDislike}
            style={{
              cursor: "pointer",
              fontSize: "2rem",
              "margin-right": "1rem",
              filter: userDisliked
                ? "invert(41%) sepia(45%) saturate(7056%) hue-rotate(340deg) brightness(102%) contrast(101%)"
                : "none",
            }}
            value={userLiked ? "liked" : ""}
          ></Icon>
          <Stat value={likes - dislikes} string={"vote"} />
          <Icon
            icon="ant-design:like-outlined"
            onClick={onLike}
            style={{
              cursor: "pointer",
              fontSize: "2rem",
              margin: "0 1rem",
              filter: userLiked
                ? "invert(63%) sepia(55%) saturate(371%) hue-rotate(100deg) brightness(90%) contrast(87%)"
                : "none",
            }}
            value={userDisliked ? "disliked" : ""}
          ></Icon>
        </Container>
      )}
    </div>
  );
};
