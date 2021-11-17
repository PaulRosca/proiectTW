import styled from "styled-components";

export const Container = styled.div`
    border-radius: 4px;
    display: flex;
    background-color: #202327;
    margin: 0 1rem 1rem 1rem;
`;

export const Content = styled.p`
    
    padding: 1rem 2rem;
    word-break: break-all;
    color: #aaaaaa;
`;

export const CommentDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 15rem;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid white;
    padding-bottom: 1rem;
    flex: 1;
    width: 60rem;
`;