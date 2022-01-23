//import module dependencies
import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import custom dependencies
import { AuthProvider } from "../../contexts/AuthContext";
import PrivateRoute from "../Authentication/PrivateRoute";

//import components
import Signup from "../Authentication/Signup";
import Login from "../Authentication/Login";
import ForgotPassword from "../Authentication/ForgotPassword";
import Dashboard from "../Dashboard/Dashboard";
import UpdateProfile from "../Profile/UpdateProfile";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Fragment>
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Dashboard />} />
              </Route>
              <Route exact path="/update-profile" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/update-profile"
                  element={<UpdateProfile />}
                />
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
