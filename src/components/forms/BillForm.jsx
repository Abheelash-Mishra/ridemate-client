import {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../constants.js";
import toast from "react-hot-toast";

const BillForm = () => {
    const [rideID, setRideID] = useState("");
    const [billAmount, setBillAmount] = useState(null);

    const handleRideIDChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setRideID(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get(BASE_URL + "/ride/bill", {
            params: {
                rideID: rideID,
            }
        }).then(response => {
            console.log(response.data);
            setBillAmount(response.data);
            toast.success("Bill Generated!");
        }).catch(error => {
            console.log(error.response);
            toast.error(error.response.data.error);
        });
    };


    return (
        <div className={"h-[28rem] flex flex-col justify-center items-center text-xl font-bold"}>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
            >
                <label className="col-span-2 font-medium text-right">Enter Ride ID:</label>
                <input
                    type="text"
                    value={rideID}
                    onChange={handleRideIDChange}
                    className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                />

                <div className="col-span-4 flex justify-center mt-2">
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Generate Bill
                    </button>
                </div>
            </form>

            <div className={"my-8"}>
                {billAmount !== null && (
                    <div className={"flex items-center"}>
                        <h1>Total Bill:&nbsp;</h1>
                        <p>{billAmount?.toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BillForm;