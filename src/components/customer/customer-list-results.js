import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials, stringToColour } from "../../utils/get-initials";
let bgColor = [
  "#ab000d",
  "#5c007a",
  "#00227b",
  "#00701a",
  "#8c9900",
  "#c68400",
  "#40241a",
  "#29434e",
  "#ab000d",
  "#5c007a",
];

export const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell
                    sx={{
                      width: 250,
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        style={{
                          backgroundColor: bgColor[customers.indexOf(customer)],
                        }}
                        src={customer.avatar?.url}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.first_name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {customer.first_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: 250,
                    }}
                  >
                    {customer.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      width: 250,
                    }}
                  >
                    {customer.phone || "N/A"}
                  </TableCell>
                  <TableCell
                    sx={{
                      width: 250,
                    }}
                  >
                    {format(new Date(customer.created_at), "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
