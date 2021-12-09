import styled from "styled-components";

export const Container = styled.div`
  background-color: #000000;
  min-height: 100vh;
  display: flex;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
  width: 100%;
`;

export const PageDescription = styled.p`
  font-size: 1rem;
  color: #AAAAAA;
  padding: 0 2rem;
`;

export const LabelBg = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const PostButton = styled.button`
  background-color: #3A8663;
  color: white;
  height: 2rem;
  width: 10rem;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  &:hover{
    cursor: pointer;
  }
`;

export const ContainerPd2 = styled.div`  
  padding: 2rem;
  display: flex;
  flex-direction: column;
`
export const Hint = styled.p`
  color: #aaaaaa;
  font-size: .8rem;
`;

export const Edited = styled.p`
  font-size: .625rem;
  color: #aaaaaa;
  font-style: italic;
`;