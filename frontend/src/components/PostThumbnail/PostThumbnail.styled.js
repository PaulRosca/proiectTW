import styled from 'styled-components';

export const Container = styled.div`
    background-color: #202327;
    display: flex;
    margin: 1rem 2rem;
    height: 15rem;
    border-radius: 8px;
    transition: background-color .5s;
    &:hover{
        background-color: #2C3035;
    }
`;

export const PostContent = styled.div`
    border-radius: 8px 0px 0px 8px;
    border-right: 1px solid white;
    display: flex;
    flex-direction: column;
    max-width: 65rem;
    min-width: 15rem;
`;

export const PostDetails = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Title = styled.div`
    font-size: 1.2rem;
    padding: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover{
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const Content = styled.p`
    display: block;
    padding: 0 1rem;
    flex: 1;
    word-break: break-all;
    color: #AAAAAA;
    overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 5; /* number of lines to show */
           line-clamp: 5; 
   -webkit-box-orient: vertical;
`;

export const Tags = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 1rem;
    overflow-x: scroll;
    --ms-overflow-style: none;
    &::-webkit-scrollbar{
         display: none;
    }
`;

export const PostStats = styled.div`
    display: flex;
    padding: 1rem;
    font-size: .8rem;
    justify-content: center;
    width: 100%;
`;

export const Stat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`;
export const StatValue = styled.p`
    align-self: center;
`;
export const StatName = styled.p`
`;

export const TagPlace = styled.div`
    margin: 0 1rem;
`