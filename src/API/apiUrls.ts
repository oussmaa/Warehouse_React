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
}

const ApiUrls: ApiUrls = {
  //-----Menu
  MENU : "http://127.0.0.1:5050/menurequest",
  GETALLMENU: "http://127.0.0.1:5050/menurequest/getallmenu",
  GETMENUBYID: "http://127.0.0.1:5050/menurequest/getmenubyid/",
  POSTMENU: "http://127.0.0.1:5050/menurequest/addmenu",


  //---Menulabel
  MENULABEL : "http://127.0.0.1:5050/MenuLabelRequest",
  GETLISTLABELBYID: "http://127.0.0.1:5050/MenuLabelRequest/getmenulabelbyid/",
  POSTMENULABEL: "http://127.0.0.1:5050/MenuLabelRequest/addlabelsandMenu/",
  
  //---submenu
  SUBMENU : "http://127.0.0.1:5050/SubMenuRequest",
  GETLISTSUBMENUBYID: "http://127.0.0.1:5050/SubMenuRequest/getsubmenubyid/",
  POSTSUBMENU: "http://127.0.0.1:5050/SubMenuRequest/addsunMenul/",
  GETSUBSUBMENUBYID: "http://127.0.0.1:5050/SubMenuRequest/getsubmenubyid/",
  
  //---User
  USERAPI : "http://127.0.0.1:6090/login",
  GETUSERWITHTOKEN: "http://127.0.0.1:6090/login/GetUser",
  GETUSERBYID: "http://127.0.0.1:6090/login/GetUserById",
  GETIMAGEUSER: "http://127.0.0.1:6090/login/images/",
  GETALLUSERS :"http://127.0.0.1:6090/login/GetAllUsers",
  ADDUSER:"http://127.0.0.1:6090/register/adduser",
  LOGINUSER:"http://127.0.0.1:6090/login/loginuser",

  //---Rolle
  ROLEAPI : "http://127.0.0.1:6090/RolesRequest",
  ALLROLES : "http://127.0.0.1:6090/RolesRequest/getallroles",
  GETROLEBYID : "http://127.0.0.1:6090/RolesRequest/getrolesbyid",
  ADDROLE : "http://127.0.0.1:6090/RolesRequest/addroles",
  UPDATEROLLE : "http://127.0.0.1:6090/RolesRequest/updateroles",
  DELETEROLE : "http://127.0.0.1:6090/RolesRequest/delete",

  //---Articel
  ARTICLEAPI : "http://127.0.0.1:8090/articles",


  //---GoodsReceiptPos
  GOODSRECEIPTPOS : "http://127.0.0.1:8090/goodsReceiptPos",

  //---GoodsReceipt
  GOODSRECEIPT : "http://127.0.0.1:8090/goodsReceipts",

  //---OrderStock 
  ORDERSTOCK :"http://127.0.0.1:8090/orderstocks",

  //--GlobalStock
  GLOBALSTOCK : "http://127.0.0.1:8090/globalestocks",

  //---Supplier
  SUPPLIER : "http://127.0.0.1:8090/suppliers"


};

export default ApiUrls;
