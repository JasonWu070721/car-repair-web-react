import React, { useEffect } from "react";
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
  GridColumnGroupingModel,
} from "@mui/x-data-grid";

import { TopAppBar } from "../components/TopAppBar";
import { LeftDrawer } from "../components/LeftDrawer";
import { UseCreateCustomerDialog } from "../components/customer/CreateCustomerDialog";
import { UseEditCustomerDialog } from "../components/customer/EditCustomerDialog";

import {
  CustomersApi,
  Configuration,
  CustomersIdGet200Response,
} from "../openapi";

const mdTheme = createTheme();

function DashboardContent() {
  const [topAppBaropen, setTopAppBarOpen] = React.useState(true);

  const [tableRows, setTableRows] = React.useState<CustomersIdGet200Response[]>(
    []
  );

  const [loading, setLoading] = React.useState(true);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const handleCreateOpen = () => {
    setDialogOpen(true);
  };

  const handleEditeOpen = () => {
    setEditDialogOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "license_plate",
      headerName: "License Plate",
      width: 150,
      editable: true,
    },
    {
      field: "car_color",
      headerName: "Car Color",
      width: 110,
      editable: true,
    },
  ];

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  const configuration = new Configuration({
    basePath: "https://127.0.0.1/api/v1",
  });
  const customersApi = new CustomersApi(configuration);

  const fetchGetCustomersApi = async () => {
    await customersApi
      .customersGet()
      .then((res) => {
        setTableRows(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchGetCustomersApi();
  }, []); // paginationModel.pag

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <TopAppBar open={topAppBaropen} setOpen={setTopAppBarOpen} />
        <LeftDrawer open={topAppBaropen} setOpen={setTopAppBarOpen} />

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
            <Button variant="contained" onClick={handleCreateOpen}>
              Create New
            </Button>
            <Button variant="contained" onClick={handleEditeOpen}>
              Edit
            </Button>
            <Button variant="contained" href="#contained-buttons">
              Delete
            </Button>
          </Stack>
          <UseCreateCustomerDialog
            openDialog={dialogOpen}
            setOpenDialog={setDialogOpen}
          />
          <UseEditCustomerDialog
            openDialog={editDialogOpen}
            setOpenDialog={setEditDialogOpen}
            rowSelection={rowSelectionModel}
          />

          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={tableRows}
              getRowId={(row) => row.ID}
              columns={columns}
              experimentalFeatures={{ columnGrouping: true }}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
              loading={loading}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
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
