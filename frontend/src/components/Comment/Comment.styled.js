import styled from "styled-components";

export const Container = styled.div`
    border-radius: 4px;
    display: flex;
    background-color: #202327;
    margin: 1rem 2rem;
`;

export const Content = styled.p`
    font-size: .875rem;
    color: #aaaaaa;
    padding: 0 1rem;
    flex: 1;
`;

export const CommentDetails = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: .5rem 0;
    min-width: 10rem;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid white;
    max-width: 70rem;
    min-width: 20rem;
    width: 100%;
    padding: .5rem 0 1rem 0;
    position: relative;
`;

export const DeleteComment = styled.div`
    position: absolute;
    bottom: 0;
    left: 1rem;
    font-size: .625rem;
    color:#AAAAAA;
    &:hover{
        cursor: pointer;
    }
`;