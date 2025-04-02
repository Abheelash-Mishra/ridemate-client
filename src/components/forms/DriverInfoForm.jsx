import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DriverInfoForm = () => {
    const [number, setNumber] = useState("");
    const [response, setResponse] = useState(null);

    const handleNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setNumber(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setResponse(null);

        axios.get(import.meta.env.VITE_BASE_URL + "/admin/drivers/list", {
            params: {
                N: number,
            }
        }).then(response => {
            console.log(response.data);
            setResponse(response.data);
            toast.success("Details Fetched!");
        }).catch(error => {
            console.log(error.response);
            toast.error(error.response.data.error);
        });
    };


    return (
        <div className={"h-[28rem] flex flex-col justify-center items-center text-xl font-bold"}>
            { response === null ? (
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
                >
                    <label className="col-span-2 font-medium text-right">Number of drivers to list:</label>
                    <input
                        type="text"
                        value={number}
                        onChange={handleNumberChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                    />

                    <div className="col-span-4 flex justify-center mt-2">
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                        >
                            List Details
                        </button>
                    </div>
                </form>

            ) : (
                <div className="my-8">
                    <table className="min-w-full border-collapse border-2 border-black shadow-md">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-600 px-4 py-2 text-left">S. No</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Driver ID</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">X</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Y</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(response) ? (
                            response.map((driver, index) => (
                                <tr key={driver.driverID} className="odd:bg-white even:bg-gray-100">
                                    <td className="border border-gray-600 px-4 py-2">{index + 1}.</td>
                                    <td className="border border-gray-600 px-4 py-2">{driver.driverID}</td>
                                    <td className="border border-gray-600 px-4 py-2">{driver.x}</td>
                                    <td className="border border-gray-600 px-4 py-2">{driver.y}</td>
                                    <td className="border border-gray-600 px-4 py-2">{driver.rating.toFixed(1)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white">
                                <td className="border border-gray-600 px-4 py-2">1.</td>
                                <td className="border border-gray-300 px-4 py-2">{response.driverID}</td>
                                <td className="border border-gray-300 px-4 py-2">{response.x}</td>
                                <td className="border border-gray-300 px-4 py-2">{response.y}</td>
                                <td className="border border-gray-300 px-4 py-2">{response.rating.toFixed(1)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

            )}
        </div>
    );
};

export default DriverInfoForm;