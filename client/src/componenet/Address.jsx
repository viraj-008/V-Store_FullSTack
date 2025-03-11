import React, { useState } from "react";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const { shipingAddress, userAdress } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    adress: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!form.fullName.trim()) tempErrors.fullName = "Full Name is required.";
    if (!form.country.trim()) tempErrors.country = "Country is required.";
    if (!form.state.trim()) tempErrors.state = "State is required.";
    if (!form.city.trim()) tempErrors.city = "City is required.";
    if (!form.pincode || form.pincode.length !== 6)
      tempErrors.pincode = "Pincode must be 6 digits.";
    if (!form.phoneNumber || form.phoneNumber.length !== 10)
      tempErrors.phoneNumber = "Phone number must be 10 digits.";
    if (!form.adress.trim()) tempErrors.adress = "Address is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setForm({
      fullName: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      phoneNumber: "",
      adress: "",
    });

    const result = await shipingAddress(
      form.fullName,
      form.country,
      form.state,
      form.city,
      form.pincode,
      form.phoneNumber,
      form.adress
    );
    if (result.data.success) {
      navigate("/checkout");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen p-6">
      <h1 className="text-center font-semibold text-2xl underline text-gray-400">
        Shipping Address
      </h1>
      <form onSubmit={handleSubmit} className="mt-8 max-w-4xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border-2 rounded-md outline-none text-slate-600 p-2"
              value={form.fullName}
              name="fullName"
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Country
            </label>
            <input
              type="text"
              className="w-full border-2 rounded-md outline-none text-slate-600 p-2"
              value={form.country}
              name="country"
              onChange={handleChange}
            />
            {errors.country && (
              <p className="text-red-600 text-sm">{errors.country}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              State
            </label>
            <input
              type="text"
              className="w-full border-2 rounded-md outline-none text-slate-600 p-2"
              value={form.state}
              name="state"
              onChange={handleChange}
            />
            {errors.state && (
              <p className="text-red-600 text-sm">{errors.state}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              City
            </label>
            <input
              type="text"
              className="w-full border-2 rounded-md outline-none text-slate-600 p-2"
              value={form.city}
              name="city"
              onChange={handleChange}
            />
            {errors.city && (
              <p className="text-red-600 text-sm">{errors.city}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Pincode
            </label>
            <input
              type="number"
              className="w-full border-2 rounded-md outline-none text-slate-600 p-2"
              value={form.pincode}
              name="pincode"
              onChange={handleChange}
            />
            {errors.pincode && (
              <p className="text-red-600 text-sm">{errors.pincode}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Phone No.
            </label>
            <input
              type="number"
              className="w-full border-2 rounded-md outline-none text-slate-600 p-2"
              value={form.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="mt-6">
          <label className="block text-slate-700 font-semibold mb-2">
            Address
          </label>
          <textarea
            className="w-full h-24 border-2 rounded-md outline-none text-slate-600 p-2"
            value={form.adress}
            name="adress"
            onChange={handleChange}
          />
          {errors.adress && (
            <p className="text-red-600 text-sm">{errors.adress}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800"
          >
            Submit
          </button>
          {userAdress && (
            <button
              type="button"
              className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-800"
              onClick={() => navigate("/checkout")}
            >
              Use Old Address
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Address;
