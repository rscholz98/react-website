import React, { useState, useRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Papa from "papaparse";
import Plot from "react-plotly.js";

const DataLoading = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [plotData, setPlotData] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const data = result.data;
        if (data.length > 0) {
          const headers = data[0].map((header, index) => ({
            field: `field${index}`,
            headerName: header,
            width: 150,
          }));
          const rowsData = data.slice(1).map((row, index) => {
            const rowData = {};
            row.forEach((element, idx) => {
              rowData[`field${idx}`] = element;
            });
            return { id: index, ...rowData };
          });

          setColumns(headers);
          setRows(rowsData);
          preparePlotData(data);
        }
      },
      header: false,
    });
  };

  const preparePlotData = (data) => {
    const plotData = data[0].slice(1).map((header, index) => {
      // Assuming the first column is x-axis
      return {
        type: "scatter",
        mode: "lines+markers",
        name: header,
        x: data.slice(1).map((row) => row[0]), // First column as x-axis
        y: data.slice(1).map((row) => row[index + 1]), // Current column as y-axis
      };
    });

    setPlotData(plotData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={() => fileInputRef.current.click()}
        >
          Upload file
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </Button>
      </Grid>
      <Grid item xs={6} style={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Grid>
      {plotData.length > 0 && (
        <Grid item xs={6}>
          <Plot
            data={plotData}
            layout={{
              width: "100%",
              height: 500,
              title: "CSV Data Visualization",
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default DataLoading;
