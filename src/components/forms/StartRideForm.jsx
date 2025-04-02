import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const StartRideForm = () => {
    const [rideID, setRideID] = useState("");
    const [driver, setDriver] = useState("");
    const [riderID, setRiderID] = useState("");
    const [rideStatus, setRideStatus] = useState(null);

    const handleRideIDChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setRideID(value);
    }

    const handleDriverChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setDriver(value);
    };

    const handleRiderIDChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setRiderID(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(import.meta.env.VITE_BASE_URL + "/ride/start", null, {
            params: {
                rideID: rideID,
                N: driver,
                riderID: riderID
            }
        }).then(response => {
            console.log(response.data);
            setRideStatus(response.data);
            toast.success("Ride Started Successfully!");
        }).catch(error => {
            console.log(error.response);
            toast.error(error.response.data.error);
        });
    };

    console.log(rideStatus)

    return (
        <div className={"h-[30rem] flex flex-col justify-center items-center text-xl font-bold"}>
            {!rideStatus ? (
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
                >
                    <label className="col-span-2 font-medium text-right">Ride ID:</label>
                    <input
                        type="text"
                        value={rideID}
                        onChange={handleRideIDChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                    />

                    <label className="col-span-2 font-medium text-right">Choose a driver from your matches:</label>
                    <input
                        type="text"
                        value={driver}
                        onChange={handleDriverChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                    />

                    <label className="col-span-2 font-medium text-right">Your Rider ID:</label>
                    <input
                        type="text"
                        value={riderID}
                        onChange={handleRiderIDChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                    />

                    <div className="col-span-4 flex justify-center mt-2">
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                        >
                            Start My Ride
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mt-8 mb-4 bg-gray-200 rounded-xl flex flex-col items-center">
                    <h1 className="my-4">Your Ride Details</h1>
                    <div className="grid grid-cols-2 gap-4 font-medium">
                        <div className="p-4 text-center">Ride ID: {rideStatus.rideID}</div>
                        <div className="p-4 text-center">Rider ID: {rideStatus.riderID}</div>
                        <div className="p-4 text-center">Driver ID: {rideStatus.driverID}</div>
                        <div className="p-4 text-center">Ride Status: {rideStatus.status}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartRideForm;