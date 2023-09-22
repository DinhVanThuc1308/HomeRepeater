import axiosInstance from '../services/http-client';

const viewProfileAPI = {
  getMyInfo: (params) => {
    const url = 'users/me';
    return axiosInstance.get(url, { params });
  },
};

export default viewProfileAPI;
