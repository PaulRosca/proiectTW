import {
  Container,
  Content,
  CommentDetails,
  ContentContainer,
  ContentEdit
} from "./Comment.styled";
import { 
  OwnerDiv,
  OwnerItem
} from "../FullPost/FullPost.styled";

import { Details } from "../Details/Details.component";
import { ReactToPost } from "../ReactToPost/ReactToPost.component";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { Edited } from "../../styles/Global.style";
export const Comment = ({ comment, onLike, onDislike, onDelete }) => {
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState(comment.content);
  const handleLike = () => {
    onLike(comment._id);
  };
  const handleDislike = () => {
    onDislike(comment._id);
  };

  const handleDelete = (_id) => {
    onDelete(_id);
  };

  const handleCommentEdit = async (e) => {
    if (editedContent.length === 0 || editedContent === comment.content) return;
    try{
      const res = await axios.patch(`http://localhost:9000/posts/editComment/${comment._id}`, {content: editedContent}, {withCredentials: true});
      setContent(res.data.comment.content);
      setIsEdited(true);
      console.log(res);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setIsEditing(false);
    }
  };
  const [isEdited, setIsEdited] = useState(comment.edited);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  return (
    <Container>
      <ContentContainer>
      {isEdited &&  <Edited>edited</Edited>}
        { !isEditing  && <Content>{content}</Content>}
        { isEditing && <ContentEdit value={editedContent} onChange={(e) => setEditedContent(e.target.value)}></ContentEdit>}
        <ReactToPost
          likes={comment.likeCount}
          dislikes={comment.dislikeCount}
          isForComment={true}
          userLiked={comment.liked}
          userDisliked={comment.disliked}
          onLike={handleLike}
          onDislike={handleDislike}
        />
        {!isEditing && user && user._id === comment.user._id && 
        <OwnerDiv>
          <OwnerItem onClick={(e) => setIsEditing(true)}>Edit</OwnerItem>
         <OwnerItem onClick={e => handleDelete(comment._id)}>Delete comment</OwnerItem>
        </OwnerDiv>
        }
        {
          isEditing && user && user._id === comment.user._id &&
          <OwnerDiv>
            <OwnerItem onClick={(e) => handleCommentEdit(e)}>Save</OwnerItem>
            <OwnerItem onClick={e => setIsEditing(false)}>Cancel</OwnerItem>
          </OwnerDiv>
        }

        
      </ContentContainer>
      <CommentDetails>
        <Details timestamp={comment.createdAt} createdBy={comment.user} />
      </CommentDetails>
    </Container>
  );
};
