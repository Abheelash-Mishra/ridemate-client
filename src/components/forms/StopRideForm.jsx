import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const StopRideForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [destination, setDestination] = useState("");
    const [rideTime, setRideTime] = useState("");
    const [rideStatus, setRideStatus] = useState(null);

    useEffect(() => {
        const storedValue = localStorage.getItem("RideID");
        if (storedValue === null) {
            setShowForm(false);
        } else {
            setShowForm(true);
        }

    }, []);

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const handleRideTimeChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setRideTime(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (destination === "" || rideTime === "") {
            toast.error("Don't leave any fields empty");
            return;
        }

        axios.post(import.meta.env.VITE_BASE_URL + "/ride/stop", null, {
            params: {
                rideID: localStorage.getItem("RideID"),
                destination: destination,
                x: Math.floor(Math.random() * 11),
                y: Math.floor(Math.random() * 11),
                timeInMins: rideTime
            }
        }).then(response => {
            setRideStatus(response.data);
            toast.success("Ride Stopped Successfully!");
        }).catch(error => {
            toast.error(error.response.data.error);
        });
    };

    return (
        <div className="h-[28rem] flex flex-col justify-center items-center text-xl font-bold">
            {showForm ? (
                !rideStatus ? (
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
                    >
                        <label className="col-span-2 font-medium text-right">Destination:</label>
                        <input
                            type="text"
                            value={destination}
                            onChange={handleDestinationChange}
                            className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                        />

                        <label className="col-span-2 font-medium text-right">Ride Duration (Minutes)</label>
                        <input
                            type="text"
                            value={rideTime}
                            onChange={handleRideTimeChange}
                            className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                        />

                        <div className="col-span-4 flex justify-center mt-2">
                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                            >
                                Stop Ride
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-8 mb-4 bg-gray-200 rounded-xl flex flex-col items-center">
                        <h1 className="my-4">Your Ride Details</h1>
                        <div className="grid grid-cols-2 gap-4 font-medium">
                            <div className="p-4 text-center">Ride ID: {rideStatus?.rideID}</div>
                            <div className="p-4 text-center">Rider ID: {rideStatus?.riderID}</div>
                            <div className="p-4 text-center">Driver ID: {rideStatus?.driverID}</div>
                            <div className="p-4 text-center">Status: {rideStatus?.status}</div>
                        </div>
                    </div>
                )
            ) : (
                <p>You have not started any ride yet!</p>
            )}
        </div>

    );
};

export default StopRideForm;