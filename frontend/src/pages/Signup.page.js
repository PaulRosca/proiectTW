import { Container } from "../styles/Global.style";
import { NavBar } from "../components/Navbar/NavBar.component";
import FormGroup from "../components/FormGroup/FormGroup.component";
import { ActionButton } from "../components/ActionButton/ActionButton.styled";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
export const Singup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

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
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container>
      <NavBar />
      <div style={{ flex: "1 1 0" }}>
        <form
          style={{ width: "100%", margin: "3rem 0" }}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FormGroup
              type="email"
              id="email-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              error={true}
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
          <div style={{ display: "flex", justifyContent: "center" }}>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ActionButton type="submit">Sign up</ActionButton>
          </div>
        </form>
      </div>
    </Container>
  );
};
