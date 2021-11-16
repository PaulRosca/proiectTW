import styled from "styled-components";

export const Container = styled.div`
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    display: flex;
    margin-bottom: 1rem;
`;

export const Content = styled.p`
    flex: 1;
    padding: 1rem 2rem;
    width: 60rem;
    word-break: break-all;
    border-right: 1px solid white;
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
