import axiosInstance from '../services/http-client';

const updateServiceAPI = {
  getDataFromId: id => {
    const url = `garage-services/${id}`;
    return axiosInstance.get(url);
  },

  updateServiceData: (id, data) => {
    const url = `garage-services/${id}`;
    return axiosInstance.put(url, data);
  },
};

export default updateServiceAPI;
