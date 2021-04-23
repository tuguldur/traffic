import React, { useContext } from "react";
import { Button, Container, Icon, LinearProgress } from "@material-ui/core";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import "./style.scss";
import { User } from "global/user";
const Header = () => {
  const { user } = useContext(User);
  return (
    <div id="header">
      {Cookie.get("session") && !user ? (
        <div className="header-loading">
          <LinearProgress />
        </div>
      ) : null}
      <Container maxWidth="md">
        <div className="header-row">
          <div className="header-col">
            <div className="header-item">
              <Link to="/" className="logo">
                <Icon>assignment_turned_in</Icon> Жолооны тест
              </Link>
            </div>
          </div>
          <div className="header-col">
            <div className="header-item">
              {user ? (
                <Button variant="outlined" color="primary">
                  <img
                    src={user.avatar}
                    className="avatar"
                    alt={`${user.name}'s avatar`}
                  />
                  {user.name}
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="contained" color="primary">
                    Нэвтрэх
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Header;
