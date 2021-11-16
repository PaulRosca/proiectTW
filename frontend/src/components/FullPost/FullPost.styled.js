import styled from 'styled-components';

export const PostContainer = styled.div`
    display: flex;
    
    border-bottom: 1px solid white;
`;

export const PostContent = styled.div`
    display: flex;
    flex: 1;
    border-right: 1px solid white;
    flex-direction: column;
    padding: 1rem 2rem;
    width: 60rem;
`;

export const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    
`;

export const Title = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    word-break: break-all;
    margin-right: 1rem;
`;

export const PostDetails = styled.div`
    width: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

export const FullContent = styled.div`
    color: #AAAAAA;
    overflow: hidden;
`;