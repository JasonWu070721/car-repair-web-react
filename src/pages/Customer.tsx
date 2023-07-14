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
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { GridDemoData, useDemoData } from "@mui/x-data-grid-generator";

import { TopAppBar } from "../components/TopAppBar";
import { LeftDrawer } from "../components/LeftDrawer";

const mdTheme = createTheme();

function DashboardContent() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  const [open, setOpen] = React.useState(true);
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [loading, setLoading] = React.useState(false);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(paginationModel.page, data);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, data]);

  function loadServerRows(page: number, data: GridDemoData): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.rows.slice(page * 5, (page + 1) * 5));
      }, Math.random() * 500 + 100); // simulate network latency
    });
  }

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
              {...data}
              rows={rows}
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
