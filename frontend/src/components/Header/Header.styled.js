import styled from "styled-components";

const Container = styled.div`
    padding: 2rem 0;
    display: flex;
    width: 100%;
`;

const Title = styled.p`
    font-size: 2rem;
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
export { Container, Title };