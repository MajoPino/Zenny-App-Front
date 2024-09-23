import Axios, { Axios } from 'axios';

export const BASE_URL = "https://zenny.azurewebsites.net/api/";

export function httpService() {
  
  Axios.create({
    baseURL: BASE_URL,
  });

  const httpGet = async (url) => {
    try {
      const response = await http.get(url);
      return response.data;
    } catch (error) {
      console.error('HTTP GET Error:', error);
      throw error;
    }
  };

  const httpPost = async (url, data) => {
    try {
      const response = await http.post(url, data);
      return response.data;
    } catch (error) {
      console.error('HTTP POST Error:', error);
      throw error;
    }
  };

  const httpPut = async (url, data) => {
    try {
      const response = await http.put(url, data);
      return response.data;
    } catch (error) {
      console.error('HTTP PUT Error:', error);
      throw error;
    }
  };

  const httpPatch = async (url, data) => {
    try {
      const response = await http.patch(url, data);
      return response.data;
    } catch (error) {
      console.error('HTTP PATCH Error:', error);
      throw error;
    }
  };

  const httpDelete = async (url, data) => {
    try {
      const response = await http.delete(url, { data });
      return response.data;
    } catch (error) {
      console.error('HTTP DELETE Error:', error);
      throw error;
    }
  };

  return {
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
  };
}
