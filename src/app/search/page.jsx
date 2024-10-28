"use client";


import useAxiosPublic from "@/Hooks/useAxiosPublic";
import React, { useState } from "react"; // Import React and useState hook
import { IoMdSearch } from "react-icons/io"; // Import search icon from react-icons

const Search = () => {
    const axiosSecure = useAxiosPublic(); // Initialize secure axios instance
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    const [courses, setCourses] = useState([]); // State to store search results
    const [loading, setLoading] = useState(false); // State for loading indicator

    // Function to handle the search action
    const handleSearch = async () => {
        if (!searchTerm) return; // Don't search if the search term is empty
        setLoading(true); // Set loading to true

        try {
            const response = await axiosSecure.get('/api/search-purchase-data', {
                params: { searchTerm } // Send searchTerm as a query parameter
            });
            setCourses(response.data); // Set courses to the response data
        } catch (error) {
            console.error("Error fetching data:", error);
            // Optionally handle errors, e.g., set an error message state
        } finally {
            setLoading(false); // Set loading to false after request completion
        }
    };

    return (
        <div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
            <h1 className="w-[600px] text-black mx-auto">Search here</h1>
            <div className="h-[52px] relative col-span-4 w-[600px] mx-auto">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by phone number or form number" // Placeholder for the input field
                    value={searchTerm} // Value controlled by state
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                    className="text-black bg-white px-2 w-full block h-full outline-0 rounded-[4px] border"
                />
                <IoMdSearch
                    className="text-2xl text-black absolute right-2 top-2 cursor-pointer"
                    onClick={handleSearch} // Trigger search on icon click
                />
            </div>
            {loading && <p>Loading...</p>} {/* Loading indicator */}
            {courses.length > 0 && (
                <ul className="w-[600px] mt-4">
                    {courses.map((course) => (
                        <li key={course.id} className="text-black border-b p-2">
                            {course.name} {/* Display course name; adjust based on your API response */}
                        </li>
                    ))}
                </ul>
            )}
            {courses.length === 0 && !loading && <p>No courses found.</p>} {/* Message when no courses are found */}
        </div>
    );
};

export default Search;
