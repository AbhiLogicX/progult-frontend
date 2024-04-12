import axios from 'axios';

import properties from 'src/config/properties';

export async function getReq(reqStr) {
  const heads = JSON.parse(localStorage.getItem('tokens'));
  // console.log('heads', heads, `Bearer ${heads.accessToken}`);
  try {
    const response = await axios.get(`${properties.BASE_URL}/${reqStr}`, {
      headers: {
        Authorization: `Bearer ${heads.accessToken}`,
      },
    });
    if (response.data.statusCode) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function postReq(reqStr, data, headers) {
  try {
    const response = await axios.post(`${properties.BASE_URL}/${reqStr}`, data, headers);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function patchReq(reqStr, data, headers) {
  try {
    const response = await axios.patch(`${properties.BASE_URL}/${reqStr}`, data, headers);
    return response.data;
  } catch (error) {
    return error;
  }
}
