import Menu from "../Entity/Menu";
import MenuLabel from "../Entity/MenuLabel";
import SubMenu from "../Entity/SubMenu";
import axios from "axios";
import User from "../Entity/Users";

class ApiService {
  // Function to get the token from local storage
  getToken(): string | null {
    const token = localStorage.getItem("token");
    if (token) {
      return token.replace(/"/g, ""); // Strip any unwanted characters
    }
    return null;
  }
  // Function to make a GET request with token in headers
  async get(endpoint: string): Promise<Menu> {
    try {
      const token = this.getToken();
      const response = await axios.get<Menu>(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async GetListMenu(endpoint: string): Promise<Menu[]> {
    try {
      const token = this.getToken();
      const response = await axios.get<Menu[]>(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  

  async GetListUsers(endpoint: string): Promise<User[]> {
    try {
      const token = this.getToken();
      const response = await axios.get<User[]>(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async GetListMenuLabel(endpoint: string): Promise<MenuLabel[]> {
    try {
      const token = this.getToken();
      const response = await axios.get<MenuLabel[]>(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  async GetListSubMenu(endpoint: string): Promise<SubMenu[]> {
    try {
      const token = this.getToken();
      const response = await axios.get<SubMenu[]>(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async GetImageUser(endpoint: string): Promise<any> {
    try {
      const token = this.getToken();
      const response = await axios.get<any>(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async getUser(endpoint: string, body: any): Promise<User> {
    try {
      const token = this.getToken();
      console.log(body);
      const response = await axios.post<User>(endpoint, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  // Function to make a POST request with token in headers
  async AddMenu(endpoint: string, data: Menu): Promise<Menu> {
    try {
      const token = this.getToken();
      const response = await axios.post<Menu>(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  }

  async AddUser(endpoint: string, data: User): Promise<User> {
    try {
      const token = this.getToken();
      const response = await axios.post<User>(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
       console.error("Error posting data:", error);
      throw error;
    }
  }

  async AddMenuLabel(endpoint: string, data: MenuLabel): Promise<MenuLabel> {
    try {
      const token = this.getToken();
      const response = await axios.post<MenuLabel>(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  }

  async AddSubMenu(endpoint: string, data: SubMenu): Promise<SubMenu> {
    try {
      const token = this.getToken();
      const response = await axios.post<SubMenu>(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  }
}

export default new ApiService();
