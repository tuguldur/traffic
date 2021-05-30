import React, { useContext, useEffect, useState, useState } from "react";
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
      <Container maxWidth="sm">
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
            <Typography variant="subtitle1" gutterBottom>
              Энэ жилийн тестийн түүх
            </Typography>
            <CalendarHeatmap
              startDate={moment().startOf("year").format("YYYY-MM-DD")}
              endDate={moment().endOf("year").format("YYYY-MM-DD")}
              values={[
                { date: "2016-01-01" },
                { date: "2016-01-22" },
                { date: "2016-01-30" },
              ]}
            />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
export default Profile;
