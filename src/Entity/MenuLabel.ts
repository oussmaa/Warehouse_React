import SubMenu from "./SubMenu";

  
  interface MenuLabel {
    id:string;
    activeDropdown: any;
    active: any;
    icon: string;
    title: string;
    pathname: string;
    defaultDate: string; // Assuming defaultDate is a string
    subMenus: SubMenu[]; // Array of SubMenu objects

  }
  export default MenuLabel;