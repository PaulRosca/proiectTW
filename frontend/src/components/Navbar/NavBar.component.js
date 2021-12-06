import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getActivePage } from "./NavBar.bl";
import {
  NavBarContainer,
  NavBarLink,
  NavBarTitle,
  NavBarLinks,
  NavBarBottom,
  AskLink,
  LoginLink,
  IconContainer,
  SignUpText,
  NavLinkText,
  TitleText,
  SignUpTextSmall
} from "./NavBar.styled";
import { useSelector } from "react-redux";
import ReactImageFallback from "react-image-fallback";

export const NavBar = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(getActivePage(location));
  const [isConnected, setIsConnected] = useState(false);
  const user = useSelector(state => state.user);
  const defaultImage = <Icon icon="healthicons:ui-user-profile" style={{ color: "white", width: "1.2rem", height: "1.2rem" }}></Icon>;
  useEffect(() => {
    setIsActive(getActivePage(location));
  }, [location]);

  useEffect(() => {
    if (user) {
      setIsConnected(true);
    }
  }, []);

  return (
    <NavBarContainer className="NavBar">
      <NavBarTitle>
        <div>FMI</div>
        <TitleText>overflow</TitleText>
      </NavBarTitle>
      <NavBarLinks>
          <NavLink
            to="/"
            style={{ textDecoration: "none" }}
          >
            <NavBarLink isActive={isActive.home}>
            <Icon
              icon={isActive.home ? "ant-design:home-fill" : "ant-design:home-outlined"}
              style={{ color: "white", width: "1.2rem", height: "1.2rem" }}
            ></Icon>
            
              <NavLinkText>Home</NavLinkText>
          </NavBarLink>
        </NavLink>
        
        <NavLink
            to="/tags"
            style={{ textDecoration: "none" }}
        >
          <NavBarLink isActive={isActive.tags}>
            <Icon
              icon={isActive.tags ? "bi:tag-fill" : "akar-icons:tag"}
              style={{ color: "white", width: "1.2rem", height: "1.2rem" }}
            ></Icon>
              <NavLinkText>Tags</NavLinkText>
          </NavBarLink>
        </NavLink>

        {isConnected && (
          <NavLink
              to="/ask"
              style={{ textDecoration: "none" }}
            >
            <AskLink isActive={isActive.ask}>
              <Icon
                icon={isActive.ask ? "akar-icons:question-fill":"akar-icons:question" }
                style={{ color: "white", width: "1.2rem", height: "1.2rem" }}
              ></Icon>
              
                <NavLinkText>Ask</NavLinkText>
            </AskLink>
            </NavLink>
        )}
      </NavBarLinks>

      {isConnected && (
        <NavBarBottom>
        <NavLink
              to={`/profile/${user._id}`}
              style={{ textDecoration: "none" }}
            >
            <NavBarLink isActive={isActive.profile}>
              
              <ReactImageFallback
                src={`http://localhost:9000/profilePicture/user/${user._id}`}
                fallbackImage={defaultImage}
                style={{width: '1.2rem', height: '1.2rem', alignSelf: 'center', objectFit: 'cover', borderRadius: '4px'}}
            />
              
                <NavLinkText>Profile</NavLinkText>
            </NavBarLink>
          </NavLink>
        </NavBarBottom>
      )}
      {!isConnected && (
        <NavBarBottom>
        <NavLink
              to="/login"
              style={{ textDecoration: "none" }}
        >
            <LoginLink>
            Login
              <IconContainer>
                <Icon
                  icon="akar-icons:arrow-right"
                  style={{ color: "white" }}
                ></Icon>
              </IconContainer>
            </LoginLink>
        </NavLink>

        <NavLink to="/signup">
            <SignUpText>
              create an account
            </SignUpText>
            <SignUpTextSmall>Register</SignUpTextSmall>
        </NavLink>  
        </NavBarBottom>
      )}
    </NavBarContainer>
  );
};
