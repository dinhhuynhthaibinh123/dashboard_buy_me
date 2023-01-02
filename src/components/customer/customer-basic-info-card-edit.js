import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputAdornment,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { CustomSelectField, CustomTextField } from "components/form-controls";

import { regexVietnamesePhoneNumber } from "../../utils/get-initials";

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { ConfirmDialog } from "../confirm-dialog";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { LoadingBackdrop } from "components/loading";

const schema = yup.object().shape({
  name: yup.string().max(255),
  phone: yup
    .string()
    .max(255)
    .test("is-vietnamese-phonenumber1", "Incorrect phone number format.", (number) => {
      if (!number) return true;

      return regexVietnamesePhoneNumber.test(number);
    }),
  email: yup.string().email().max(255).nullable(),
  deliveryInfo: yup.object().shape({
    name: yup.string().max(255),
    phone: yup
      .string()
      .max(255)

      .test("is-vietnamese-phonenumber2", "Incorrect phone number format.", (number) => {
        if (!number) return true;

        return regexVietnamesePhoneNumber.test(number);
      }),
    email: yup.string().email().max(255).nullable(),
    address: yup.object().shape({
      street: yup.string().max(255),
      ward: yup.string().max(255),
      district: yup.string().max(255),
      province: yup.string().max(255),
    }),
  }),
});
const CustomerBasicInfoCardEdit = ({ customer, onSave, onDelete }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      phone: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (customer) {
      reset({
        username: customer.username,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
      });
    }
  }, [customer, reset]);

  const handleSave = async (values) => {
    console.log(values);
    //  if (onSave) {
    //    const payload = { ...values };
    //    await onSave(payload);
    //  }
  };

  const handleDeleteClick = async (event) => {
    //  setOpenConfirmDialog(false);
    //  setLoading(true);
    //  if (onDelete) await onDelete();
    //  setLoading(false);
  };

  return (
    <Card>
      {/* <LoadingBackdrop open={loading} /> */}

      <CardHeader title="Edit customer" />
      <Divider />
      <CardContent>
        <form onSubmit={handleSubmit(handleSave)}>
          <Typography variant="subtitle1">Account information</Typography>
          <Grid container columnSpacing={3} sx={{ mb: 2 }}>
            <Grid item md={9} xs={12}>
              <CustomTextField
                disabled={isSubmitting || !customer}
                control={control}
                name="name"
                label="Full Name"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <CustomTextField disabled={true} control={control} name="username" label="Username" />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField
                disabled={isSubmitting || !customer}
                control={control}
                type="number"
                name="phone"
                label="Phone Number"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField
                disabled={isSubmitting || !customer}
                control={control}
                name="email"
                label="Email"
              />
            </Grid>
          </Grid>
          <Divider />
        </form>
      </CardContent>
      {customer && (
        <CardActions sx={{ m: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href={`/customers/${customer._id}`} passHref legacyBehavior>
              <Button variant="outlined" disabled={isSubmitting}>
                Cancel
              </Button>
            </Link>
            <Button variant="contained" onClick={handleSubmit(handleSave)} disabled={isSubmitting}>
              Update
            </Button>
          </Box>
          <Button
            variant="text"
            color="error"
            disabled={isSubmitting}
            onClick={() => setOpenConfirmDialog(true)}
          >
            Delete customer
          </Button>
        </CardActions>
      )}

      <ConfirmDialog
        icon={
          <Avatar sx={{ bgcolor: "rgba(209, 67, 67, 0.08)", color: "rgb(209, 67, 67)" }}>
            <ReportProblemIcon />
          </Avatar>
        }
        isOpen={openConfirmDialog}
        title="Are you sure?"
        body="Are you sure to delete this customer?"
        onSubmit={handleDeleteClick}
        onClose={() => setOpenConfirmDialog(false)}
      />
    </Card>
  );
};

export default CustomerBasicInfoCardEdit;
