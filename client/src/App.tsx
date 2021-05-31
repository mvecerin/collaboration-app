import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Form } from "./app/components/auth/Form";
import { Dashboard } from "./app/components/dashboard/Dashboard";
import { Loading } from "./app/components/other/Loading";
import { useAppSelector, useThunkDispatch } from "./app/store";
import { loadUser } from "./features/user/userSlice";

const App = () => {
  const dispatch = useThunkDispatch();
  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-light min-vh-100">
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

const Routes = () => {
  const { isAuth, isLoading } = useAppSelector((state) => state.user);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Route path="/groups">
        {isAuth ? <Dashboard /> : <Redirect to="/signin" />}
      </Route>

      <Route path="/signin">
        {isAuth ? <Redirect to="/groups" /> : <Form formType="signIn" />}
      </Route>

      <Route path="/signup">
        {isAuth ? <Redirect to="/groups" /> : <Form formType="signUp" />}
      </Route>

      <Route exact path="/">
        <Redirect to="/groups" />
      </Route>
    </>
  );
};
