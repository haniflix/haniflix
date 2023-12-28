import "./app.scss"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Verify from "./pages/verify/Verify";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ChangePassword from "./pages/change-password/ChangePassword";
import SearchPage from "./pages/search/SearchPage";
import AccSettings from "./pages/user-settings/AccSettings";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MyLists from "./pages/my-lists/MyLists";

const App = () => {
  let user = false;

  if( localStorage.getItem("user") !== null && localStorage.getItem("user") !== "" ){
      user = true;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user === true ? <Home /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/register">
          {user === true ? <Redirect to="/"/> : <Register/>}
        </Route>
        <Route path="/forgot-pass">
          {user === true ? <Redirect to="/"/> : <ForgotPassword/>}
        </Route>
        <Route path="/change-password/:id/:email">
          {user === true ? <Redirect to="/"/> : <ChangePassword/>}
        </Route>
        <Route path="/login">
          {user === true ? <Redirect to="/"/> : <Login/>}
        </Route>
        <Route path="/verify">
          <Verify/>
        </Route>


        { user && (
          <>
            <Route path="/movies">
              <Home type="movies"/>
            </Route>
            <Route path="/series">
              <Home type="series"/>
            </Route>
            <Route path="/watch">
              <Watch/>
            </Route>
            <Route path="/my-list">
              <MyLists/>
            </Route>
            <Route path="/new-and-popular">
              <Home/>
            </Route>
            <Route path="/search">
              <SearchPage/>
            </Route>
            <Route path="/settings">
              <AccSettings/>
            </Route>

          </>
        )}
      </Switch>
    </Router>
  )
};

export default App;