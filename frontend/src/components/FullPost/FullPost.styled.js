import styled from 'styled-components';

export const PostContainer = styled.div`
    display: flex;
    margin: 0 2rem;
    background-color: #202327;
    border-radius: 4px;
`;

export const PostContent = styled.div`
    display: flex;
    border-right: 1px solid white;
    flex-direction: column;
    padding: 1rem;
    font-size: 1rem;
    max-width: 70rem;
    min-width: 20rem;
    width: 100%;
    position: relative;
`;

export const PostHeader = styled.div`
    display: flex;
    width: 100%;
    
`;

export const Title = styled.p`
    font-size: 1rem;
    font-weight: 500;
    margin-right: 1rem;
    flex: 1;
`;

export const PostDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-width: 10rem;

`;

export const FullContent = styled.div`
    color: #AAAAAA;
    word-break: break-all;
    font-size: .875rem;
`;

export const DeletePost = styled.div`
    position: absolute;
    bottom: .5rem;
    left: 1rem;
    font-size: .625rem;
    color: #AAAAAA;
    &:hover{
        cursor: pointer;
    }
`;