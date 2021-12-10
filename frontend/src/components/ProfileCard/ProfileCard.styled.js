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
`;

export const ProfilePictureInput = styled.input`
    display: none;
`;

export const ProfilePictureLabel = styled.label`
    display: flex;
    &:hover{
        cursor: pointer;
    }
`;

export const ProfilePictureInputDiv = styled.div`
    display: flex;
    gap: .2rem;
    font-size: .625rem;
    align-items: center;
`;

export const UploadPhotoButton = styled.button`
    background-color: #3A8663;
    border: none;
    border-radius: 4px;
    font-size: .875rem;
    padding: .2rem .4rem;
    &:hover{
        cursor: pointer;
    }

`;