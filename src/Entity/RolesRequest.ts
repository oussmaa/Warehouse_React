import { List } from 'lodash';
 

interface RolesRequest{

    roles:string;
    descrption:string;
    permissions:List<string> ;



}
export default RolesRequest;