import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Icon,
  LinearProgress,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import "./style.scss";
import { User } from "global/user";
import axios from "axios";
const Header = () => {
  const { user } = useContext(User);
  const [logout, setLogout] = useState(false);
  const [account, setAccount] = useState(false);
  return (
    <>
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
                      <img
                        src={user.avatar}
                        referrerPolicy="no-referrer"
                        className="avatar"
                        alt={""}
                      />
                      {user.name}
                    </Button>
                    <Menu
                      keepMounted
                      open={Boolean(account)}
                      anchorEl={account}
                      onClose={() => setAccount(null)}
                      onClick={() => setAccount(null)}
                    >
                      <MenuItem>
                        <Link to="/profile">Хувийн мэдээлэл</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/exam/history">Шалгалтууд</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/settings">Tохиргоо</Link>
                      </MenuItem>
                      <MenuItem
                        onClick={() => setLogout(true)}
                        color="secondary"
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

      <Dialog open={logout} onClose={() => setLogout(false)}>
        <DialogTitle>Та интернэт системээс гарах уу?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tа системээс гарснаар шалгалтын түүхээ удирдах боломжгүй болох юм
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogout(false)}>Цуцлах</Button>
          <Button
            onClick={() => {
              axios.get("/rest/auth/logout");
              Cookie.remove("session");
              document.location.reload();
            }}
            color="primary"
            autoFocus
            variant="contained"
          >
            Гарах
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Header;
