import {useState} from "react";
import FindDriverForm from "./forms/FindDriverForm";
import StartRideForm from "./forms/StartRideForm.jsx";
import StopRideForm from "./forms/StopRideForm.jsx";
import BillForm from "./forms/BillForm.jsx";
import RateDriverForm from "./forms/RateDriverForm.jsx";
import PaymentForm from "./forms/PaymentForm.jsx";

const RideServices = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = ["Find Driver", "Start Ride", "Stop Ride", "Generate Bill", "Pay Bill", "Rate Driver"];

    const renderComponent = () => {
        switch (selectedOption) {
            case "Find Driver":
                return <FindDriverForm />;

            case "Start Ride":
                return <StartRideForm />;

            case "Stop Ride":
                return <StopRideForm />;

            case "Generate Bill":
                return <BillForm />;

            case "Rate Driver":
                return <RateDriverForm />;

            case "Pay Bill":
                return <PaymentForm />

            default:
                return (
                    <div className={"h-[28rem] flex justify-center items-center text-2xl font-bold"}>
                        Choose one of our services!
                    </div>
                );
        }
    };

    return (
        <div className="w-full h-[28rem] max-w-3xl mx-auto mt-10">
            <div className="flex justify-center border-b-[3px] border-black pb-2">
                {options.map((option, index) => (
                    <button
                        key={option}
                        onClick={() => setSelectedOption(option)}
                        className={`px-4 py-2 transition-colors border-black border-y-2 font-semibold
                            ${index === 0 ? "border-l-2 rounded-l-xl" : "border-l-[2px]"}
                            ${index === options.length - 1 ? "border-r-2 rounded-r-xl" : ""}
                            ${selectedOption === option ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-300"}
                        `}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="mt-4 p-4 border-black border-[3px] rounded">
                {renderComponent()}
            </div>
        </div>
    );
};

export default RideServices;