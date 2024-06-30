interface ApiUrls {
  //----Menu
  readonly MENU: string;
  readonly GETMENUBYID: string;
  readonly GETALLMENU: string;
  readonly POSTMENU: string;
  
  //---MenuLabel
  readonly GETLISTLABELBYID: string;
  readonly MENULABEL : string;
  readonly POSTMENULABEL: string;


  //---SubMenu
  readonly SUBMENU : string,
  readonly GETLISTSUBMENUBYID: string;
  readonly POSTSUBMENU: string;
  readonly GETSUBSUBMENUBYID: string;
  
  //---User
  readonly USERAPI: string;
  readonly GETIMAGEUSER: string;
  readonly GETALLUSERS: string;
  readonly ADDUSER: string;
  readonly GETUSERWITHTOKEN: string;
  readonly GETUSERBYID : string;
  readonly DELETUSER : string; 


  readonly LOGINUSER: string;

  //---Role
  readonly ROLEAPI : string; 
  readonly ALLROLES : string; 
  readonly GETROLEBYID : string; 
  readonly ADDROLE : string; 
  readonly UPDATEROLLE : string; 
  readonly DELETEROLE : string; 


  //---Articel
  readonly ARTICLEAPI : string;

  //--GoodsReceiptPos
  readonly GOODSRECEIPTPOS : string;
  
  //--GoodsReceiptPos
  readonly GOODSRECEIPT : string;

  //--OrderStock
  readonly ORDERSTOCK : string;

  //--GlobalStock 
  readonly GLOBALSTOCK : string;

  //---Supplier
  readonly SUPPLIER : string;

  readonly GetListLocationArea:string;
}

const ApiUrls: ApiUrls = {
  //-----Menu
  MENU : "http://127.0.0.1:7070/menurequest",
  GETALLMENU: "http://127.0.0.1:7070/menurequest/getallmenu",
  GETMENUBYID: "http://127.0.0.1:7070/menurequest/getmenubyid/",
  POSTMENU: "http://127.0.0.1:7070/menurequest/addmenu",

  GetListLocationArea:"http://localhost:7070/locationAreaStocks",
  //---Menulabel
  MENULABEL : "http://127.0.0.1:7070/MenuLabelRequest",
  GETLISTLABELBYID: "http://127.0.0.1:7070/MenuLabelRequest/getmenulabelbyid/",
  POSTMENULABEL: "http://127.0.0.1:7070/MenuLabelRequest/addlabelsandMenu/",
  
  //---submenu
  SUBMENU : "http://127.0.0.1:7070/SubMenuRequest",
  GETLISTSUBMENUBYID: "http://127.0.0.1:7070/SubMenuRequest/getsubmenubyid/",
  POSTSUBMENU: "http://127.0.0.1:7070/SubMenuRequest/addsunMenul/",
  GETSUBSUBMENUBYID: "http://127.0.0.1:7070/SubMenuRequest/getsubmenubyid/",
  
  //---User
  USERAPI : "http://127.0.0.1:7070/login/UpdateUser/",
  GETUSERWITHTOKEN: "http://127.0.0.1:7070/login/GetUser",
  GETUSERBYID: "http://127.0.0.1:7070/login/GetUserById",
  GETIMAGEUSER: "http://127.0.0.1:7070/login/images/",
  GETALLUSERS :"http://127.0.0.1:7070/login/GetAllUsers",
  ADDUSER:"http://127.0.0.1:7070/register/adduser",
  LOGINUSER:"http://127.0.0.1:7070/login/loginuser",
  DELETUSER:"http://127.0.0.1:7070/login/deleteUser/",

  //---Rolle
  ROLEAPI : "http://127.0.0.1:7070/RolesRequest",
  ALLROLES : "http://127.0.0.1:7070/RolesRequest/getallroles",
  GETROLEBYID : "http://127.0.0.1:7070/RolesRequest/getrolesbyid",
  ADDROLE : "http://127.0.0.1:7070/RolesRequest/addroles",
  UPDATEROLLE : "http://127.0.0.1:7070/RolesRequest/updateroles",
  DELETEROLE : "http://127.0.0.1:7070/RolesRequest/delete",

  //---Articel
  ARTICLEAPI : "http://127.0.0.1:7070/articles",


  //---GoodsReceiptPos
  GOODSRECEIPTPOS : "http://127.0.0.1:7070/goodsReceiptPos",

  //---GoodsReceipt
  GOODSRECEIPT : "http://127.0.0.1:7070/goodsReceipts",

  //---OrderStock 
  ORDERSTOCK :"http://127.0.0.1:7070/orderstocks",

  //--GlobalStock
  GLOBALSTOCK : "http://127.0.0.1:7070/globalestocks",

  //---Supplier
  SUPPLIER : "http://127.0.0.1:7070/suppliers"


};

export default ApiUrls;
