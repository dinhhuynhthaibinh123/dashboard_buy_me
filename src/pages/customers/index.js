import Head from "next/head";
import { Box, Container, TablePagination, Typography } from "@mui/material";
import { CustomerListResults } from "../../components/customer/customer-list-results";
import { CustomerListToolbar } from "../../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { customers } from "../../__mocks__/customers";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";

const DEFAULT_PAGINATION = {
  total: 5,
  page: 1,
  limit: 5,
};
const Page = () => {
  const [userList, setUserList] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [filters, setFilters] = useState({
    search: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      const { response, err } = await userApi.getList(pagination, filters);
      setUserList(response.data);
      setPagination(response.paging);
    };
    getUsers();
  }, [pagination.page, pagination.limit, pagination.total, filters.search]);

  const handleLimitChange = (event) => {
    setPagination({ ...pagination, limit: Number.parseInt(event.target.value) });
  };

  const handlePageChange = (event, currentPage) => {
    setPagination({ ...pagination, page: currentPage + 1 });
  };

  const handleSearch = (search) => {
    setPagination(DEFAULT_PAGINATION);
    setFilters({
      ...filters,
      search,
    });
  };
  return (
    <>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: -1,
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              Customers
            </Typography>
            {/* <Box sx={{ m: 1 }}>
                     <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
                        Export
                     </Button>
                  </Box> */}
          </Box>
          <CustomerListToolbar onSearch={handleSearch} />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={userList} />
          </Box>
          <TablePagination
            component="div"
            count={pagination.total}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={pagination.page - 1}
            rowsPerPage={pagination.limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
