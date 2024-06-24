import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import { Alert } from "@/base-components";

function Main() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let errors: { [key: string]: string } = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!phone.trim()) {
      errors.phone = "Phone is required";
      isValid = false;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Valid email is required";
      isValid = false;
    }

    if (!city.trim()) {
      errors.city = "City is required";
      isValid = false;
    }

    if (!state.trim()) {
      errors.state = "State is required";
      isValid = false;
    }

    if (!zip.trim()) {
      errors.zip = "ZIP is required";
      isValid = false;
    }

    if (!country.trim()) {
      errors.country = "Country is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleAddSupplier = async () => {
    if (validateForm()) {
      try {
        const newSupplier = { name, address, phone, email, city, state, zip, country };
        await apiService.AddSupplier(ApiUrls.SUPPLIER, newSupplier);
        navigate("/dashboard/listsupplier");
      } catch (error) {
        console.error("Error adding supplier:", error);
      }
    } else {
      setAlertMessage("Please correct the highlighted errors and try again.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Supplier</h1>
      <Alert
        show={showAlert}
        className="alert-danger"
        onHidden={() => setShowAlert(false)}
      >
        {alertMessage}
      </Alert>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.state && <p className="text-sm text-red-600 mt-1">{errors.state}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">ZIP:</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.zip && <p className="text-sm text-red-600 mt-1">{errors.zip}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country}</p>}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => navigate("/dashboard/listsuppliers")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleAddSupplier}
          >
            Add Supplier
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
