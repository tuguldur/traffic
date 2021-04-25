import React, { useContext, useState } from "react";
import "./style.scss";
import {
  TextField,
  Container,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Snackbar,
  Grid,
} from "@material-ui/core";
import { User } from "global/user";
import axios from "axios";
const Settings = () => {
  const { user } = useContext(User);
  const [values, setValues] = useState({});
  const [errors, setError] = useState(null);
  const [status, setStatus] = useState(false);
  return (
    <>
      <div className="settings">
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <h3>Tохиргоо</h3>
              {user ? (
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault();
                    var name = values.name ? values.name : user.name;
                    var phone = values.phone ? values.phone : user.phone;
                    setError(null);
                    axios
                      .post("/rest/account", { name, phone })
                      .then((response) => {
                        if (response.data.status) {
                          setStatus(true);
                        }
                      })
                      .catch((err) => setError(err.response.data.errors));
                    setValues({});
                  }}
                >
                  <div className="form-item">
                    <TextField
                      label="Нэр"
                      variant="outlined"
                      fullWidth
                      name="name"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          [e.target.name]: e.target.value,
                        })
                      }
                      defaultValue={user.name}
                      {...(errors &&
                      errors.find((error) => error.param === "name")
                        ? {
                            helperText: errors.find(
                              (error) => error.param === "name"
                            ).msg,
                            error: true,
                          }
                        : null)}
                    />
                  </div>
                  <div className="form-item">
                    <TextField
                      label="Утасны дугаар"
                      variant="outlined"
                      fullWidth
                      name="phone"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          [e.target.name]: e.target.value,
                        })
                      }
                      defaultValue={user.phone}
                      {...(errors &&
                      errors.find((error) => error.param === "phone")
                        ? {
                            helperText: errors.find(
                              (error) => error.param === "phone"
                            ).msg,
                            error: true,
                          }
                        : null)}
                    />
                  </div>
                  <div className="form-item">
                    <Grid container direction="row" justify="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={Object.keys(values).length === 0}
                      >
                        Хадгалах
                      </Button>
                    </Grid>
                  </div>
                </form>
              ) : (
                <div className="loading-progress">
                  <LinearProgress />
                </div>
              )}
            </CardContent>
          </Card>
        </Container>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={status}
        onClose={() => setStatus(false)}
        autoHideDuration={6000}
        message="Амжилттай"
      />
      ;
    </>
  );
};
export default Settings;
