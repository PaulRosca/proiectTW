import styled from "styled-components";

export const Container = styled.div`
    padding: 0 2rem;
    display: flex;
`;

export const Username = styled.p`
    font-size: 1rem;
    color: #AAAAAA;
`;

export const ProfilePictureDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProfilePictureInput = styled.input`
    display: none;
`;

export const ProfilePictureLabel = styled.label`
    &:hover{
        cursor: pointer;
    }
`;