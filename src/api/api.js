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
