import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import {
  CustomersApi,
  Configuration,
  CustomersIdGet200Response,
  CustomersIdPutRequest,
} from "../../openapi";

import { GridRowSelectionModel } from "@mui/x-data-grid";

interface reateCustomerDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  rowSelection: GridRowSelectionModel;
  setTableRows: React.Dispatch<
    React.SetStateAction<CustomersIdGet200Response[]>
  >;
}

const UseEditCustomerDialog = ({
  openDialog,
  setOpenDialog,
  rowSelection,
  setTableRows,
}: reateCustomerDialogProps) => {
  const [editFormatData, setEditFormatData] =
    useState<CustomersIdGet200Response>({});

  const configuration = new Configuration({
    basePath: "https://127.0.0.1/api/v1",
  });
  const customersApi = new CustomersApi(configuration);

  const fetchCustomersIdPutApi = async (
    customersIdPutRequest: CustomersIdPutRequest
  ) => {
    const customersId = rowSelection[rowSelection.length - 1];
    const customersPostOperationRequest = {
      id: customersId,
      customersIdPutRequest,
    };

    await customersApi
      .customersIdPut(customersPostOperationRequest)
      .then((res) => {
        setTableRows((prev: CustomersIdGet200Response[]) => {
          const editId = prev.findIndex(
            (customer) => customer.id === customersId
          );

          const oldCustomer = prev[editId];
          // TODO: Modify customers data
          console.log(prev[editId]);

          return prev;
        });
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

  const fetcIdGetCustomersApi = async (_id: number) => {
    await customersApi
      .customersIdGet({ id: _id })
      .then((res: CustomersIdGet200Response) => {
        setEditFormatData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubscribe = () => {
    fetchCustomersIdPutApi(editFormatData);

    setOpenDialog(false);
  };

  useEffect(() => {
    const customersId = rowSelection[rowSelection.length - 1];
    if (typeof customersId === "number") {
      fetcIdGetCustomersApi(customersId);
    }
  }, [rowSelection]); // paginationModel.pag

  return (
    <Dialog open={openDialog} onClose={handleClose}>
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
          defaultValue={editFormatData.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEditFormatData((prev: any) => ({
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
          defaultValue={editFormatData.licensePlate}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEditFormatData((prev: any) => ({
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
          defaultValue={editFormatData.carColor}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEditFormatData((prev: any) => ({
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
          defaultValue={editFormatData.carYear}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEditFormatData((prev: any) => ({
              ...prev,
              carYear: event.target.value,
            }));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubscribe}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export { UseEditCustomerDialog };
