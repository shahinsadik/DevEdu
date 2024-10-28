
  "use client"

import Image from "next/image";
import { useEffect , useState} from "react";


const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const [courses, setCourses] = useState([]);
console.log(orderData);

  useEffect(() => {
    // Fetch order data from local storage
    const storedOrderData = JSON.parse(localStorage.getItem("coursePurchaseData"));
    if (storedOrderData) {
      setOrderData(storedOrderData);
      setCourses(storedOrderData.courses || []); // Assuming courses is an array in your order data
    }
  }, []);

  if (!orderData) {
    return <p>Loading...</p>; // or a placeholder for loading state
  }
  return (
    <div className=" m-mt_16px">
      <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 text-black">
        <div className="bg-white lg:p-p_30px w-full  ">
          <div className="text-center  flex flex-col justify-center items-center ">
            <p className="text-xl font-bold">Order Information</p>
            <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
              Order Id : <span className="font-semibold">{orderData?.coursePurchaseData?.form_no}</span>
            </p>
          </div>
          <div className="w-full border flex flex-col md:flex-row md:items-start   md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4  ">
            <div className="md:text-base text-sm flex-1  font-semibold   md:border-r-2 md:border-black md:pr-10">
              <p className="font-bold md:mb-4 w-full">
                Demo information,Checkout page information will be here{" "}
              </p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Full Name :</p>
                  <p className="text-start">{orderData?.coursePurchaseData?.fullName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Country :</p>
                  <p>Bangladesh</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>District Thana :</p>
                  <p className="text-start">{orderData?.coursePurchaseData?.permanentAddress}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Address :</p>
                  <p>{orderData?.coursePurchaseData?.presentAddress}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Order Notes :</p>
                  <p className="text-start">Ok</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Mobile :</p>
                  <p>{orderData?.coursePurchaseData?.mobile}</p>
                </div>
              </div>
            </div>

            <div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
              <p className="font-bold  md:mb-4 w-full">
                Order Summary{" "}
              </p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Sub Total Amount :</p>
                  <p className="text-start">TK {orderData?.coursePurchaseData?.course_fee}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Shopping Charge :</p>
                  <p>0</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Total Amount :</p>
                  <p className="text-start">TK {orderData?.coursePurchaseData?.totalPrice}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Due Amount :</p>
                  <p>0</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Paid Amount :</p>
                  <p className="text-start">TK {orderData?.coursePurchaseData?.totalPrice}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Payment Type:</p>
                  <p>Mobile Banking</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:my-8 md:my-6 my-8 px-p_4px">
            <p className=" md:my-2 font-semibold">Courses:</p>
            <table className="overflow-x-auto border w-full">
              <thead className="b w-full">
                <tr className="text-sm ">
                  <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border ">
                    Image
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Course Name
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Trainer Name
                  </th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">
                    Quantity
                  </th>
                  <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                    Price
                  </th>
                  <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="md:text-base text-sm font-semibold">
              {orderData?.coursePurchaseData?.cartItems?.map((item) => (
  <tr key={item.id}> {/* Ensure each item has a unique identifier */}
    <td className="border text-center w-10 h-12 px-2">
      <Image
        height={500}
        width={500}
        src={item.photo} // Use item.photo instead of orderData.coursePurchaseData.photo
        alt="Course image"
        className="w-full h-full object-cover mx-auto"
      />
    </td>
    <td className="lg:py-6 md:py-4 py-2 text-center border">
      {item?.course_name} {/* Use item.courseName or the appropriate property */}
    </td>
    <td className="lg:py-6 md:py-4 py-2 text-center border">
      {item.trainer_data.name} {/* Use item.studentName or the appropriate property */}
    </td>
    <td className="lg:py-6 md:py-4 py-2 text-center border">
      {item.status} {/* Use item.quantity or the appropriate property */}
    </td>
    <td className="lg:py-6 md:py-4 py-2 text-center border">
      {item.discount_price} {/* Use item.price or the appropriate property */}
    </td>
    <td className="lg:py-6 md:py-4 py-2 text-center border">
      {item.discount_price} {/* Use item.totalPrice or the appropriate property */}
    </td>
  </tr>
))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
