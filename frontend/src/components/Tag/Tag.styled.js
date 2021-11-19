import styled from 'styled-components';


export const DetailedTagGridItem = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TagButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 6rem;
    white-space: nowrap;
    padding: 1rem 2rem;
    color: black;
    border: none;
    border-radius: 4px;
    margin-right: 1rem;
    font-weight: 600;
    &:hover{
        cursor: pointer;
    }
`;

export const TagList = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 1rem 0;
    overflow-x: scroll;
    --ms-overflow-style: none;
    scrollbar-width: none; /* makes scrollbar dissapear in firefox */
    &::-webkit-scrollbar{
         display: none;
    }
`;

export const Container = styled.div`
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));;
    grid-gap: 1rem;
`;


export const QuestionsP = styled.p`
    color: #AAAAAA;
    font-size: 1rem;
    margin-top: .5rem;
`;