import axiosInstance from '../services/http-client';

const createOwnerAPI = {
  getGarageList: params => {
    const url = 'garages';
    return axiosInstance.get(url, { params });
  },

  postUserData: data => {
    const url = 'users';
    return axiosInstance.post(url, data);
  },
};

export default createOwnerAPI;
