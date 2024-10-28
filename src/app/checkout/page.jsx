"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  // Update cart item quantity in local storage
  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = quantity > 0 ? quantity : 1;
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.discount_price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: "",
    formNo: "",
    parentName: "",
    parentNumber: "",
    school: "",
    jobInfo: "",
    email: "",
    gender: "",
    presentAddress: "",
    permanentAddress: "",
    nid: "",
    mobile: "",
    guardianName: "",
    dob: "",
    bloodGroup: "",
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coursePurchaseData = {
      message: "Course purchase successfully completed.",
      coursePurchaseData: {
        ...formData,
        course_id: "3",
        admission_date: new Date().toISOString().split("T")[0],
        course_fee: cartItems.length > 0 ? cartItems[0].discount_price || 0 : 0,
        course_qty: cartItems.length > 0 ? cartItems[0].quantity : 0,
        total_course_fee: totalPrice,
        photo: "https://itder.com/storage/uploads/coursePurchasse/8870711730106960.gif",
        user_id: 1,
        form_no: formData.formNo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id: 455,
        totalPrice ,
        cartItems
      
      },
      status_code: 201,
    };

    // Store the data in local storage
    localStorage.setItem("coursePurchaseData", JSON.stringify(coursePurchaseData));

    // Optionally, you can log it to confirm
    console.log("Course purchase data saved:", coursePurchaseData);
    toast.success("Course purchase data saved successfully!");
  };

  return (
    <div className="mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form className="bg-white shadow-md text-black rounded-lg p-6" onSubmit={handleSubmit}>
        {/* Trainee Information Section */}
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="fullName" className="block font-semibold text-base mb-2">
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border bg-white border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="formNo" className="block font-semibold text-base mb-2">
                Form no:
              </label>
              <input
                type="text"
                id="formNo"
                name="formNo"
                value={formData.formNo}
                onChange={handleInputChange}
                className="w-full border bg-white border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="parentName" className="block font-semibold text-base mb-2">
                Father/Mother Name:
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                className="w-full border bg-white border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="parentNumber" className="block font-semibold text-base mb-2">
                Number:
              </label>
              <input
                type="text"
                id="parentNumber"
                name="parentNumber"
                value={formData.parentNumber}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="school" className="block font-semibold text-base mb-2">
                School/College:
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="jobInfo" className="block font-semibold text-base mb-2">
                Job Information:
              </label>
              <input
                type="text"
                id="jobInfo"
                name="jobInfo"
                value={formData.jobInfo}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="email" className="block font-semibold text-base mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="block font-semibold text-base mb-2">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="presentAddress" className="block font-semibold text-base mb-2">
                Present Address:
              </label>
              <textarea
                id="presentAddress"
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="permanentAddress" className="block font-semibold text-base mb-2">
                Permanent Address:
              </label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nid" className="block font-semibold text-base mb-2">
                NID Number:
              </label>
              <input
                type="text"
                id="nid"
                name="nid"
                value={formData.nid}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block font-semibold text-base mb-2">
                Mobile Number:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="guardianName" className="block font-semibold text-base mb-2">
                Guardian Name:
              </label>
              <input
                type="text"
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="dob" className="block font-semibold text-base mb-2">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="bloodGroup" className="block font-semibold text-base mb-2">
                Blood Group:
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                required
              >
                <option value="" disabled>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cart Items Section */}
        <div className="border-t mt-6 pt-4">
          <h3 className="text-xl font-bold mb-4">Selected Courses</h3>
          <div>
            {cartItems.length === 0 ? (
              <p className="text-red-500">No items in the cart.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 border mb-2">
                  <div className="flex items-center">
                    <Image src={item.photo} alt={item.name} width={80} height={80} className="rounded-lg" />
                    <div className="ml-4">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-gray-600">
                        Price: ${item.discount_price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(index)} className="text-red-500">
                    <RiDeleteBin5Line size={24} />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Total: ${totalPrice.toFixed(2)}</h4>
          </div>
        </div>

        <button type="submit" className="bg-[#6f42c1] text-white px-4 py-2 mt-4 rounded-md">
          Submit Admission
        </button>
      </form>
    </div>
  );
};

export default Checkout;
