import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FindRideForm = () => {
    const [matchedDrivers, setMatchedDrivers] = useState(null);
    const [rideStatus, setRideStatus] = useState(null);
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        setMatchedDrivers(JSON.parse(localStorage.getItem("matchedDrivers")));

        if (localStorage.getItem("RideID") !== null) {
            setShowForm(false);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (localStorage.getItem("RiderID") === null) {
            toast.error("Please register as a rider first!");
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
            setMatchedDrivers(response.data?.matchedDrivers);

            if (response.data?.matchedDrivers.length > 0) {
                localStorage.setItem("matchedDrivers", JSON.stringify(response.data?.matchedDrivers));
            }
        }).catch(error => console.error(error.response));
    };

    const handleStartRide = (e, index) => {
        e.preventDefault();

        axios.post(import.meta.env.VITE_BASE_URL + "/ride/start", null, {
            params: {
                N: index,
                riderID: localStorage.getItem("RiderID")
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


    return (
        <div className={"h-[28rem] flex flex-col justify-center items-center text-xl font-bold"}>
            { showForm ? (
                !rideStatus ? (
                    <>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-2/3 justify-center items-center"
                        >
                            <h2 className={"my-8 justify-center items-center"}>Ready to Find Nearby Drivers?</h2>

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

                        <div className={"my-8"}>
                            {matchedDrivers !== null ? (
                                matchedDrivers.length > 0 ? (
                                    <div className={"flex flex-col items-center"}>
                                        <h1 className={"mb-4"}>Select a driver (Ordered closest to furthest)</h1>
                                        {matchedDrivers.map((driver, index) => (
                                            <p
                                                key={index}
                                                className={"text-blue-600 cursor-pointer font-medium hover:text-blue-900"}
                                                onClick={(e) => handleStartRide(e, index+1)}
                                            >
                                                {index+1}. DRIVER_D{driver}
                                            </p>
                                        ))}
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