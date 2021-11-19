import { useState } from "react";
import { ContainerPd2, LabelBg, PostButton } from "../../styles/Global.style";
import { AddCommentTextarea } from "./AddComment.styled";

export const AddComment = ({ addComment }) => {
  const [content, setContent] = useState("");
  const handlePost = () => {
    addComment(content);
  };
  return (
    <ContainerPd2>
      <LabelBg>Your answer</LabelBg>
      <AddCommentTextarea
        placeholder="Write your answer here..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></AddCommentTextarea>
      <PostButton onClick={handlePost}>Post</PostButton>
    </ContainerPd2>
  );
};
