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
  CustomersPostRequest,
} from "../../openapi";

interface reateCustomerDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const UseCreateCustomerDialog = ({
  openDialog,
  setOpenDialog,
}: reateCustomerDialogProps) => {
  const [createFormatData, setCreateFormatData] =
    useState<CustomersIdGet200Response>({});

  const configuration = new Configuration({
    basePath: "https://127.0.0.1/api/v1",
  });
  const customersApi = new CustomersApi(configuration);

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

  const handleCreateClose = () => {
    setOpenDialog(false);
  };

  const handleCreateSubscribe = () => {
    fetchCreateCustomersApi(createFormatData);

    setOpenDialog(false);
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
  );
};

export { UseCreateCustomerDialog };
