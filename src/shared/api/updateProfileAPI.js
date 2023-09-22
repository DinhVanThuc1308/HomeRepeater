import axiosInstance from '../services/http-client';

const updateProfileAPI = {
  getProfileData: params => {
    const url = 'users/me';
    return axiosInstance.get(url, { params });
  },

  updateAvatar: (filesImg, idNumber) => {
    const formData = new FormData();
    formData.append('ref', 'plugin::users-permissions.user');
    formData.append('refId', idNumber);
    formData.append('field', 'avatar');
    formData.append('files', filesImg);
    const url = 'upload';
    return axiosInstance.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 2 * 60 * 1000,
    });
  },

  updateProfileData: (data, id) => {
    const url = `users/${id}`;
    return axiosInstance.put(url, data);
  },
};

export default updateProfileAPI;
