import RolesRequest from "./RolesRequest";

 
interface Users {
  id:any;
  token: string;
  type: string;
  username: string;
  email: string;
  name: string;
  locked: boolean;
  phone: string;
  themeid: number;
  userrole: string
  images:string;
  adress:string;
  password:string;
  rolesRequest:RolesRequest;

}
export default Users;
