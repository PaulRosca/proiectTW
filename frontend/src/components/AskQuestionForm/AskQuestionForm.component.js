import { ContainerPd2, Hint, LabelBg, PostButton } from "../../styles/Global.style"
import { AskTextarea, TitleInput, AddTagDiv, AddTagInput, AddTagContainer, AddedTagContainer, TagSuggestionsContainer, TagSuggestion, TagNotFound } from "./AskQuestionForm.styled"
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
    const [tagInput, setTagInput] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [tagSuggestions, setTagSuggestions] = useState([]);
    
    useEffect(() => {
        if (tagInput){
            const getSuggestions = async (searchedWord) => {
                try{
                    const res = await axios.get(`http://localhost:9000/posts/tag`, {params: {s: searchedWord}});
                    //console.log(res.data);
                    setTagSuggestions([...res.data]);
                }
                catch(error){
                    console.log(error);
                }
            }
            getSuggestions(tagInput);
        }
    }, [tagInput])

    return(
        <ContainerPd2>
            <LabelBg>Title</LabelBg>
            <Hint>Keep it as short and clear as possible</Hint>
            <TitleInput placeholder="write your title here..." value={title} onChange={(e) => setTitle(e.target.value)}></TitleInput>
            <LabelBg>Content</LabelBg>
            <Hint>Include all the informations that may be needed in order for someone to answer your question</Hint>
            <AskTextarea placeholder="Write your informations here" value={content} onChange={(e) => setContent(e.target.value)}></AskTextarea>
            <LabelBg>Tags</LabelBg>
            <Hint>Key words that describe your question</Hint>
            <AddTagContainer>
                <AddTagDiv>
                    <AddTagInput type="text" placeholder="Add your tag here..." value={tagInput} onChange={(e) => setTagInput(e.target.value)}></AddTagInput>
                    <Icon icon="carbon:add" style={{"fontSize": "2rem", "padding": "0 .2rem", "cursor": "pointer"}} onClick={(e) => {setTags([...tags, tagInput]); setTagInput("")}}></Icon>
                </AddTagDiv>
                <TagList>
                {tags.map( (tag, idx) => { return (
                    <AddedTagContainer>
                        <Tag name={tag}/>
                        <Icon icon="carbon:close" style={{"fontSize": "1.5rem", "marginLeft": "-1rem", "marginRight": "1rem"}} onClick={(e) => setTags([...tags.filter((_, i) => i !== idx)])}/>
                    </AddedTagContainer>
                )})}
                </TagList>
            </AddTagContainer>
            <TagSuggestionsContainer isActive={tagInput ? true : false} hasTags={tagSuggestions.length === 0 ? false : true}>
                    {(tagSuggestions.length > 0) && tagSuggestions.map((s) => <TagSuggestion key={Math.random()} isActive={tagInput ? true : false} onClick={(e) => setTagInput(s.content)}>{s.content}</TagSuggestion>)}
                    {(tagSuggestions.length === 0) && <TagNotFound isActive={tagInput ? true : false}>No tags found</TagNotFound>}
            </TagSuggestionsContainer>
            
            <PostButton style={{"marginTop": "1rem"}}onClick={(e) => addQuestion({title, content, tags}).then(_ => history.push(`/`))}>Post</PostButton>
        </ContainerPd2>
    )
}