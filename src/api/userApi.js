import privateClient from "./client";

const userEndpoints = {
  list: "/users",
  add: "/favourites",
  delete: "/favourites",
};

const userApi = {
  getList: async (pagination, filters) => {
    console.log(pagination);
    console.log(filters);
    try {
      const response = await privateClient.get(userEndpoints.list, {
        params: {
          limit: pagination.limit,
          page: pagination.page,
          search: filters.search,
        },
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  removeItem: async (data) => {
    try {
      const response = await privateClient.delete(userEndpoints.delete, {
        data,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
