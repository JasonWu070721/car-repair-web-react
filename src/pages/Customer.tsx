import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  DataGrid,
  GridRowParams,
  GridRowSelectionModel,
  GridToolbar,
  GridColDef,
} from "@mui/x-data-grid";

import { TopAppBar } from "../components/TopAppBar";
import { LeftDrawer } from "../components/LeftDrawer";
import {
  CustomersApi,
  Configuration,
  CustomersIdGet200Response,
  CustomersPostRequest,
} from "../openapi";

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [tableRows, setTableRows] = React.useState<CustomersIdGet200Response[]>(
    []
  );
  const [createFormatData, setCreateFormatData] =
    React.useState<CustomersIdGet200Response>({});

  const [loading, setLoading] = React.useState(true);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const [openDialog, setDialogOpen] = React.useState(false);

  const handleCreateOpen = () => {
    setDialogOpen(true);
  };

  const handleCreateClose = () => {
    setDialogOpen(false);
  };

  const handleCreateSubscribe = () => {
    fetchCreateCustomersApi(createFormatData);

    setDialogOpen(false);
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

  const fetchCreateCustomersApi = async (
    customersPostRequest: CustomersPostRequest
  ) => {
    const customersPostOperationRequest = {
      customersPostRequest,
    };

    await customersApi
      .customersPost(customersPostOperationRequest)
      .then((res) => {
        console.log(res);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchDeleteCustomersApi = async (_id: number) => {
    await customersApi
      .customersIdDelete({ id: _id })
      .then((res) => {})
      .catch((err) => {
        console.log(err.message);
      });
  };

  React.useEffect(() => {
    fetchGetCustomersApi();
  }, []); // paginationModel.page

  return (
    <ThemeProvider theme={mdTheme}>
      <Dialog open={openDialog} onClose={handleCreateClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Create Customer</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCreateFormatData((prev: any) => ({
                ...prev,
                name: event.target.value,
              }));
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="licensePlate"
            label="License Plate"
            fullWidth
            variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCreateFormatData((prev: any) => ({
                ...prev,
                licensePlate: event.target.value,
              }));
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="carColor"
            label="Car Color"
            fullWidth
            variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCreateFormatData((prev: any) => ({
                ...prev,
                carColor: event.target.value,
              }));
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="carYear"
            label="Car Year"
            fullWidth
            variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCreateFormatData((prev: any) => ({
                ...prev,
                carYear: event.target.value,
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button onClick={handleCreateSubscribe}>Subscribe</Button>
        </DialogActions>
      </Dialog>

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
            <Button variant="contained" onClick={handleCreateOpen}>
              Create New
            </Button>
            <Button variant="contained">Edit</Button>
            <Button variant="contained" href="#contained-buttons">
              Delete
            </Button>
          </Stack>

          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={tableRows}
              getRowId={(row) => row.ID}
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
