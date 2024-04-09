interface ApiUrls {
  readonly GETALLMENU: string;
  readonly GETMENUBYID: string;
  readonly GETLISTLABELBYID: string;
  readonly GETLISTSUBMENUBYID: string;
  readonly POSTMENULABEL: string;
  readonly POSTMENU: string;
  readonly POSTSUBMENU: string;

  
}

const ApiUrls: ApiUrls = {
  GETALLMENU: "http://localhost:6060/MenuRequest/getallmenu",
  GETMENUBYID: "http://localhost:6060/MenuRequest/getmenubyid/",
  GETLISTLABELBYID: "http://localhost:6060/MenuLabelRequest/getmenulabelbyid/",
  GETLISTSUBMENUBYID: "http://localhost:6060/SubMenuRequest/getsubmenubyid/",
  POSTMENU: "http://localhost:6060/MenuRequest/addmenu",
  POSTMENULABEL: "http://localhost:6060/MenuLabelRequest/addlabelsandMenu/",
  POSTSUBMENU: "http://localhost:6060/SubMenuRequest/addsunMenul/",

};

export default ApiUrls;
