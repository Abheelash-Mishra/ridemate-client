import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";

const RateDriverForm = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState("5.0");
    const [comment, setComment] = useState("");
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const storedValue = localStorage.getItem("DriverID");
        if (storedValue === null) {
            setShowForm(false);
        } else {
            setShowForm(true);
        }

    }, []);

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating < 0.0 || rating > 5.0) {
            toast.error("Enter a rating between 0-5");
            setRating("");
            return;
        }

        if (rating === "") {
            toast.error("Don't leave any fields empty");
            return;
        }

        axios.post(import.meta.env.VITE_BASE_URL + "/ride/rate", null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            params: {
                rideID: localStorage.getItem("tempID"),
                driverID: localStorage.getItem("DriverID"),
                rating: rating,
                comment: comment
            }
        }).then(response => {
            setResponse(response.data);
            localStorage.removeItem("DriverID");
            localStorage.removeItem("tempID");

            toast.success("Driver Rated Successfully!");
        }).catch(error => {
            if (error.response.data.error === "Invalid token") {
                toast.error("Session expired. Redirecting to login...");

                setTimeout(() => {
                    navigate("/login");
                }, 3000)
            }
            else {
                toast.error(error.response.data.error);
            }
        });
    };


    return (
        <div className="h-[28rem] flex flex-col justify-center items-center text-xl font-bold">
            {showForm ? (
                <>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-2/3 justify-center items-center"
                    >
                        <div className={"flex items-center"}>
                            <label className="mx-4">
                                Rating: {parseFloat(rating).toFixed(1)}
                            </label>
                            <input
                                type="range"
                                min={0.0}
                                max={5.0}
                                step={0.1}
                                value={rating}
                                onChange={handleRatingChange}
                            />
                        </div>
                        <div>
                            <label className="mx-4">Comments:</label>
                            <input
                                type="text"
                                value={comment}
                                onChange={handleCommentChange}
                                className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                            />

                            <div className="flex justify-center mt-8">
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                                >
                                    Rate Driver
                                </button>
                            </div>
                        </div>
                    </form>

                    {response && (
                        <div className="my-8">
                            <p>
                                Driver_D{response?.driverID}'s current rating:{' '}
                                <span className="font-medium">{response?.rating.toFixed(2)}</span>
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <p>
                    You can't rate your driver unless you've just completed a ride.
                </p>
            )}
        </div>
    );
};

export default RateDriverForm;