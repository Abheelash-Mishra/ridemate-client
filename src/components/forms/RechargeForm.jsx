import {useEffect, useState} from 'react';
import toast from "react-hot-toast";
import axios from "axios";

const RechargeForm = () => {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [balance, setBalance] = useState(null);

    const handleAmountChange = (e) => setAmount(e.target.value);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_URL + "/payment/wallet", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            params: {
                riderID: localStorage.getItem("RiderID")
            }
        }).then(response => {
            setBalance(response.data);
        }).catch(error => {
            toast.error(error.response.data.error);
        });
    }, []);

    const handleMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (paymentMethod === "") {
            toast.error("Please choose a payment method!");
            return;
        }

        axios.post(import.meta.env.VITE_BASE_URL + "/payment/add-money", null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            params: {
                riderID: localStorage.getItem("RiderID"),
                amount: amount,
                type: paymentMethod
            }
        }).then(response => {
            setBalance(response.data);
            toast.success("Recharged!");
        }).catch(error => {
            toast.error(error.response.data.error);
        });
    };

    return (
        <div className="h-[28rem] flex justify-center items-center text-xl font-bold">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
            >
                <label className="col-span-1 font-medium text-right">Amount:</label>
                <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="col-span-3 px-2 py-1 rounded-lg border-black/80 border-2"
                />

                <label className="col-span-2 font-medium text-right">Select Payment Method:</label>
                <select
                    value={paymentMethod}
                    onChange={handleMethodChange}
                    className="col-span-2 px-2 py-1 font-medium rounded-lg border-black/80 border-2"
                >
                    <option selected>Choose method</option>
                    <option value="CARD">Card</option>
                    <option value="UPI">UPI</option>
                </select>

                <div className="col-span-4 flex flex-col items-center gap-2 mt-2">
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Recharge
                    </button>
                </div>
            </form>

            {balance !== null && (
                <div className={"mx-24 mb-16 flex flex-col items-center justify-center bg-blue-400 rounded-lg border-black border-2"}>
                    <h1 className={"px-6 py-2 rounded-t-lg bg-green-400"}>Balance</h1>
                    <p className={"py-1"}>Rs. {balance.toFixed(2)}</p>
                </div>
            )}

        </div>
    );
};

export default RechargeForm;