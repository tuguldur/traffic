import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
} from "@material-ui/core";
import { User } from "global/user";
import moment from "moment";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.scss";
const Profile = () => {
  const { user } = useContext(User);
  const [state, setState] = useState(null);
  useEffect(() => {
    axios.get("/rest/exam/log").then((response) => {
      if (response.data.status) {
        setState(response.data.data);
      }
    });
  }, []);

  return (
    <div className="profile">
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Хувийн мэдээлэл
            </Typography>
            <Divider />

            {user && state && (
              <div className="profile-wrapper">
                <div className="avatar-wrapper">
                  <div className="avatar-container">
                    <Avatar
                      alt=""
                      referrerPolicy="no-referrer"
                      src={user.avatar}
                    />
                    <Typography variant="button">{user.name}</Typography>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div>
                    {user.created
                      ? `${moment(user.created).fromNow()} нэгдсэн`
                      : null}
                  </div>
                </div>
              </div>
            )}
            <Divider />

            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginTop: 10 }}
            >
              Энэ жилийн тестийн түүх ({state?.length || 0})
            </Typography>
            {state?.length > 0 && (
              <CalendarHeatmap
                startDate={moment().startOf("year").format("YYYY-MM-DD")}
                endDate={moment().endOf("year").format("YYYY-MM-DD")}
                horizontal={true}
                showWeekdayLabels
                weekdayLabels={["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"]}
                monthLabels={[
                  "1 сар",
                  "2 сар",
                  "3 сар",
                  "4 сар",
                  "5 сар",
                  "6 сар",
                  "7 сар",
                  "8 сар",
                  "9 сар",
                  "10 сар",
                  "11 сар",
                  "12 сар",
                ]}
                values={state.map((exam) => ({
                  date: exam.created,
                }))}
              />
            )}
            <div className="link-history">
              <Link to="/exam/history">Нийт түүх үзэх</Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
export default Profile;
