import { useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import {BASE_URL} from "../../constants.js";

const RechargeForm = () => {
    const [step, setStep] = useState(1);
    const [riderID, setRiderID] = useState("");
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState(null);

    const handleRiderIDChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setRiderID(value);
    };

    const handleAmountChange = (e) => setAmount(e.target.value);

    const handleNext = () => {
        if (riderID === "") {
            toast.error("Enter an ID!");
            return;
        }

        axios.get(BASE_URL + "/payment/wallet", {
            params: {
                riderID: riderID,
            }
        }).then(response => {
            setBalance(response.data);
            setStep(2);
        }).catch(error => {
            console.log(error.response);
            toast.error(error.response.data.error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(BASE_URL + "/payment/add-money", null, {
            params: {
                riderID: riderID,
                amount: amount
            }
        }).then(response => {
            console.log(response.data);
            setBalance(response.data);
            toast.success("Recharged!");
        }).catch(error => {
            console.log(error.response);
            toast.error(error.response.data.error);
        });
    };

    return (
        <div className="h-[28rem] flex justify-center items-center text-xl font-bold">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
            >
                <label className="col-span-2 font-medium text-right">Your Rider ID:</label>
                <input
                    type="text"
                    value={riderID}
                    onChange={handleRiderIDChange}
                    className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2 disabled:text-gray-600"
                    disabled={step === 2}
                />

                {step === 2 && (
                    <>
                        <label className="col-span-2 font-medium text-right">Amount:</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                        />
                    </>
                )}

                <div className="col-span-4 flex flex-col items-center gap-2 mt-2">
                    {step === 1 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                        >
                            Recharge
                        </button>
                    )}
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