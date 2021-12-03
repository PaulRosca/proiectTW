import {
  PostContainer,
  PostContent,
  PostHeader,
  Title,
  PostDetails,
  FullContent,
  DeletePost
} from "./FullPost.styled";
import { ReactToPost } from "../ReactToPost/ReactToPost.component";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";
import { Details } from "../Details/Details.component";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router";

export const FullPost = ({ post, onLike, onDislike }) => {
  const history = useHistory();
  const {
    _id,
    title,
    content,
    tags,
    createdBy,
    likeCount,
    dislikeCount,
    createdAt,
    liked,
    disliked,
  } = post;

  const deletePost = async (_id) => {
    try{
      const res = await axios.delete(`http://localhost:9000/posts/deletePost/${_id}`, { withCredentials: true});
      history.push(`/`);
    }
    catch (err){
      console.log(err);
    }
  }

  const user = useSelector((state) => state.user);
  return (
    <PostContainer>
      <PostContent>
        <PostHeader>
          <Title>{title}</Title>
          <ReactToPost
            likes={likeCount}
            dislikes={dislikeCount}
            userLiked={liked}
            userDisliked={disliked}
            onLike={onLike}
            onDislike={onDislike}
          />
        </PostHeader>
        <FullContent>{content}</FullContent>
        <TagList>
          {tags.map((tag) => (
            <Tag name={tag.content} key={tag._id} />
          ))}
        </TagList>
        {user && user._id === createdBy._id && <DeletePost onClick={(e) => deletePost(_id)}>Delete post</DeletePost>}
      </PostContent>
      <PostDetails>
        <Details timestamp={createdAt} createdBy={createdBy} />
      </PostDetails>
    </PostContainer>
  );
};
