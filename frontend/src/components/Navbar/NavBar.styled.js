import styled from "styled-components";

export const NavBarContainer = styled.div`
  height: inherit;
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-right: 1px solid white;
  @media (max-width: 768px){
    width: 5rem;
  }
`;

export const NavBarLinks = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 2rem;
  align-items: center;
`;

export const NavBarBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const NavBarLink = styled.p`
  width: 10rem;
  background-color: ${(props) => (props.isActive ? `#202327` : `inherit`)};
  font-size: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: left;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  text-decoration: ${(props) => props.isActive ? `underline`: `none`};
  transition: 0.8s ease;
  &:hover {
    transform: scale(1.1);
    background-color: rgba(32, 35, 39, 0.4);
  }
  @media (max-width: 768px){
    width: 100%;
  }
`;

export const NavBarTitle = styled.p`
  align-self: center;
  font-size: 1.5rem;
  white-space: nowrap;
  padding: 2rem 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  @media (max-width: 768px){
    flex-direction: column;
    font-size: .625rem;
  }
`;

export const TitleText = styled.p`
  margin-left: .4rem;
  @media (max-width: 768px){
    margin: 0;
  }
`;

export const AskLink = styled.p`
  width: 10rem;
  background-color: #3A8663;
  font-size: 1.2rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: left;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  transition: 0.8s ease;
  text-decoration: ${(props) => props.isActive ? `underline`: `none`};
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px){
    width: 100%;
  }
`;

export const LoginLink = styled.p`
  width: 10rem;
  background-color: #52b788;
  font-size: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  @media (max-width: 768px){
    width: 100%;
    font-size: .6rem;
    justify-content: center;
    margin-bottom: .2rem;
  }
`;

export const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.8s ease;
  margin-left: 1rem;
  ${LoginLink}:hover & {
    transform: translateX(0.8rem);
  }
  @media (max-width: 768px){
    display: none;
  }
`;

export const SignUpText = styled.p`
  font-size: .8rem;
  padding-bottom: 1rem;
  @media (max-width: 768px){
    display: none;
  }
`;

export const NavLinkText = styled.p`
  margin-left: 1rem;
  @media (max-width: 768px){
    display: none;
  }
`;

export const SignUpTextSmall = styled.p`
  display: none;
  @media (max-width: 768px){
    display: inline-block;
    font-size: .6rem;
    padding-bottom: 1rem;
    text-decoration: underline;
  }
`