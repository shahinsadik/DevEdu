"use client"
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const axiosSecure = useAxiosSecure();

  const fetchCourses = async () => {
    try {
      const response = await axiosSecure.get('/api/get-course-list');
      if (response.data.status_code === 201) {
        setCourses(response.data.courseData);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addToCart = (course) => {
    // Get existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the new course to the cart
    cartItems.push(course);

    // Save the updated cart back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${course.course_name} has been added to your cart!`);
  };

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => {
          const discountPercent = Math.round(
            ((course.regular_price - course.discount_price) / course.regular_price) * 100
          );

          return (
            <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative">
                <Image
                height={200}
                width={200}
                 src={course.photo} alt={course.course_name} className="w-full h-48 object-cover" />
                <div className="absolute top-0 left-0 p-2">
                  <h3 className="text-white text-xl font-bold">{course.course_name}</h3>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-gray-800 text-lg font-semibold mb-2">{course.course_name}</h2>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex text-blue-500 text-md">★★★★★(no need to change)</span>
                  <span className="ml-2 text-gray-600 text-md font-bold">
                    {course.trainer_data?.name || "Trainer not available"}
                  </span>
                </div>
                <p className="text-gray-600 text-md mb-4">
                  Course Details{" "}
                  <span className="text-blue-500">Show Details(no need to change)</span>
                </p>
                <hr />
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="line-through text-gray-400 text-sm">
                      Tk {course.regular_price}
                    </span>
                    <span className="text-green-600 text-md font-bold ml-2">
                      -{discountPercent}% 
                    </span>
                    <span className="text-black text-lg font-bold ml-2">
                      Tk {course.discount_price}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => addToCart(course)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
