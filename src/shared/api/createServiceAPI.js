import axiosInstance from '../services/http-client';

const CreateServiceAPI = {
  postService: data => {
    const url = 'garage-services';
    return axiosInstance.post(url, data);
  },
};

export default CreateServiceAPI;
