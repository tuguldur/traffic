import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Icon,
  LinearProgress,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import "./style.scss";
import { User } from "global/user";
import axios from "axios";
const Header = () => {
  const { user } = useContext(User);
  const [account, setAccount] = useState(false);
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
                <div>
                  <Button
                    className="header-action"
                    onClick={(e) => setAccount(e.currentTarget)}
                  >
                    <img src={user.avatar} className="avatar" alt={""} />
                    {user.name}
                  </Button>
                  <Menu
                    keepMounted
                    open={Boolean(account)}
                    anchorEl={account}
                    onClose={() => setAccount(null)}
                    onClick={() => setAccount(null)}
                  >
                    <MenuItem>Mэдээлэл</MenuItem>
                    <MenuItem>Tохиргоо</MenuItem>
                    <MenuItem
                      onClick={() => {
                        axios.get("/rest/auth/logout");
                        Cookie.remove("session");
                        document.location.reload();
                      }}
                    >
                      Гарах
                    </MenuItem>
                  </Menu>
                </div>
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
