import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem 0;
    display: flex;
    width: 100%;
`;

export const Title = styled.p`
    font-size: 1.2rem;
    padding: 0 2rem;
    font-weight: 600;
    min-width: 10rem;
`;

export const ChildrenContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1 1 auto;
    padding: 0 2rem;
`;

export const SignOutButton = styled.button`
    background-color: #B22F2F;
    color: white;
    height: 2rem;
    border-radius: 4px;
    border:none;
    padding: 0 2rem;
    &:hover{
        cursor: pointer;
    }
`;