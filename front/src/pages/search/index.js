import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";

import { Link } from "react-router-dom";
import axios from "axios";
//component
import Test from "components/test";

import "./styles.scss";
const Search = ({ match }) => {
  const { id } = match.params;
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);
  const [error, setError] = useState("");
  return (
    <>
      <div className="search">
        <Container maxWidth="sm">
          <Paper>
            {loading ? <LinearProgress /> : null}
            <div className="paper-header">
              <h3>Tестын дугаараар хайлт хийх</h3>
              <div>
                <Link to={"/category/" + id}>
                  <IconButton>
                    <Icon>close</Icon>
                  </IconButton>
                </Link>
              </div>
            </div>
            <Divider />
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                if (search) {
                  setLoading(true);
                  axios
                    .post(`/rest/test/search/${id}`, { search })
                    .then((response) => {
                      if (response.data.status) {
                        setState(response.data.data);
                      } else {
                        setError(response.data.msg);
                      }
                      setLoading(false);
                    });
                }
              }}
            >
              <TextField
                id="search"
                variant="outlined"
                name="search"
                fullWidth
                placeholder="Tестын дугаар"
                autoFocus={true}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                type="submit"
              >
                Хайх
              </Button>
            </form>
          </Paper>
          {state
            ? state.map((test) => <Test {...test} key={test._id} />)
            : null}
        </Container>
      </div>
      <Snackbar
        open={error ? true : false}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={() => console.log("ok hide")}
        message={error}
      />
    </>
  );
};
export default Search;
