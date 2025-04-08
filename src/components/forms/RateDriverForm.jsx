import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RateDriverForm = () => {
    const [driverID, setDriverID] = useState("");
    const [rating, setRating] = useState("");
    const [response, setResponse] = useState(null);

    const handleDriverIDChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setDriverID(value);
    };

    const handleRatingChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, "");
        setRating(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating < 0.0 || rating > 5.0) {
            toast.error("Enter a rating between 0-5");
            setRating("");
            return;
        }

        axios.post(import.meta.env.VITE_BASE_URL + "/driver/rate", null, {
            params: {
                driverID: driverID,
                rating: rating
            }
        }).then(response => {
            console.log(response.data);
            setResponse(response.data);
            toast.success("Driver Rated Successfully!");
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
                <label className="col-span-2 font-medium text-right">Enter Driver ID:</label>
                <input
                    type="text"
                    value={driverID}
                    onChange={handleDriverIDChange}
                    className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                />

                <label className="col-span-2 font-medium text-right">Enter Rating:</label>
                <input
                    type="text"
                    value={rating}
                    onChange={handleRatingChange}
                    className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                />

                <div className="col-span-4 flex justify-center mt-2">
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Rate Driver
                    </button>
                </div>
            </form>

            { response && (
                <div className={"my-8"}>
                    <p>Driver_D{response?.driverID}'s current rating: <span className={"font-medium"}>{response?.rating.toFixed(2)}</span></p>
                </div>
            )}

        </div>
    );
};

export default RateDriverForm;