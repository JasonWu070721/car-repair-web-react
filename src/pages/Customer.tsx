import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import {
  DataGrid,
  GridRowParams,
  GridRowSelectionModel,
  GridToolbar,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { TopAppBar } from "../components/TopAppBar";
import { LeftDrawer } from "../components/LeftDrawer";
import { CustomersApi, Configuration } from "../openapi";

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const configuration = new Configuration({
    basePath: "http://127.0.0.1:3000/api/v1",
  });
  const customersApi = new CustomersApi(configuration);

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  React.useEffect(() => {
    customersApi
      .customersGet()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });

    return () => {};
  }, [paginationModel.page]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <TopAppBar open={open} setOpen={setOpen} />
        <LeftDrawer open={open} setOpen={setOpen} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Stack direction="row" spacing={2}>
            <Button variant="contained">Create New</Button>
            <Button variant="contained">Edit</Button>
            <Button variant="contained" href="#contained-buttons">
              Delete
            </Button>
          </Stack>

          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              // {...data}
              rows={rows}
              columns={columns}
              isRowSelectable={(params: GridRowParams) =>
                params.row.quantity > 50000
              }
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                // console.log(newRowSelectionModel);
                setRowSelectionModel(newRowSelectionModel);
                // console.log([data.rows[0]["id"]]);
              }}
              rowSelectionModel={rowSelectionModel}
              loading={loading}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5]}
              rowCount={100}
              paginationMode="server"
              keepNonExistentRowsSelected
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
            />
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
