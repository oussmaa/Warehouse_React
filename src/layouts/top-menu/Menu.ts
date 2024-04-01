import { iteratee } from "lodash";

// Define interfaces for SubMenu and MenuLabel
interface SubMenu {
  icon: string;
  title: string;
  pathname: string;
  defaultDate: string; // Assuming defaultDate is a string
}

interface MenuLabel {
  icon: string;
  title: string;
  pathname: string;
  defaultDate: string; // Assuming defaultDate is a string
  subMenus: SubMenu[]; // Array of SubMenu objects
}

// Define the Menu class
interface Menu {

  id:number;
  defaultDate: string;
  colorMenu: string;
  nameMenu: string;
  menuLabels: MenuLabel[];

 
}

export default Menu;
