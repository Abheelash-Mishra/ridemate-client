import {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../constants";
import toast from "react-hot-toast";

const FindDriverForm = () => {
    const [ID, setID] = useState("");

    const handleIDChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setID(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const request = axios.get(BASE_URL + "/ride/rider/match", {
            params: {
                riderID: ID
            }
        });

        toast.promise(request, {
            loading: "Searching for potential drivers...",
            success: "Found drivers near you!",
            error: (err) => err.response.data.error ,
        });

        request.then(response => console.log(response))
            .catch(error => console.error(error.response));
    };


    return (
        <div className={"h-96 flex justify-center items-center text-xl font-bold"}>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
            >
                <label className="col-span-2 font-medium text-right">Your Rider ID Number:</label>
                <input
                    type="text"
                    value={ID}
                    onChange={handleIDChange}
                    className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                />

                <div className="col-span-4 flex justify-center mt-2">
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Search for Drivers
                    </button>
                </div>
            </form>

            <div>
                {}
            </div>
        </div>
    );
};

export default FindDriverForm;