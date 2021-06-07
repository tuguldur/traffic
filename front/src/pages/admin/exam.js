import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import { useJsonToCsv } from "react-json-csv";
import { DataGrid } from "@material-ui/data-grid";
import { CloudDownload } from "@material-ui/icons";
import axios from "axios";
import "./style.scss";
const ExamList = () => {
  const [state, setState] = useState(null);
  const { saveAsCsv } = useJsonToCsv();
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "user", headerName: "Хэрэглэгч", width: 210 },
    { field: "point", type: "number", headerName: "Оноо", width: 120 },
    {
      field: "created",
      headerName: "Нээсэн огноо",
      width: 220,
    },
  ];

  useEffect(() => {
    axios.get("/rest/exam/list").then((response) => {
      if (response.data.status) {
        setState(response.data.data);
      }
    });
  }, []);

  return (
    <div className="exams-list">
      <Container maxWidth="md">
        <Paper>
          {!state ? <LinearProgress /> : null}
          <div className="paper-header">
            <h3>Нийт шалгалтын түүх</h3>
            <div>
              {state && (
                <>
                  <IconButton
                    onClick={() =>
                      saveAsCsv({
                        data: state,
                        fields: {
                          _id: "ID",
                          user: "Хэрэглэгч",
                          point: "Оноо",
                          created: "Нээсэн он сар өдөр цаг",
                        },
                        filename: "shaltaltTailan",
                      })
                    }
                  >
                    <CloudDownload />
                  </IconButton>
                </>
              )}
            </div>
          </div>
        </Paper>
        {state ? (
          <Paper className="grid-wrapper">
            <DataGrid
              autoHeight={true}
              disableSelectionOnClick={true}
              className="data-grid"
              getRowId={(row) => row._id}
              rows={state}
              columns={columns}
              pageSize={10}
            />
          </Paper>
        ) : null}
      </Container>
    </div>
  );
};
export default ExamList;
