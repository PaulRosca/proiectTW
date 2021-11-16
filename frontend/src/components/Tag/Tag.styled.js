import styled from 'styled-components';

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