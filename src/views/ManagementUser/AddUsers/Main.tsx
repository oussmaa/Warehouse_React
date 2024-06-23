import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import React, { useState } from "react";
import { useEffect } from "react";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
 
import { useNavigate } from "react-router-dom";
 
import { Alert } from "@/base-components";
import RolesRequest from "../../../Entity/RolesRequest";
import Users from "../../../Entity/Users";
import Menu from "../../../Entity/Menu";
import { number } from "prop-types";

function Main() {
  const [formattedMenu, setFormattedMenu] = useState<Menu[]>([]);
  const [Username, setUsername] = useState("");
  const [Name, setName] = useState("");
  const [Type, setType] = useState("");
  const [Email, setEmail] = useState("");
  const [Locked, setLocked] = useState("");
  const [Phone, setPhone] = useState("");
  const [Themeid, setThemeid] = useState("");
  const [Userrole, setUserrole] = useState("");
  const [Adress, setAdress] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    Insert: false,
    Delete: false,
    Update: false,
  });

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  let Permissionsdelete: any;
  let PermissionsUpdate: any;
  let PermissionsInsert: any;

  const ValidateInput = async () => {
    if (checkboxes.Delete) {
      Permissionsdelete = "DELETE";
    }

    if (checkboxes.Update) {
      PermissionsUpdate = "UPDTAE";
    }

    if (checkboxes.Insert) {
      PermissionsInsert = "INSERT";
    }

    const rolesandpermissions: RolesRequest = {
      roles: Userrole,
      descrption: "roles",
      permissions: [PermissionsInsert, PermissionsUpdate, Permissionsdelete],
    };

    const user: Users = {
      id: 0,
      token: "",
      type: Type,
      username: Username,
      email: Email,
      name: Name,
      locked: false,
      phone: Phone,
      themeid: Number(Themeid),
      images: "test.png",
      adress: Adress,
      userrole: 1,
      password: Password,
      rolesRequest: rolesandpermissions,
    };
    function validateUser(user: Users): string | null {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+216\d{8,14}$/; // Modified regex to check for +218 country code

      if (typeof user.username !== "string" || user.username.trim() === "") {
        return "Invalid username";
      }

      if (!emailRegex.test(user.email)) {
        return "Invalid email";
      }

      if (typeof user.name !== "string" || user.name.trim() === "") {
        return "Invalid name";
      }

      if (typeof user.locked !== "boolean") {
        return "Locked must be a boolean";
      }

      if (!phoneRegex.test(user.phone)) {
        return "Invalid phone number";
      }

      if (typeof user.adress !== "string" || user.adress.trim() === "") {
        return "Invalid address";
      }

      if (user.password.length < 8) {
        return "Password must be at least 8 characters long";
      }

      return null;
    }

    const validationError = validateUser(user);
    var isValid = false; // Example result

    try {
      if (validationError != null) {
        setAlertMessage(validationError + "");

        setShowAlert(!isValid);
        setTimeout(() => {
         

          setShowAlert(false);
        }, 3000); // 3-second delay
      }
       else {
        console.log("clg add user : " + JSON.stringify(user));
      const response=  await apiService.AddUser(ApiUrls.ADDUSER, user);
 
        navigate("/dashboard/listusers");
      }
    } catch (error:any) {
     
      setAlertMessage(error.response.data.message);
      setShowAlert(!isValid);
      setTimeout(() => {
       

        setShowAlert(false);
      }, 3000); // 3-second delay
      console.error("Error fetching menu data:", error);
      
    }
  };

  const fetchDataAndUpdateMenu = async () => {
    try {
      const menuData = await apiService.GetListMenu(ApiUrls.GETALLMENU);
      setFormattedMenu(menuData);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateMenu();
  }, []);

  return (
    <>
      <div>
      
        <form>
          <Alert
            show={showAlert}
            className="alert-danger"
            onHidden={() => setShowAlert(false)}
          >
            {alertMessage}
          </Alert>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information of User
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      name="Username"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Locked
                  </label>
                  <div className="mt-2">
                    <select
                      value={Locked}
                      onChange={(e) => setLocked(e.target.value)}
                      name="Locked"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={0}>Yes</option>
                      <option value={1}>No</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Theme Menu
                  </label>
                  <div className="mt-2">
                    <select
                      name="Theme"
                      value={Themeid}
                      onChange={(e) => setThemeid(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        <option  disabled>
                          option
                        </option>
                      {formattedMenu.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.nameMenu}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Role
                  </label>
                  <div className="mt-2">
                    <select
                      value={Userrole}
                      onChange={(e) => setUserrole(e.target.value)}
                      name="Role"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={"admin"}>Admin</option>
                      <option value={"User"}>User</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      value={Phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      name="Phone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Adress
                  </label>
                  <div className="mt-2">
                    <input
                      value={Adress}
                      onChange={(e) => setAdress(e.target.value)}
                      type="text"
                      name="Adress"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Permision
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="Update"
                          checked={checkboxes.Update}
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Update
                        </label>
                        <p className="text-gray-500">
                          Give the permission to the user for Update
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          type="checkbox"
                          name="Delete"
                          checked={checkboxes.Delete}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-900"
                        >
                          Delete
                        </label>
                        <p className="text-gray-500">
                          Give the permission to the user for Delete{" "}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="Insert"
                          checked={checkboxes.Insert}
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-900"
                        >
                          Insert
                        </label>
                        <p className="text-gray-500">
                          Give the permission to the user for Insert
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={ValidateInput}
          >
            Save
          </button>
        </div>
      </div>
      {/* END: Register Form */}
    </>
  );
}

export default Main;
