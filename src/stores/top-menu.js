import { atom } from "recoil";
import axios from 'axios';

const topMenu = atom({
  key: "topMenu",
  default: { menu: []}
});

export { topMenu };

// Fetch data from API and update topMenu atom
const fetchDataAndUpdateAtom = async (setTopMenu) => {
   try {
    const apiUrl = 'http://localhost:6060/MenuRequest/getmenubyid/3';
    const response = await axios.get(apiUrl);
    const menuData = response.data; // Assuming the API response directly provides the menu data
    // Update the topMenu atom with the fetched data
    setTopMenu({ menu: menuData });

    console.log("ettt",topMenu.menu)
  } catch (error) {
    console.error('Error fetching menu data:', error);
  }
};

// Call the fetchDataAndUpdateAtom function to fetch and update menu data when needed
 fetchDataAndUpdateAtom();
