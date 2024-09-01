import Permission from "./Permission";
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
  roles: string;
  images:string;
  adress:string;
  password:string;
  permissions:Permission[]
  permissionNames: string[];

}
export default Users;
