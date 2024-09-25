import Axios from 'axios';

export const BASE_URL = "https://zenny.azurewebsites.net/api/";

export function httpService() {
  // Create an Axios instance
  const http = Axios.create({
    baseURL: BASE_URL,
  });

  // GET request method
  const httpGet = async (url) => {
    try {
      const response = await http.get(url);
      return response.data;
    } catch (error) {
      console.error('HTTP GET Error:', error);
      throw error;
    }
  };

  // POST request method
  const httpPost = async (url, data) => {
    try {
      const response = await http.post(url, data);
      return response.data;
    } catch (error) {
      console.error('HTTP POST Error:', error);
      throw error;
    }
  };

  // PUT request method
  const httpPut = async (url, data) => {
    try {
      const response = await http.put(url, data);
      return response.data;
    } catch (error) {
      console.error('HTTP PUT Error:', error);
      throw error;
    }
  };

  // PATCH request method
  const httpPatch = async (url, data) => {
    try {
      const response = await http.patch(url, data);
      return response.data;
    } catch (error) {
      console.error('HTTP PATCH Error:', error);
      throw error;
    }
  };

  // DELETE request method
  const httpDelete = async (url, data) => {
    try {
      const response = await http.delete(url, { data });
      return response.data;
    } catch (error) {
      console.error('HTTP DELETE Error:', error);
      throw error;
    }
  };

  // Return the service methods
  return {
    httpGet,
    httpPost,
    httpPut,
    httpPatch,
    httpDelete,
  };
}
