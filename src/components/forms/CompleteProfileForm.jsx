import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CompleteProfileForm = () => {
    const navigate = useNavigate();
    const { search } = useLocation();

    const [userID, setUserID] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(search);
        setUserID(params.get("id"));

        localStorage.setItem("jwt", params.get("token"));
    }, [search, navigate]);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setPhoneNumber(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (phoneNumber === "" || address === "" || role === "") {
            toast.error("Form cannot be left blank!");
            return;
        }

        if (phoneNumber.length !== 10) {
            toast.error("Phone number must be 10 digits!");
            return;
        }

        axios.post(import.meta.env.VITE_BASE_URL + "/auth/profile", {
            userID,
            phoneNumber,
            address,
            x_coordinate: Math.floor(Math.random() * 11),
            y_coordinate: Math.floor(Math.random() * 11),
            role
        })
            .then(() => {
                toast.success("Registered Successfully!");

                navigate("/rides")
            })
            .catch(error => {
                if (error.response.data.error === "Invalid token") {
                    toast.error("Session expired. Redirecting to login...");

                    setTimeout(() => {
                        navigate("/login");
                    }, 3000)
                }
                else {
                    toast.error(error.response.data.error);
                }
            })
    };


    return (
        <div className={"h-screen flex flex-col justify-center items-center bg-p"}>
            <div className="w-2/5 h-auto flex flex-col bg-blue-400/70 px-6 py-4 mx-16 rounded-2xl justify-center items-center border-2 border-black">
                <h1 className="text-2xl font-semibold mb-4">
                    Complete your registration
                </h1>
                <>
                    <div className="flex items-center justify-center w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-4 gap-4 w-full justify-center items-center"
                        >
                            <label className="col-span-1 text-md font-medium text-right">Phone Number:</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                className="col-span-3 px-2 py-1 rounded-lg border-black/80 border-2"
                            />

                            <label className="col-span-1 text-md font-medium text-right">Address:</label>
                            <input
                                type="text"
                                value={address}
                                onChange={handleAddressChange}
                                className="col-span-3 px-2 py-1 rounded-lg border-black/80 border-2"
                            />

                            <label className="col-span-1 text-md font-medium text-right">Role:</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="col-span-2 px-2 py-1 font-medium rounded-lg border-black/80 border-2"
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="RIDER">Rider</option>
                                <option value="DRIVER">Driver</option>
                            </select>

                            <div className="col-span-4 flex justify-center mt-2">
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            </div>
        </div>
    );
};

export default CompleteProfileForm;