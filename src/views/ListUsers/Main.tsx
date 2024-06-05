import { Lucide, Modal, ModalBody } from "@/base-components";
import { useNavigate } from "react-router-dom";

import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import { useEffect, useState } from "react";
import React from "react";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import Menu from "../../Entity/Menu";
import Users from "../../Entity/Users";
 
function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [formattedUser, setFormattedUser] = useState<Users[]>([]);
  const navigate = useNavigate();
 
 

  const fetchDataAndUpdateMenu = async () => {
    try {
       const userData = await apiService.GetListUsers(ApiUrls.GETALLUSERS);
       setFormattedUser(userData);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateMenu();
 
  }, []);

  return (
    <>
       <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
 
          <div className="hidden md:block mx-auto text-slate-500">
            List Of Users
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
              <th className="whitespace-nowrap"> Id</th>
                <th className="whitespace-nowrap"> Type</th>
                <th className="whitespace-nowrap"> Username</th>
                <th className="text-center whitespace-nowrap">Email</th>
                <th className="text-center whitespace-nowrap">Name User</th>
                <th className="whitespace-nowrap"> Locked</th>
                <th className="whitespace-nowrap"> Phone</th>
                <th className="text-center whitespace-nowrap">Theme Id</th>
                <th className="whitespace-nowrap"> Role</th>
                <th className="whitespace-nowrap"> Images</th>
                <th className="whitespace-nowrap"> Adress</th>

                <th className="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {formattedUser && Array.isArray(formattedUser) && formattedUser.map((user, keyy) => (
                <tr key={keyy} className="intro-x">
                                      <td>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.id}
                    </div>
                  </td>
                  <td>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.type}
                    </div>
                  </td>
                  <td>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.username}
                    </div>
                  </td>
                  <td>
                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.email}
                    </div>
                    </td>
                    <td>
                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.name}
                    </div>
                    </td>    
                    <td>
                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.locked} 
                    </div>
                    </td>        
                    <td>
                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.phone}
                    </div>
                    </td>   
                    <td>
                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.themeid}
                    </div>
                    </td>   

                    <td>
                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.userrole}
                    </div>
                    </td>                      
                    <td>
                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                  <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="logo__image w-6"
                
                  src={`http://localhost:6080/images/${user?.images}`} 
                />
                    </div>
                    </td>    

                    <td>
                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {user.adress}
                    </div>
                    </td>             

                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <a className="flex items-center mr-3"    >
                        <Lucide
                           
                          icon="CheckSquare"
                          className="w-4 h-4 mr-1"
                        />{" "}
                        Edit
                      </a>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={() => {
                          setDeleteConfirmationModal(true);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
          <select className="w-20 form-select box mt-3 sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div>
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete these menu ? <br />
              
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger w-24">
              Delete

            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;
   