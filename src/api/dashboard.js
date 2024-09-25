import { httpService } from './http.js';

const { httpGet } = httpService();

export function dashboard() {

  const getCategory = async function getCategory() {
    try {
      // Call httpGet with only the endpoint URL
      let response = await httpGet("Category");
      console.log("Response: ",response); // Logs the entire response
      return response.content; // Assuming the response has a `content` property
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  return {
    getCategory,
  };
}

