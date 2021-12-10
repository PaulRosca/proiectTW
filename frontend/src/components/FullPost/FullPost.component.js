import {
  PostContainer,
  PostContent,
  PostHeader,
  Title,
  PostDetails,
  FullContent,
  OwnerDiv,
  OwnerItem,
  FullContentEdit,
  TitleEdit
} from "./FullPost.styled";
import {
  AddTagDiv,
  AddTagInput,
  AddTagContainer,
  AddedTagContainer,
  TagSuggestionsContainer,
  TagSuggestion,
  TagNotFound,
} from "../AskQuestionForm/AskQuestionForm.styled";
import { Icon } from "@iconify/react";
import { ReactToPost } from "../ReactToPost/ReactToPost.component";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";
import { Details } from "../Details/Details.component";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { Edited } from "../../styles/Global.style";

export const FullPost = ({ post, onLike, onDislike }) => {
  const history = useHistory();
  const {
    _id,
    createdBy,
    likeCount,
    dislikeCount,
    createdAt,
    edited,
    liked,
    disliked,
  } = post;
  console.log(post);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState([...post.tags]);

  
  const deletePost = async (_id) => {
    try{
      const res = await axios.delete(`http://localhost:9000/posts/deletePost/${_id}`, { withCredentials: true});
      history.push(`/`);
    }
    catch (err){
      console.log(err);
    }
  }

  
  const [editedTags, setEditedTags] = useState([...tags]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [editedPost, setEditedPost] = useState({'title': title, 'content': content});
  const user = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTag, setCurrentTag] = useState({
    _id: undefined,
    content: "",
  });
  const handleCurrentTagContentChange = (e) => {
    setCurrentTag({
      _id: undefined,
      content: e.target.value,
    });
  };
  const addTag = async () => {
    if (!currentTag._id) {
      for (const suggestion of tagSuggestions) {
        if (
          suggestion.content.toLowerCase() === currentTag.content.toLowerCase()
        ) {
          setEditedTags([...editedTags, suggestion]);
          setCurrentTag({
            _id: undefined,
            content: "",
          });
          return;
        }
      }
      try {
        const { data } = await axios.post(
          `http://localhost:9000/posts/createTag`,
          {
            content: currentTag.content,
          },
          {
            withCredentials: true,
          }
        );
        setEditedTags([...editedTags, data.tag]);
        setCurrentTag({
          _id: undefined,
          content: "",
        });
      } catch (error) {
        return;
      }
    } else {
      setEditedTags([...editedTags, currentTag]);
      setCurrentTag({
        _id: undefined,
        content: "",
      });
    }
  };

  useEffect(() => {
    if (currentTag.content) {
      const getSuggestions = async (searchedWord) => {
        try {
          const res = await axios.get(`http://localhost:9000/posts/tags`, {
            params: { search: searchedWord },
          });
          setTagSuggestions([...res.data]);
        } catch (error) {
          console.log(error);
        }
      };
      getSuggestions(currentTag.content);
    }
  }, [currentTag.content]);

  const handleEditPost = async (e) => {
    let editedFields = {};
    if (editedPost.title !== title && editedPost.title.length > 0) editedFields.title = editedPost.title;
    if (editedPost.content !== content && editedPost.content.length > 0) editedFields.content = editedPost.content;
    editedFields.tags = editedTags;
    console.log(editedFields);
    try{
      const res = await axios.patch(`http://localhost:9000/posts/editPost/${_id}`, editedFields, {withCredentials: true});
      setTitle(res.data.post.title);
      setContent(res.data.post.content);
      setTags([...editedTags]);
      setIsEdited(true);
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsEditing(false);
    }
  }
  const [isEdited, setIsEdited] = useState(edited);
  return (
    <PostContainer>
      <PostContent>
        {isEdited && <Edited>edited</Edited>}
        <PostHeader>
          {!isEditing && <Title>{title}</Title>}
          {isEditing && <TitleEdit type="text" value={editedPost.title} onChange={(e) => setEditedPost((prev) => ({...prev, 'title': e.target.value}))}></TitleEdit>}
          <ReactToPost
            likes={likeCount}
            dislikes={dislikeCount}
            userLiked={liked}
            userDisliked={disliked}
            onLike={onLike}
            onDislike={onDislike}
          />
        </PostHeader>
        {!isEditing && <FullContent>{content}</FullContent>}
        {isEditing && <FullContentEdit value={editedPost.content} onChange={(e) => setEditedPost((prev) => ({...prev, 'content': e.target.value}))}></FullContentEdit>}
        
        {!isEditing && <TagList>
          {tags.map((tag) => (
            <Tag name={tag.content} key={tag._id} />
          ))}
        </TagList>}

        {isEditing && <>
          <AddTagContainer>
        <AddTagDiv>
          <AddTagInput
            type="text"
            placeholder="Add your tag here..."
            value={currentTag.content}
            onChange={handleCurrentTagContentChange}
          ></AddTagInput>
          <Icon
            icon="carbon:add"
            style={{ fontSize: "2rem", padding: "0 .2rem", cursor: "pointer" }}
            onClick={addTag}
          ></Icon>
        </AddTagDiv>
        <TagList>
          {editedTags.map((tag, idx) => {
            return (
              <AddedTagContainer key={tag._id}>
                <Tag name={tag.content} />
                <Icon
                  icon="carbon:close"
                  style={{
                    fontSize: "1.5rem",
                    marginLeft: "-1rem",
                    marginRight: "1rem",
                  }}
                  onClick={(e) =>
                    setEditedTags([...editedTags.filter((_, i) => i !== idx)])
                  }
                />
              </AddedTagContainer>
            );
          })}
        </TagList>
      </AddTagContainer>
      <TagSuggestionsContainer
        isActive={currentTag.content ? true : false}
        hasTags={tagSuggestions.length === 0 ? false : true}
      >
        {tagSuggestions.length > 0 &&
          tagSuggestions.map((s) => (
            <TagSuggestion
              key={Math.random()}
              isActive={currentTag.content ? true : false}
              onClick={(e) => setCurrentTag(s)}
            >
              {s.content}
            </TagSuggestion>
          ))}
        {tagSuggestions.length === 0 && (
          <TagNotFound isActive={currentTag.content ? true : false}>
            No tags found
          </TagNotFound>
        )}
      </TagSuggestionsContainer>
        </>}




        {user && user._id === createdBy._id && !isEditing &&
         <OwnerDiv>
          <OwnerItem onClick={(e) => setIsEditing(true)}>Edit</OwnerItem>
          <OwnerItem onClick={(e) => deletePost(_id)}>Delete</OwnerItem>
         </OwnerDiv>
         }
         {user && user._id === createdBy._id && isEditing &&
         <OwnerDiv>
          <OwnerItem onClick={(e) => handleEditPost(e)}>Save</OwnerItem>
          <OwnerItem onClick={(e) => setIsEditing(false)}>Cancel</OwnerItem>
         </OwnerDiv>
         }
      </PostContent>
      <PostDetails>
        <Details timestamp={createdAt} createdBy={createdBy} />
      </PostDetails>
    </PostContainer>
  );
};
