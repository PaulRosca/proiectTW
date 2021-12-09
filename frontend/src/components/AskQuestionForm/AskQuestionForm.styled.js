import styled from "styled-components";

export const AskQuestionFormContainer = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    max-width: 50rem;
    min-width: 20rem;
`;
export const TitleInput = styled.input`
    color: #aaaaaa;
    background-color: black;
    border: 1px solid;
    border-radius: 4px;
    height: 2rem;
    border-color: rgb(118, 118, 118);
    max-width: 50rem;
    margin: .5rem 0 1rem 0;
    padding: 1rem;
    min-width: 20rem;
`;

export const AskTextarea = styled.textarea`
    max-width: 50rem;
    background-color: black;
    height: 10rem;
    border-radius: 4px;
    padding: .5rem 1rem;
    margin: .5rem 0 1rem 0;
    min-width: 20rem;
`;

export const AddTagDiv = styled.div`
    width: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: rgb(118, 118, 118);
    border-radius: 4px;
    margin-right: 1rem;
    
`;

export const AddTagInput = styled.input`
    flex: 1;
    color: #aaaaaa;
    height: 100%;
    background-color: transparent;
    border: none;
    padding: 1rem;
    outline: none;
    width: 13rem;
`;

export const AddTagContainer = styled.div`
    display: flex;
    align-items: center;
    max-width: 100%;
    min-width: 20rem;
`;

export const AddedTagContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const TagSuggestionsContainer = styled.div`
    width: 15rem;
    padding: ${(props) => props.isActive ? `.4rem 1rem` : `0 1rem`};;
    background-color: #202327;
    border-radius: 4px;
    height: ${(props) => props.isActive ? props.hasTags ? `5rem` : `2rem` : `0`};
    display: flex;
    flex-direction: column;
    transition: .5s;
    overflow-y: ${(props) => props.hasTags ? `scroll` : `none`};
    --ms-overflow-style: none;
    scrollbar-width: none; /* makes scrollbar dissapear in firefox */
    &::-webkit-scrollbar{
         display: none;
    }
`;

export const TagSuggestion = styled.div`
    border-bottom: 1px solid rgb(118,118,118);
    font-size: .875rem;
    color: #aaaaaa;
    padding: .2rem 0;
    visibility: ${(props) => props.isActive ? 'visible' : `hidden`};
    transition-delay: ${(props) => props.isActive ? `.2s` : `0`};
    &:hover{
        cursor: pointer;
    }
`;

export const TagNotFound = styled.p`
    font-size: .875rem;
    color: #aaaaaa;
    visibility: ${(props) => props.isActive ? 'visible' : `hidden`};
    transition-delay: ${(props) => props.isActive ? `.2s` : `0`};
`;