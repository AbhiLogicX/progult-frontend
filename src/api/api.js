import axios from 'axios';

// import properties from 'src/config/properties';

// const heads = JSON.parse(localStorage.getItem('tokens'));

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  // baseURL: properties.BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${heads?.accessToken}`,
  // },
});

export async function getReq(reqStr) {
  try {
    const response = await axiosInstance.get(`/${reqStr}`);

    if (response.data.statusCode) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    return error;
  }
}

// axios.defaults.withCredentials = true;

// response.headers = {
//   "Set-Cookie": `access_token=${token}; Max-Age=${86400}; HttpOnly; SameSite=None; Secure; Path=/`,
// };

export async function postReq(reqStr, data) {
  try {
    const response = await axiosInstance.post(`/${reqStr}`, data);
    return response.data;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

export async function patchReq(reqStr, data) {
  try {
    const response = await axiosInstance.patch(`/${reqStr}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function deleteReq(reqStr) {
  try {
    const response = await axiosInstance.delete(`/${reqStr}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
