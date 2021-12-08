import { Container, ContentContainer } from "../styles/Global.style";
import { NavBar } from "../components/Navbar/NavBar.component";
import { useState } from "react";
import FormGroup from "../components/FormGroup/FormGroup.component";
import { ActionButton } from "../components/ActionButton/ActionButton.styled";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import { Header } from "../components/Header/Header.component";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:9000/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(login(data.user));
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
        <Header title="Login" />
        <form onSubmit={handleSubmit} autoComplete="off">
          <FormGroup
            type="email"
            id="email-field"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
          <FormGroup
            type="password"
            class="form-control"
            id="password-field"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          <ActionButton type="submit">Login</ActionButton>
          <div
            style={{
              margin: ".5rem 2rem",
              fontSize: ".875rem",
              fontWeight: "300",
              color: "#AAAAAA",
              padding: "0 .5rem",
            }}
          >
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#AAAAAA" }}>
              Register
            </Link>
          </div>
        </form>
      </ContentContainer>
    </Container>
  );
};
