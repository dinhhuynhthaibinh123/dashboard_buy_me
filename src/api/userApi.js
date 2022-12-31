import privateClient from "./client";

const userEndpoints = {
  list: "/users",
  add: "/favourites",
  delete: "/favourites",
};

const userApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(userEndpoints.list);
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
