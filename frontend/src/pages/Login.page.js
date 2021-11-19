import { Container } from "../styles/Global.style";
import { NavBar } from "../components/Navbar/NavBar.component";
import { useState } from "react";
import FormGroup from "../components/FormGroup/FormGroup.component";
import { ActionButton } from "../components/ActionButton/ActionButton.styled";
import axios from "axios";
import { useHistory } from "react-router";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
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
            />
            <FormGroup
              type="password"
              class="form-control"
              id="password-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ActionButton type="submit">Login</ActionButton>
          </div>
        </form>
      </div>
    </Container>
  );
};
