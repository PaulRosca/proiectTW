import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home.page";
import { Tags } from "./pages/Tags.page";
import { Ask } from "./pages/Ask.page";
import { Profile } from "./pages/Profile.page";
import { Login } from "./pages/Login.page";
import { Singup } from "./pages/Signup.page";
import { Post } from "./pages/Post.page";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tags">
          <Tags />
        </Route>
        <Route path="/ask">
          <Ask />
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Singup />
        </Route>
        <Route path="/post/:id">
          <Post />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
