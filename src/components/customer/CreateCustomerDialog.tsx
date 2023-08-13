import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import {
  CustomersApi,
  Configuration,
  CustomersIdGet200Response,
  CustomersIdPutRequest,
} from "../../openapi";

interface reateCustomerDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setTableRows: React.Dispatch<
    React.SetStateAction<CustomersIdGet200Response[]>
  >;
}

const UseCreateCustomerDialog = ({
  openDialog,
  setOpenDialog,
  setTableRows,
}: reateCustomerDialogProps) => {
  const [createFormatData, setCreateFormatData] =
    useState<CustomersIdGet200Response>({});

  const configuration = new Configuration({
    basePath: "https://127.0.0.1/api/v1",
  });
  const customersApi = new CustomersApi(configuration);

  const fetchCreateCustomersApi = async (
    customersIdPutRequest: CustomersIdPutRequest
  ) => {
    const customersPostOperationRequest = {
      customersIdPutRequest,
    };

    await customersApi
      .customersPost(customersPostOperationRequest)
      .then((res) => {
        setTableRows((prev: CustomersIdGet200Response[]) => [...prev, res]);
        setOpenDialog(false);
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

  const handleCreateClose = () => {
    setOpenDialog(false);
  };

  const handleCreateSubscribe = () => {
    fetchCreateCustomersApi(createFormatData);
  };

  return (
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
            setCreateFormatData((prev: CustomersIdGet200Response) => ({
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
            setCreateFormatData((prev: CustomersIdGet200Response) => ({
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
            setCreateFormatData((prev: CustomersIdGet200Response) => ({
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
            setCreateFormatData((prev: CustomersIdGet200Response) => ({
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
  );
};

export { UseCreateCustomerDialog };
