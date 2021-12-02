import {
  ContainerPd2,
  Hint,
  LabelBg,
  PostButton,
} from "../../styles/Global.style";
import {
  AskTextarea,
  TitleInput,
  AddTagDiv,
  AddTagInput,
  AddTagContainer,
  AddedTagContainer,
  TagSuggestionsContainer,
  TagSuggestion,
  TagNotFound,
} from "./AskQuestionForm.styled";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";
import { addQuestion } from "./AskQuestionForm.bl";
import { useHistory } from "react-router";
import { useEffect } from "react";
import axios from "axios";

export const AskQuestionForm = () => {
  const history = useHistory();
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([]);
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
          setTags([...tags, suggestion]);
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
        setTags([...tags, data.tag]);
        setCurrentTag({
          _id: undefined,
          content: "",
        });
      } catch (error) {
        return;
      }
    } else {
      setTags([...tags, currentTag]);
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
          //console.log(res.data);
          setTagSuggestions([...res.data]);
        } catch (error) {
          console.log(error);
        }
      };
      getSuggestions(currentTag.content);
    }
  }, [currentTag.content]);

  return (
    <ContainerPd2>
      <LabelBg>Title</LabelBg>
      <Hint>Keep it as short and clear as possible</Hint>
      <TitleInput
        placeholder="write your title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></TitleInput>
      <LabelBg>Content</LabelBg>
      <Hint>
        Include all the informations that may be needed in order for someone to
        answer your question
      </Hint>
      <AskTextarea
        placeholder="Write your informations here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></AskTextarea>
      <LabelBg>Tags</LabelBg>
      <Hint>Key words that describe your question</Hint>
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
          {tags.map((tag, idx) => {
            return (
              <AddedTagContainer>
                <Tag name={tag.content} />
                <Icon
                  icon="carbon:close"
                  style={{
                    fontSize: "1.5rem",
                    marginLeft: "-1rem",
                    marginRight: "1rem",
                  }}
                  onClick={(e) =>
                    setTags([...tags.filter((_, i) => i !== idx)])
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

      <PostButton
        style={{ marginTop: "1rem" }}
        onClick={(e) =>
          addQuestion({
            title,
            content,
            tags: tags.map((tag) => tag._id),
          }).then((_) => history.push(`/`))
        }
      >
        Post
      </PostButton>
    </ContainerPd2>
  );
};
