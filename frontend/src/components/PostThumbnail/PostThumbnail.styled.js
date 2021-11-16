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
    width: 60rem;
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
    overflow: hidden;
    padding: 0 1rem;
    flex: 1;
    word-break: break-all;
    color: #AAAAAA;
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

export const Time = styled.p`
    color: #AAAAAA;
    align-self: center;
    font-size: .8rem;
`;

export const Username = styled.p`
    color: #536471;
    font-size: .8rem;
    align-self: center;
`;

export const TagPlace = styled.div`
    margin: 0 1rem;
`