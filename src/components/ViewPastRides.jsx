import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const ViewPastRides = () => {
    const [allRides, setAllRides] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_URL + "/ride/all", {
            params: {
                riderID: localStorage.getItem("RiderID")
            }
        }).then(response => {
            setAllRides(response.data);
            console.log(response.data)
        }).catch(error => {
            toast.error(error.response.data.error);
        });
    }, []);

    const totalPages = Math.ceil(allRides.length / pageSize);

    const paginatedRides = allRides.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePrev = () => {
        setCurrentPage((prev) => {
            return Math.max(prev - 1, 1);
        });
    };

    const handleNext = () => {
        setCurrentPage((prev) => {
            return Math.min(prev + 1, totalPages);
        });
    };

    return (
        <div className="h-[30rem] flex flex-col justify-center items-center text-xl font-bold">
            <div className="w-full max-w-2xl">
                <h2 className="text-2xl mb-4">Past Rides</h2>
                {allRides.length === 0 ? (
                    <p>No past rides available.</p>
                ) : (
                    <ul className="space-y-2">
                        {paginatedRides.map((ride) => (
                            <li
                                key={ride.rideID}
                                className="p-4 bg-gray-100 rounded shadow flex justify-between"
                            >
                                <div className="grid grid-cols-2 gap-z-32 font-medium w-full">
                                    <p>Driver ID: {ride.driverID}</p>
                                    <p>Destination: {ride.destination}</p>
                                    <p>Ride Duration: {ride.rideDuration}</p>
                                    <p>Bill: ₹{ride.billAmount}</p>
                                </div>
                                <p className="text-sm text-gray-500 w-20">ID: {ride.rideID}</p>
                            </li>
                        ))}
                    </ul>
                )}

                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center items-center space-x-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded border-2 border-black disabled:bg-gray-400 disabled:border-gray-600"
                        >
                            Prev
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded border-2 border-black disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewPastRides;
