import { ContainerPd2, Hint, LabelBg, PostButton } from "../../styles/Global.style"
import { AskTextarea, TitleInput, AddTagDiv, AddTagInput, AddTagContainer, AddedTagContainer } from "./AskQuestionForm.styled"
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Tag } from "../Tag/Tag.component";
import { TagList } from "../Tag/Tag.styled";

export const AskQuestionForm = () => {
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    return(
        <ContainerPd2>
            <LabelBg>Title</LabelBg>
            <Hint>Keep it as short and clear as possible</Hint>
            <TitleInput placeholder="write your title here..."></TitleInput>
            <LabelBg>Content</LabelBg>
            <Hint>Include all the informations that may be needed in order for someone to answer your question</Hint>
            <AskTextarea placeholder="Write your informations here"></AskTextarea>
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
            
            <PostButton>Post</PostButton>
        </ContainerPd2>
    )
}