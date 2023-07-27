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
import {
  CustomersApi,
  Configuration,
  CustomersGet200ResponseInner,
} from "../openapi";

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [rows, setRows] = React.useState<CustomersGet200ResponseInner[]>([]);

  const [loading, setLoading] = React.useState(false);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const columns: GridColDef[] = [
    { field: "iD", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "licensePlate",
      headerName: "License Plate",
      width: 150,
      editable: true,
    },
    {
      field: "carColor",
      headerName: "Car Color",
      width: 110,
      editable: true,
    },
  ];

  const configuration = new Configuration({
    basePath: "https://127.0.0.1/api/v1",
  });
  const customersApi = new CustomersApi(configuration);

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  const fetchCustomersApi = async () => {
    await customersApi
      .customersGet()
      .then((res) => {
        setRows(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  React.useEffect(() => {
    fetchCustomersApi();
  }, []); // paginationModel.page

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
              rows={rows}
              getRowId={(row) => row.iD}
              columns={columns}
              isRowSelectable={(params: GridRowParams) =>
                params.row.quantity > 50000
              }
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
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
