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
} from "./NavBar.styled";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(getActivePage(location));
  const [isConnected, setIsConnected] = useState(false);
  const user = useSelector(state => state.user);

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
      <NavBarTitle>FMI overflow</NavBarTitle>
      <NavBarLinks>
        <NavBarLink isActive={isActive.home}>
          <Icon
            icon="ant-design:home-outlined"
            style={{ color: "white", width: "1.2rem", height: "1.2rem" }}
          ></Icon>
          <NavLink
            to="/"
            style={{ textDecoration: "none", marginLeft: "1rem" }}
          >
            Home
          </NavLink>
        </NavBarLink>
        <NavBarLink isActive={isActive.tags}>
          <Icon
            icon="akar-icons:tag"
            style={{ color: "white", width: "1.2rem", height: "1.2rem" }}
          ></Icon>
          <NavLink
            to="/tags"
            style={{ textDecoration: "none", marginLeft: "1rem" }}
          >
            Tags
          </NavLink>
        </NavBarLink>
        {isConnected && (
          <AskLink isActive={isActive.ask}>
            <Icon
              icon="wpf:ask-question"
              style={{ color: "white", width: "1.2rem", height: "1.2rem" }}
            ></Icon>
            <NavLink
              to="/ask"
              style={{ textDecoration: "none", marginLeft: "1rem" }}
            >
              Ask
            </NavLink>
          </AskLink>
        )}
      </NavBarLinks>

      {isConnected && (
        <NavBarBottom>
          <NavBarLink isActive={isActive.profile}>
            <Icon
              icon="healthicons:ui-user-profile"
              style={{ color: "white", width: "1.2rem", height: "1.2rem" }}
            ></Icon>
            <NavLink
              to="/profile/123"
              style={{ textDecoration: "none", marginLeft: "1rem" }}
            >
              Profile
            </NavLink>
          </NavBarLink>
        </NavBarBottom>
      )}
      {!isConnected && (
        <NavBarBottom>
          <LoginLink>
            <NavLink
              to="/login"
              style={{ textDecoration: "none", marginRight: "1.5rem" }}
            >
              Login
            </NavLink>
            <IconContainer>
              <Icon
                icon="akar-icons:arrow-right"
                style={{ color: "white" }}
              ></Icon>
            </IconContainer>
          </LoginLink>
          <SignUpText>
            <span>or </span>
            <NavLink to="/signup" style={{}}>
              create an account
            </NavLink>
          </SignUpText>
        </NavBarBottom>
      )}
    </NavBarContainer>
  );
};
