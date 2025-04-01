import {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../constants.js";
import toast from "react-hot-toast";

const StopRideForm = () => {
    const [rideID, setRideID] = useState("");
    const [coordinateX, setCoordinateX] = useState("");
    const [coordinateY, setCoordinateY] = useState("");
    const [rideTime, setRideTime] = useState("");
    const [rideStatus, setRideStatus] = useState(null);

    const handleRideIDChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setRideID(value);
    }

    const handleCoordinateXChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setCoordinateX(value);
    };

    const handleCoordinateYChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setCoordinateY(value);
    };

    const handleRideTimeChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setRideTime(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(BASE_URL + "/ride/stop", null, {
            params: {
                rideID: rideID,
                x: coordinateX,
                y: coordinateY,
                timeInMins: rideTime
            }
        }).then(response => {
            console.log(response.data);
            setRideStatus(response.data);
            toast.success("Ride Stopped Successfully!");
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

                    <label className="col-span-2 font-medium text-right">X Destination Coordinate:</label>
                    <input
                        type="text"
                        value={coordinateX}
                        onChange={handleCoordinateXChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                    />

                    <label className="col-span-2 font-medium text-right">Y Destination Coordinate:</label>
                    <input
                        type="text"
                        value={coordinateY}
                        onChange={handleCoordinateYChange}
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
                <div className={"mt-8 mb-4 bg-gray-200 rounded-xl flex flex-col items-center"}>
                    <h1 className={"my-4"}>Your Ride Details</h1>
                    <div className="grid grid-cols-2 gap-4 font-medium">
                        <div className="p-4 text-center">Ride ID: {rideStatus?.rideID}</div>
                        <div className="p-4 text-center">Rider ID: {rideStatus?.riderID}</div>
                        <div className="p-4 text-center">Driver ID: {rideStatus?.driverID}</div>
                        <div className="p-4 text-center">Ride Status: {rideStatus?.status}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StopRideForm;