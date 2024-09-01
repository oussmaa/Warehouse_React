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
  
  readonly DELETESTOCK : string;

  //---Supplier
  readonly SUPPLIER : string;

  // readonly GetListLocationArea:string;

  //---location area
  readonly LOCATIONAREA: string;

  //---LOCATIONBIN
  readonly LOCATIONBIN : string;

  //---LOCATIONPLACES
  readonly LOCATIONPLACE :string;
  readonly AddOrder :string;

  readonly GetALLORDER :string;
  readonly AddOrderPosition :string;
  readonly GetOrderPosition :string;
  readonly GENRATEPICKING:string;
  readonly PICKING:string;
  readonly PICKINGPOSITION:string;
  readonly BOOKPOSITION:string;

  readonly GetLISTCustomer:string;
  readonly AddCustomer:string;

  readonly AddShipmment:String;
  readonly GetListShippment:string;
  readonly GetListPickingNotShippment:string;

 
  
}




const ApiUrls: ApiUrls = {
  //-----Menu
  MENU : "http://127.0.0.1:7070/menurequest",
  GETALLMENU: "http://127.0.0.1:7070/menurequest/getallmenu",
  GETMENUBYID: "http://127.0.0.1:7070/menurequest/getmenubyid/",
  POSTMENU: "http://127.0.0.1:7070/menurequest/addmenu",

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

  DELETESTOCK:"http://127.0.0.1:7070/globalestocks/",
  
  //---Supplier
  SUPPLIER : "http://127.0.0.1:7070/suppliers",
  
  //---LocationArea
  LOCATIONAREA : "http://localhost:7070/locationAreaStocks",

  //---LocationBin 
  LOCATIONBIN : "http://localhost:7070/locationBinStocks",
  
  //---LocationPlace 
  LOCATIONPLACE : "http://localhost:7070/locationPlaces",
//----Picking
  GENRATEPICKING: "http://localhost:7070/ordersgenrate/picking/genratepicking/",
  PICKINGPOSITION:"http://localhost:7070/Picking/getallpickingbyposition/",
  PICKING:"http://localhost:7070/Picking/getallpicking",
  BOOKPOSITION:"http://localhost:7070/picking/position/bookposition/",

  //----ORder
  AddOrder: "http://localhost:7070/ordersgenrate/addorder",
  GetALLORDER: "http://localhost:7070/ordersgenrate/getallorder",
  AddOrderPosition: "http://localhost:7070/ordersgenrate/position/addposition",
  GetOrderPosition:"http://localhost:7070/ordersgenrate/positions/getallpositionbyorder/",
  

  AddShipmment:"http://localhost:7070/shippment/addshipment",
  GetListShippment:"http://localhost:7070/shippment/GetAllshippment", 
  //---Customer
    AddCustomer: "http://localhost:7070/Customer/addcustomer",
    GetLISTCustomer: "http://localhost:7070/Customer/getallcustomer",

    GetListPickingNotShippment:"http://localhost:8090/picking/getallpickingClosed"
};

export default ApiUrls;
