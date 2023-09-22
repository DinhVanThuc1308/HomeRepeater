import axiosInstance from '../services/http-client';

const updateGarageAPI = {
  getGarageServiceList: params => {
    const url = 'garage-services';
    return axiosInstance.get(url, { params });
  },

  getExistingGarageData: (id, params) => {
    const url = `garages/${id}`;
    return axiosInstance.get(url, { params });
  },

  getOwnerList: () => {
    const url = 'users';
    return axiosInstance.get(url);
  },

  updateGarageData: (id, data) => {
    const url = `garages/${id}`;
    return axiosInstance.put(url, data);
  },
};

export default updateGarageAPI;
