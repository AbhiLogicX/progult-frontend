import axios from 'axios';
import properties from 'src/config/properties';

export async function getReq(reqStr, paramObj) {
  try {
    const response = await axios.get(`${properties.BASE_URL}/${reqStr}`, paramObj);
    return response.data.data;
  } catch (error) {
    return error;
  }
}

export async function postReq(reqStr, data) {
  try {
    const response = await axios.post(`${properties.BASE_URL}/${reqStr}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function patchReq(reqStr, data) {
  try {
    const response = await axios.patchForm(`${properties.BASE_URL}/${reqStr}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
}
