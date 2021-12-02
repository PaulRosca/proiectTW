import { Container, ContentContainer } from "../styles/Global.style";
import { NavBar } from "../components/Navbar/NavBar.component";
import FormGroup from "../components/FormGroup/FormGroup.component";
import { ActionButton } from "../components/ActionButton/ActionButton.styled";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { signup } from "../features/user/userSlice";
import { Header } from "../components/Header/Header.component";
import { Link } from "react-router-dom";

export const Singup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:9000/user/register",
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      )
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(signup(data.user));
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container>
      <NavBar />
      <ContentContainer>
      <Header title="Create an account" />
      <div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div >
            <FormGroup
              type="email"
              id="email-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              error={false}
            />
            <FormGroup
              type="text"
              class="form-control"
              id="username-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
            />
          </div>
          <div>
            <FormGroup
              type="password"
              class="form-control"
              id="password-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
            <FormGroup
              type="password"
              id="confirm-password-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
            />
          </div>
          <div>
            <ActionButton type="submit">Sign up</ActionButton>
          </div>
        </form>
        <div style={{margin:".5rem 2rem", "fontSize": ".875rem", "fontWeight": "300", color: "#AAAAAA", "padding": "0 .5rem"}}>Already have an account? <Link to="/login" style={{color: "#AAAAAA"}}>Login</Link></div>
      </div>
      </ContentContainer>
    </Container>
  );
};
