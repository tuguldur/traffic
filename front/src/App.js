import React, { useState } from "react";
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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// data
import axios from "axios";
// pages
import { Category, Topic } from "./pages";
const App = () => {
  const online = window.navigator.onLine;
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={error}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={() => console.log("ok hide")}
        message="Интернэт холболтоо шалгана уу."
      />
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" exact>
            <div className="flex-center hero">
              <Card
                className="type-card"
                onClick={() => {
                  setOpen(true);
                  if (online) {
                    axios.get("/rest/category").then((response) => {
                      if (response.data.status) {
                        setCategory(response.data.data);
                        localStorage.setItem(
                          "category",
                          JSON.stringify(response.data.data)
                        );
                        console.log(
                          `Cached ${response.data.data.length} items`
                        );
                      }
                    });
                  } else {
                    var localCategory = localStorage.getItem("category");
                    if (localCategory) {
                      setCategory(JSON.parse(localStorage.getItem("category")));
                    } else {
                      setError(true);
                    }
                  }
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Icon className="card-icon">assignment</Icon>
                    <Typography variant="h5" component="h2">
                      Сэдвийн тест
                    </Typography>
                    <Typography variant="subtitle2">
                      Mонгол улсын замын хөдөлгөөний дүрмийн 820 тестээс 27
                      сэдвээр ангилсан дасгал хэсэг
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card className="type-card">
                <Link to="/exam">
                  <CardActionArea>
                    <CardContent>
                      <Icon className="card-icon">assignment_turned_in</Icon>
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
          <Route
            path="**"
            exact
            component={() => <div>Хуудас олдсонгүй</div>}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
