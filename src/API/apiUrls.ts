interface ApiUrls {
  readonly GETALLMENU: string;
  readonly GETMENUBYID: string;
  readonly GETLISTLABELBYID: string;
  readonly GETLISTSUBMENUBYID: string;
  readonly POSTMENULABEL: string;
  readonly POSTMENU: string;
  readonly POSTSUBMENU: string;
  readonly GETIMAGEUSER: string;
  readonly GETUSERWITHTOKEN: string;
  readonly GETALLUSERS: string;
  readonly ADDUSER: string;
  readonly LOGINUSER: string;
  readonly GETSUBSUBMENUBYID: string;

  

}

const ApiUrls: ApiUrls = {
  GETALLMENU: "http://127.0.0.1:7070/menurequest/getallmenu",
  GETMENUBYID: "http://127.0.0.1:7070/menurequest/getmenubyid/",
  GETLISTLABELBYID: "http://127.0.0.1:7070/MenuLabelRequest/getmenulabelbyid/",
  GETLISTSUBMENUBYID: "http://127.0.0.1:7070/SubMenuRequest/getsubmenubyid/",
  POSTMENU: "http://127.0.0.1:7070/menurequest/addmenu",
  POSTMENULABEL: "http://127.0.0.1:7070/MenuLabelRequest/addlabelsandMenu/",
  POSTSUBMENU: "http://127.0.0.1:7070/SubMenuRequest/addsunMenul/",
  GETSUBSUBMENUBYID: "http://127.0.0.1:7070/SubMenuRequest/getsubmenubyid/",
  GETUSERWITHTOKEN: "http://127.0.0.1:7070/login/GetUser",
  GETIMAGEUSER: "http://127.0.0.1:7070/login/images/",
  GETALLUSERS :"http://127.0.0.1:7070/login/GetAllUsers",
  ADDUSER:"http://127.0.0.1:7070/register/adduser",
  LOGINUSER:"http://127.0.0.1:7070/login/loginuser",


};

export default ApiUrls;
