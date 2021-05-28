import React, { useEffect, useState, useMemo } from "react";
// material components
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Snackbar from "@material-ui/core/Snackbar";
import Skeleton from "@material-ui/lab/Skeleton";
// router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// data
import axios from "axios";
// pages
import {
  Category,
  Topic,
  Search,
  Login,
  Settings,
  NewExam,
  ExamView,
  ExamHistory,
} from "./pages";
// custom
import { Header } from "components";
import { User } from "global/user";
import Cookie from "js-cookie";
const Protected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Cookie.get("session") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const App = () => {
  const online = window.navigator.onLine;
  const [color, setColor] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  var theme = createMuiTheme({
    palette: {
      type: color,
      primary: {
        main: "#2196f3",
      },
    },
  });
  window.matchMedia("(prefers-color-scheme: dark)").addListener(function (e) {
    setColor(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  });
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const session = Cookie.get("session");
  useEffect(() => {
    if (session)
      axios("/rest/auth")
        .then((response) => {
          if (response.data.msg) {
            setUser(false);
          } else {
            setUser(response.data.user);
          }
        })
        .catch(() => {
          setError("Нэвтрэхэд алдаа гарлаа");
          Cookie.remove("session");
        });
  }, [session]);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div className="app">
      <User.Provider value={value}>
        <ThemeProvider theme={theme}>
          <Snackbar
            open={error ? true : false}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            onClose={() => console.log("ok hide")}
            message={error}
          />
          <CssBaseline />

          <Router>
            <Header />
            <Switch>
              <Route path="/" exact>
                <div className="flex-center hero">
                  <Card
                    className="type-card"
                    onClick={() => {
                      setOpen(true);
                      if (online)
                        axios.get("/rest/category").then((response) => {
                          if (response.data.status) {
                            setCategory(response.data.data);
                          }
                        });
                      else setError("Хүсэлт амжилтгүй");
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Icon className="card-icon">assignment</Icon>
                        <Typography variant="h5" component="h2">
                          Сэдвийн тест
                        </Typography>
                        <Typography variant="subtitle2">
                          Mонгол улсын замын хөдөлгөөний дүрмийн 1000 тестээс 37
                          сэдвээр ангилсан дасгал хэсэг
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card className="type-card">
                    <Link to="/exam/new">
                      <CardActionArea>
                        <CardContent>
                          <Icon className="card-icon">
                            assignment_turned_in
                          </Icon>
                          <Typography variant="h5" component="h2">
                            Шалгалтын тест
                          </Typography>
                          <Typography variant="subtitle2">
                            Санамсаргүйгээр 20 тестийг сонгон 20 минутад бөглөх
                            шалгалтын хэсэг.
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                  {/* Ангилал */}
                  <Dialog
                    onClose={() => {}}
                    aria-labelledby="type-dialog"
                    open={open}
                    className="category-dialog"
                  >
                    <DialogTitle>Ангилал сонгох</DialogTitle>
                    {category ? (
                      <List>
                        {category.map((cat) => {
                          return (
                            <Link to={`/category/${cat._id}`} key={cat._id}>
                              <ListItem button onClick={() => setOpen(false)}>
                                <ListItemText primary={cat.name} />
                              </ListItem>
                            </Link>
                          );
                        })}
                      </List>
                    ) : (
                      <div className="skeleton-loading">
                        <Typography component="div" variant="h3">
                          <Skeleton />
                        </Typography>
                        <Typography component="div" variant="h3">
                          <Skeleton />
                        </Typography>
                      </div>
                    )}
                  </Dialog>
                </div>
              </Route>
              <Route path="/category/:id" exact component={Category} />
              <Route path="/topic/:id" exact component={Topic} />
              <Route path="/search/:id" exact component={Search} />
              <Route path="/login" exact component={Login} />
              <Protected path="/settings" exact component={Settings} />
              <Protected path="/exam/new" exact component={NewExam} />
              <Protected path="/exam/history" exact component={ExamHistory} />
              <Protected path="/exam/:id" exact component={ExamView} />
              <Route
                path="**"
                exact
                component={() => (
                  <div className="not-found">
                    <span>Хуудас олдсонгүй</span>
                    <Link to="/">Нүүр хуудас руу буцах</Link>
                  </div>
                )}
              />
            </Switch>
          </Router>
        </ThemeProvider>
      </User.Provider>
    </div>
  );
};

export default App;
