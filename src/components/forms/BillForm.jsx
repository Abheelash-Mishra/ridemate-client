import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BillForm = () => {
    const [billAmount, setBillAmount] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get(import.meta.env.VITE_BASE_URL + "/ride/bill", {
            params: {
                rideID: localStorage.getItem("RideID")
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
                className="flex flex-col w-2/3 justify-center items-center"
            >
                <h2 className={"my-8 justify-center items-center"}>Ready To Receive Your Final Bill?</h2>

                <div className="flex justify-center mt-2">
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