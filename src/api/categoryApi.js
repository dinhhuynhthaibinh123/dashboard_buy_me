import privateClient from "./client";

const categoryEndpoints = {
  list: "/categories",
};

const categoryApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(categoryEndpoints.list);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};


// {
//   data: {
//     food_id: 1
//   }
// }

export default categoryApi;
