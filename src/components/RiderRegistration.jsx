import {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../constants";
import toast from "react-hot-toast";

const RiderRegistration = () => {
    const [ID, setID] = useState("");
    const [coordinateX, setCoordinateX] = useState("");
    const [coordinateY, setCoordinateY] = useState("");

    const handleIDChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setID(value);
    };

    const handleCoordinateXChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setCoordinateX(value);
    };

    const handleCoordinateYChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setCoordinateY(value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(BASE_URL + "/ride/rider/add", null, {
            params: {
                riderID: ID,
                x: coordinateX,
                y: coordinateY
            }
        })
            .then(response => {
                console.log(response);
                toast.success("Registered Successfully!");
            })
            .catch(error => {
                console.log(error.message);
                toast.error(error.message + ": Registration Failed");
            });

        setID("");
        setCoordinateX("");
        setCoordinateY("");
    };


    return (
        <div className="w-1/2 flex flex-col bg-blue-400/70 px-6 py-4 mx-16 rounded-2xl justify-center items-center border-2 border-black">
            <h1 className="text-2xl font-semibold mb-8">
                Register as a Rider
            </h1>
            <div className="flex items-center justify-center w-full">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
                >
                    <label className="col-span-2 text-md font-medium text-right">Unique ID Number:</label>
                    <input
                        type="text"
                        value={ID}
                        onChange={handleIDChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                    />

                    <label className="col-span-2 text-md font-medium text-right">X Coordinate:</label>
                    <input
                        type="text"
                        value={coordinateX}
                        onChange={handleCoordinateXChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                    />

                    <label className="col-span-2 text-md font-medium text-right">Y Coordinate:</label>
                    <input
                        type="text"
                        value={coordinateY}
                        onChange={handleCoordinateYChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                    />

                    <div className="col-span-4 flex justify-center mt-2">
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RiderRegistration;