import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const StopRideForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [rideStatus, setRideStatus] = useState(null);

    const rideID = localStorage.getItem("RideID");
    const billPending = localStorage.getItem("billPending") === "true";

    useEffect(() => {
        const rideID = localStorage.getItem("RideID");
        const billPending = localStorage.getItem("billPending") === "true";

        if (rideID === null || billPending) {
            setShowForm(false);
        }
        else {
            setShowForm(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(import.meta.env.VITE_BASE_URL + "/ride/stop", null, {
            params: {
                rideID: rideID,
                timeInMins: Math.floor(Math.random() * 61) + 10                   // Keeping minimum ride time as 10
            }
        }).then(response => {
            setRideStatus(response.data);
            toast.success("Ride Stopped Successfully!");
            localStorage.setItem("billPending", "true");
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
                        className="flex flex-col w-2/3 justify-center items-center"
                    >
                        <h2 className={"my-8 justify-center items-center"}>Conclude Your Ride?</h2>

                        <div className="flex justify-center mt-2">
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
                billPending ? (
                    <p>Please pay the bill of your ride!</p>
                ) : (
                    <p>You have not started any ride yet!</p>
                )
            )}
        </div>
    );
};

export default StopRideForm;