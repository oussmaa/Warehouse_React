// apiService.ts

import Menu from "../layouts/top-menu/Menu";

 
class ApiService {
  // Function to make a GET request
  async get(endpoint: string): Promise<Menu> {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  // Function to make a POST request
  async post(endpoint: string, data: Menu): Promise<Menu> {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }
}

export default  new  ApiService();
