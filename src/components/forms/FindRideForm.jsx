import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FindRideForm = () => {
    const [destination, setDestination] = useState("");
    const [matchedDrivers, setMatchedDrivers] = useState(null);
    const [rideStatus, setRideStatus] = useState(null);
    const [showForm, setShowForm] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;

    useEffect(() => {
        const storedDrivers = JSON.parse(localStorage.getItem("matchedDrivers"));
        setMatchedDrivers(storedDrivers);

        if (localStorage.getItem("RideID") !== null) {
            setShowForm(false);
        }
    }, []);

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (localStorage.getItem("RiderID") === null) {
            toast.error("Please register as a rider first!");
            return;
        }

        if (destination.trim() === "") {
            toast.error("Please enter your destination!");
            return;
        }

        const destinationRegex = /^[0-9\s]*$/;
        if (destinationRegex.test(destination)) {
            toast.error("Please enter a valid destination!");
            return;
        }

        const request = axios.get(import.meta.env.VITE_BASE_URL + "/ride/rider/match", {
            params: {
                riderID: localStorage.getItem("RiderID")
            }
        });

        toast.promise(request, {
            loading: "Searching for potential drivers...",
            success: "Search Complete!",
            error: (err) => err.response.data.error
        });

        request.then(response => {
            const drivers = response.data?.matchedDrivers;
            setMatchedDrivers(drivers);
            setCurrentPage(1);

            if (drivers.length > 0) {
                localStorage.setItem("matchedDrivers", JSON.stringify(drivers));
            }
        }).catch(error => console.error(error.response));
    };

    const handleStartRide = (e, index) => {
        e.preventDefault();

        axios.post(import.meta.env.VITE_BASE_URL + "/ride/start", null, {
            params: {
                N: index,
                riderID: localStorage.getItem("RiderID"),
                destination: destination,
                x: Math.floor(Math.random() * 11),
                y: Math.floor(Math.random() * 11)
            }
        }).then(response => {
            localStorage.setItem("RideID", response.data.rideID);
            localStorage.setItem("DriverID", response.data.driverID);
            localStorage.removeItem("matchedDrivers");
            setRideStatus(response.data);
            toast.success("Ride Started Successfully!");
        }).catch(error => {
            toast.error(error.response.data.error);
        });
    };

    const totalPages = matchedDrivers ? Math.ceil(matchedDrivers.length / pageSize) : 1;
    const paginatedDrivers = matchedDrivers ? matchedDrivers.slice((currentPage - 1) * pageSize, currentPage * pageSize) : [];

    return (
        <div className="h-[28rem] flex flex-col justify-center items-center text-xl font-bold">
            {showForm ? (
                !rideStatus ? (
                    <>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-2/3 justify-center items-center"
                        >
                            <h2 className="my-8">Ready to Find Nearby Drivers?</h2>

                            <div className="flex flex-row justify-center items-center mb-4">
                                <label className="font-medium text-right mx-4">Destination:</label>
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={handleDestinationChange}
                                    disabled={matchedDrivers !== null && matchedDrivers.length > 0}
                                    className="px-2 py-1 rounded-lg border-black/80 border-2 disabled:text-gray-500"
                                />
                            </div>

                            <div className="flex justify-center mt-2">
                                <button
                                    type="submit"
                                    disabled={matchedDrivers !== null && matchedDrivers.length > 0}
                                    className="text-lg bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-500"
                                >
                                    Search for Drivers
                                </button>
                            </div>
                        </form>

                        <div className="my-8 w-full max-w-3xl">
                            {matchedDrivers !== null ? (
                                matchedDrivers.length > 0 ? (
                                    <div className="flex flex-col items-center">
                                        <h1 className="mb-6">Select a driver (Ordered closest to furthest)</h1>

                                        <div className="flex items-center justify-between w-full">
                                            <button
                                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="px-3 py-1 bg-blue-500 text-white text-lg rounded disabled:bg-gray-400"
                                            >
                                                Prev
                                            </button>

                                            <div className="grid grid-cols-3 gap-6 w-full mx-4">
                                                {paginatedDrivers.map((driver, index) => (
                                                    <div
                                                        key={index}
                                                        className="p-1 bg-blue-100 rounded shadow text-center text-lg cursor-pointer hover:bg-blue-200"
                                                        onClick={(e) =>
                                                            handleStartRide(e,(currentPage - 1) * pageSize + index + 1)
                                                        }
                                                    >
                                                        {(currentPage - 1) * pageSize + index + 1}. DRIVER_D{driver}
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                                                }
                                                disabled={currentPage === totalPages}
                                                className="px-3 py-1 bg-blue-500 text-white text-lg rounded disabled:bg-gray-400"
                                            >
                                                Next
                                            </button>
                                        </div>

                                        {totalPages > 1 && (
                                            <div className="mt-4 text-sm text-gray-600">
                                                Page {currentPage} of {totalPages}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p>No Drivers Available.</p>
                                )
                            ) : null}
                        </div>
                    </>
                ) : (
                    <div className="mt-8 mb-4 bg-gray-200 rounded-xl flex flex-col items-center">
                        <h1 className="my-4">Your Ride Details</h1>
                        <div className="grid grid-cols-2 gap-4 font-medium">
                            <div className="p-4 text-center">Ride ID: {rideStatus.rideID}</div>
                            <div className="p-4 text-center">Rider ID: {rideStatus.riderID}</div>
                            <div className="p-4 text-center">Driver ID: {rideStatus.driverID}</div>
                            <div className="p-4 text-center">Status: {rideStatus.status}</div>
                        </div>
                    </div>
                )
            ) : (
                <p>You already have a ride that's incomplete!</p>
            )}
        </div>
    );
};

export default FindRideForm;
