import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Cookie from "js-cookie";
import { Typography, CircularProgress, Button } from "@material-ui/core";
import "./style.scss";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const env = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  return Cookie.get("session") ? (
    <Redirect to="/" />
  ) : (
    <div className="login hero">
      {!loading ? (
        <div className="login-container">
          <div className="login-action-container">
            <Typography variant="h6" gutterBottom>
              Нэвтрэх хэсэг
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Tа манай системд бүртгэлтэй болсноор шалгалтын түүхээ харах
              боломжтой.
            </Typography>
            <a
              href={
                env
                  ? `http://${window.location.hostname}:5000/rest/auth/facebook`
                  : "/rest/auth/facebook"
              }
              onClick={() => setLoading(true)}
            >
              <Button variant="outlined" size="large" color="primary">
                <img
                  className="brand-logo"
                  src={require("assets/svg/facebook.svg").default}
                  alt="Google Logo"
                />
                Facebook ашиглан нэвтрэх
              </Button>
            </a>
            <a
              href={
                env
                  ? `http://${window.location.hostname}:5000/rest/auth/google`
                  : "/rest/auth/google"
              }
              onClick={() => setLoading(true)}
            >
              <Button variant="outlined" size="large" color="primary">
                <img
                  className="brand-logo"
                  src={require("assets/svg/google.svg").default}
                  alt="Google Logo"
                />
                Google ашиглан нэвтрэх
              </Button>
            </a>
          </div>
        </div>
      ) : (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};
export default Login;
