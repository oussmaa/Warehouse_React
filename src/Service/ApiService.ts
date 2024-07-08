import Menu from "../Entity/Menu";
import MenuLabel from "../Entity/MenuLabel";
import SubMenu from "../Entity/SubMenu";
import axios from "axios";
import User from "../Entity/Users";
import Article from "../Entity/Article";
import GoodsReceiptPos from "../Entity/GoodsReceiptPos";
import GoodsReceipt from "../Entity/GoodsReceipt";
import OrderStock from "../Entity/OrderStock";
import Globalestock from "../Entity/Globalestock";
import Supplier from "../Entity/Supplier";
import RolesRequest from "../Entity/RolesRequest";
import Location from "../Entity/LocationPlace";
import LocationArea from "../Entity/LocationArea";
import LocationBin from "../Entity/LocationBin";
import LocationPlace from "../Entity/LocationPlace";

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


//-------------------------
//--- BEGIN : menu requests
//-------------------------
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

    async DeleteMenu(endpoint: string, id : number): Promise<Menu[]> {
      try {
        const token = this.getToken();
        const response = await axios.delete<Menu[]>(`${endpoint}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
      }
    }

    async EditMenu(endpoint: string, id : number, menu : Menu): Promise<Menu[]> {
      try {
        const token = this.getToken();
        const response = await axios.put<Menu[]>(`${endpoint}/${id}`, menu, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error edit data:", error);
        throw error;
      }
    }
//-----------------------
//--- END : menu requests
//-----------------------



//-------------------------------
//--- BEGIN : menu label requests
//-------------------------------
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
    async EditMenuLabel(endpoint: string, id : number, menuLabel : MenuLabel): Promise<MenuLabel[]> {
      try {
        const token = this.getToken();
        const response = await axios.put<MenuLabel[]>(`${endpoint}/${id}`, menuLabel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error edit data:", error);
        throw error;
      }
    }

    async DeleteMenuLabel(endpoint: string, id : number): Promise<MenuLabel[]> {
      try {
        const token = this.getToken();
        const response = await axios.delete<MenuLabel[]>(`${endpoint}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
      }
    }
//-----------------------------
//--- END : menu label requests
//-----------------------------


//----------------------------
//--- BEGIN : submenu requests
//----------------------------
  
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

  async EditSubMenu(endpoint: string, id : number, subMenu : SubMenu): Promise<SubMenu[]> {
    try {
      const token = this.getToken();
      const response = await axios.put<SubMenu[]>(`${endpoint}/${id}`, subMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error edit data:", error);
      throw error;
    }
  }
  
  async DeleteSubMenu(endpoint: string, id : number): Promise<SubMenu[]> {
    try {
      const token = this.getToken();
      const response = await axios.delete<SubMenu[]>(`${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  }
//--------------------------
//--- END : submenu requests
//--------------------------


//-------------------------
//--- BEGIN : user requests
//-------------------------
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

  async getUser(endpoint: string, id : number): Promise<User> {
 
    try {
      const token = this.getToken();
      const URL = id > 0? `${endpoint}/${id}` : `${endpoint}`;
      const response = await axios.get<User>(URL, {
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
  async GetUserProfiles(endpoint: string, token: String): Promise<User> {
    try {
      const token = this.getToken();
      const response = await axios.post<User>(endpoint, { token }, {
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
  async EditUser(endpoint: string,data: any): Promise<User> {
    try {
      const token = this.getToken();
      const response = await axios.put<User>(`${endpoint}`, data, {
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
//-----------------------
//--- END : user requests
//-----------------------


//----------------------------
//--- BEGIN : articel requests
//----------------------------
async AddArticel(endpoint: string, data: Article): Promise<Article> {
  try {
    const token = this.getToken();
    const response = await axios.post<Article>(endpoint, data, {
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

async GetListArticel(endpoint: string): Promise<Article[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<Article[]>(endpoint, {
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

async EditArticel(endpoint: string, id:number, data: Article): Promise<Article> {
  try {
    const token = this.getToken();
    const response = await axios.put<Article>(`${endpoint}/${id}`, data, {
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

async DeletetArticel(endpoint: string, id : number): Promise<Article[]> {
  try {
    const token = this.getToken();
    const response = await axios.delete<Article[]>(`${endpoint}/${id}`, {
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
async DeleteUser(endpoint: string, id : number): Promise<User[]> {
  try {
    const token = this.getToken();
    const response = await axios.delete<User[]>(`${endpoint}${id}`, {
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

//--------------------------
//--- END : articel requests
//--------------------------




//--------------------------
//---Begin : GoodsReceiptPos
//--------------------------
async AddGoodsReceiptPos(endpoint: string, data: GoodsReceiptPos): Promise<GoodsReceiptPos> {
            try {
              const token = this.getToken();
              const response = await axios.post<GoodsReceiptPos>(endpoint, data, {
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

async GetListLocationArea(endpoint: string): Promise<Location[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<Location[]>(endpoint, {
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
async GetListGoodsReceiptPos(endpoint: string): Promise<GoodsReceiptPos[]> {
            try {
              const token = this.getToken();
              const response = await axios.get<GoodsReceiptPos[]>(endpoint, {
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

async EditGoodsReceiptPos(endpoint: string, id:number, data: GoodsReceiptPos): Promise<GoodsReceiptPos> {
            try {
              const token = this.getToken();
              const response = await axios.put<GoodsReceiptPos>(`${endpoint}/${id}`, data, {
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

async DeletetGoodsReceiptPos(endpoint: string, id : number): Promise<GoodsReceiptPos[]> {
          try {
            const token = this.getToken();
            const response = await axios.delete<GoodsReceiptPos[]>(`${endpoint}/${id}`, {
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
//------------------------
//---End : GoodsReceiptPos
//------------------------




//--------------------------
//---Begin : GoodsReceipt
//--------------------------
async AddGoodsReceipt(endpoint: string, data: GoodsReceipt): Promise<GoodsReceipt> {
            try {
              const token = this.getToken();
              const response = await axios.post<GoodsReceipt>(endpoint, data, {
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


async GetListGoodsReceipt(endpoint: string): Promise<GoodsReceipt[]> {
            try {
              const token = this.getToken();
              const response = await axios.get<GoodsReceipt[]>(endpoint, {
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

async EditGoodsReceipt(endpoint: string, id:number, data: GoodsReceipt): Promise<GoodsReceipt> {
            try {
              const token = this.getToken();
              const response = await axios.put<GoodsReceipt>(`${endpoint}/${id}`, data, {
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

async DeletetGoodsReceipt(endpoint: string, id : number): Promise<GoodsReceipt[]> {
          try {
            const token = this.getToken();
            const response = await axios.delete<GoodsReceipt[]>(`${endpoint}/${id}`, {
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
//------------------------
//---End : GoodsReceipt
//------------------------




//------------------------
//---Begin : OrderStock
//------------------------
async AddOrderStock(endpoint: string, data: OrderStock): Promise<OrderStock> {
  try {
    const token = this.getToken();
    const response = await axios.post<OrderStock>(endpoint, data, {
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


async GetListOrderStock(endpoint: string): Promise<OrderStock[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<OrderStock[]>(endpoint, {
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

async EditOrderStock(endpoint: string, id:number, data: OrderStock): Promise<OrderStock> {
  try {
    const token = this.getToken();
    const response = await axios.put<OrderStock>(`${endpoint}/${id}`, data, {
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

async DeletetOrderStock(endpoint: string, id : number): Promise<OrderStock[]> {
try {
  const token = this.getToken();
  const response = await axios.delete<OrderStock[]>(`${endpoint}/${id}`, {
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
//------------------------
//---End : OrderStock
//------------------------



//--------------------------
//---Begin : GlobalStock
//--------------------------
async AddGlobalStock(endpoint: string, data: Globalestock): Promise<Globalestock> {
  try {
    const token = this.getToken();
    const response = await axios.post<Globalestock>(endpoint, data, {
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


async GetListGlobalStock(endpoint: string): Promise<Globalestock[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<Globalestock[]>(endpoint, {
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

async EditGlobalStock(endpoint: string, id:number, data: Globalestock): Promise<Globalestock> {
  try {
    const token = this.getToken();
    const response = await axios.put<Globalestock>(`${endpoint}/${id}`, data, {
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

async DeletetGlobalStock(endpoint: string, id : number): Promise<Globalestock[]> {
try {
  const token = this.getToken();
  const response = await axios.delete<Globalestock[]>(`${endpoint}/${id}`, {
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
//------------------------
//---End : GlobalStock
//------------------------



//--------------------------
//---Begin : Supplier
//--------------------------
async AddSupplier(endpoint: string, data: Globalestock): Promise<Globalestock> {
  try {
    const token = this.getToken();
    const response = await axios.post<Globalestock>(endpoint, data, {
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


async GetListSupplier(endpoint: string): Promise<Supplier[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<Supplier[]>(endpoint, {
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

async EditSupplier(endpoint: string, id:number, data: Supplier): Promise<Supplier> {
  try {
    const token = this.getToken();
    const response = await axios.put<Supplier>(`${endpoint}/${id}`, data, {
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

async DeletetSupplier(endpoint: string, id : number): Promise<Supplier[]> {
try {
  const token = this.getToken();
  const response = await axios.delete<Supplier[]>(`${endpoint}/${id}`, {
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
//------------------------
//---End : Supplier
//------------------------


//------------------------
//---Begin : Role
//------------------------
async GetListRole(endpoint: string): Promise<RolesRequest[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<RolesRequest[]>(endpoint, {
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
async GetRoleById(endpoint: string, id : number): Promise<RolesRequest[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<RolesRequest[]>(`${endpoint}/${id}`, {
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
//------------------------
//---End : Role
//------------------------


//------------------------
//---Begin : LocationArea
//------------------------
async AddLocationArea(endpoint: string, data : LocationArea): Promise<LocationArea> {
  console.log("data of location area" , data)
  try {
    const token = this.getToken();
    const response = await axios.post<LocationArea>(endpoint, data, {
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


async GetLocationAreaList(endpoint: string): Promise<LocationArea[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<LocationArea[]>(endpoint, {
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


async GetLocationAreaById(endpoint: string, id : number): Promise<LocationArea[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<LocationArea[]>(`${endpoint}/${id}`, {
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


async EditLocationArea(endpoint: string, id:number, data: LocationArea ): Promise<LocationArea > {
  try {
    const token = this.getToken();
    const response = await axios.put<LocationArea >(`${endpoint}/${id}`, data, {
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

//------------------------
//---End : LocationArea
//------------------------


//------------------------
//---Begin : LocationBin
//------------------------
async AddLocationBin(endpoint: string, id : number, data : LocationBin): Promise<LocationBin> {
  console.log("data of location Bin" , data)
  try {
    const token = this.getToken();
    const response = await axios.post<LocationBin>(`${endpoint}/${id}`, data, {
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


async GetLocationBinListById(endpoint: string, id : number): Promise<LocationBin[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<LocationBin[]>(`${endpoint}/${id}`, {
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


async GetLocationBinList(endpoint: string): Promise<LocationBin[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<LocationBin[]>(endpoint, {
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


async GetLocationBinById(endpoint: string, id : number): Promise<LocationBin[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<LocationBin[]>(`${endpoint}/${id}`, {
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


async EditLocationBin(endpoint: string, id:number, data: LocationBin ): Promise<LocationBin > {
  try {
    const token = this.getToken();
    const response = await axios.put<LocationBin>(`${endpoint}/${id}`, data, {
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

//------------------------
//---End : LocationBin
//------------------------


//------------------------
//---Begin : LocationBin
//------------------------
async AddLocationPlace(endpoint: string, id : number, data : LocationPlace): Promise<LocationPlace> {
  console.log("data of location Place" , data)
  try {
    const token = this.getToken();
    const response = await axios.post<LocationPlace>(`${endpoint}/${id}`, data, {
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


async GetLocationPlaceListById(endpoint: string, id : number): Promise<LocationPlace[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<LocationPlace[]>(`${endpoint}/${id}`, {
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


async GetLocationPlaceList(endpoint: string): Promise<LocationPlace[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<LocationPlace[]>(endpoint, {
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


async GetLocationPlaceById(endpoint: string, id : number): Promise<LocationPlace[]> {
  try {
    const token = this.getToken();
    const response = await axios.get<LocationPlace[]>(`${endpoint}/${id}`, {
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


async EditLocationPlace(endpoint: string, id:number, data: LocationPlace ): Promise<LocationPlace > {
  try {
    const token = this.getToken();
    const response = await axios.put<LocationPlace>(`${endpoint}/${id}`, data, {
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

//------------------------
//---End : LocationPlace
//------------------------

}

export default new ApiService();
