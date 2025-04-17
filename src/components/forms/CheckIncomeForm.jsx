import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CheckIncomeForm = () => {
    const [driverID, setDriverID] = useState("");
    const [response, setResponse] = useState(null);

    const handleDriverIDChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setDriverID(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setResponse(null);

        axios.get(import.meta.env.VITE_BASE_URL + "/admin/drivers/earnings", {
            params: {
                driverID: driverID,
            }
        }).then(response => {
            setResponse(response.data);
            toast.success("Fetched earnings!");
        }).catch(error => {
            toast.error(error.response.data.error);
        });
    };


    return (
        <div className={"h-[28rem] flex flex-col justify-center items-center text-xl font-bold"}>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
            >
                <label className="col-span-2 font-medium text-right">Enter Driver ID:</label>
                <input
                    type="text"
                    value={driverID}
                    onChange={handleDriverIDChange}
                    className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                />

                <div className="col-span-4 flex justify-center mt-2">
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        View Income
                    </button>
                </div>
            </form>

            { response && (
                <div className={"my-8"}>
                    <p>Driver_D{response?.driverID}'s Total Earnings: <span className={"font-medium"}>Rs. {response?.earnings.toFixed(2)}</span></p>
                </div>
            )}
        </div>
    );
};

export default CheckIncomeForm;