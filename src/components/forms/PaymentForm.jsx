import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentForm = () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [response, setResponse] = useState(null);

    const handleMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(import.meta.env.VITE_BASE_URL + "/payment/pay", null, {
            params: {
                rideID: localStorage.getItem("RideID"),
                type: paymentMethod
            }
        }).then(response => {
            setResponse(response.data);
            localStorage.removeItem("RideID");

            toast.success("Bill Paid!");
        }).catch(error => {
            toast.error(error.response.data.error);
        });
    };

    return (
        <div className={"h-[28rem] flex flex-col justify-center items-center text-xl font-bold"}>
            {!response ? (
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
            >
                <label className="col-span-2 font-medium text-right">Select Payment Method:</label>
                <select
                    id="countries"
                    value={paymentMethod}
                    onChange={handleMethodChange}
                    className="col-span-2 px-2 py-1 font-medium rounded-lg border-black/80 border-2"
                >
                    <option selected>Choose method</option>
                    <option value="WALLET">Wallet</option>
                    <option value="CASH">Cash</option>
                    <option value="CARD">Card</option>
                    <option value="UPI">UPI</option>
                </select>

                <div className="col-span-4 flex justify-center mt-2">
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Pay Bill
                    </button>
                </div>
            </form>

            ) : (
                <div className="bg-gray-200 rounded-xl flex flex-col items-center">
                    <h1 className="my-4">Your Payment Details</h1>
                    <div className="grid grid-cols-2 gap-4 font-medium">
                        <div className="p-4 text-center">Payment ID: {response?.paymentID}</div>
                        <div className="p-4 text-center">Sender ID: {response?.senderID}</div>
                        <div className="p-4 text-center">Receiver ID: {response?.receiverID}</div>
                        <div className="p-4 text-center">Amount (Rs): {response?.amount}</div>
                        <div className="p-4 text-center">Payment Method: {response?.paymentMethodType}</div>
                        <div className="p-4 text-center">Status: {response?.paymentStatus}</div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default PaymentForm;