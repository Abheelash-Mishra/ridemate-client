import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";

const Registration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setPhoneNumber(value);
    };

    const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "" || password === "" || phoneNumber === "" || address === "") {
            toast.error("Form cannot be left blank!");
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email address!");
            return;
        }

        if (phoneNumber.length !== 10) {
            toast.error("Phone number must be 10 digits!");
            return;
        }

        axios.post(import.meta.env.VITE_BASE_URL + "/auth/register", {
                email,
                password,
                phoneNumber,
                address,
                role,
                x_coordinate: Math.floor(Math.random() * 11),
                y_coordinate: Math.floor(Math.random() * 11)
        })
            .then(() => {
                toast.success("Registered Successfully!");

                navigate("/login")
            })
            .catch(error => {
                toast.error(error.response.data);
            })
    };


    return (
        <div className={"h-screen flex flex-col justify-center items-center bg-p"}>
            <div className="w-2/5 h-auto flex flex-col bg-blue-400/70 px-6 py-4 mx-16 rounded-2xl justify-center items-center border-2 border-black">
                <h1 className="text-2xl font-semibold mb-6">
                    Join and use our services!
                </h1>
                <>
                    <div className="flex items-center justify-center w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-4 gap-4 w-full justify-center items-center"
                        >
                            <label className="col-span-1 text-md font-medium text-right">Email ID:</label>
                            <input
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                className="col-span-3 px-2 py-1 rounded-lg border-black/80 border-2"
                            />

                            <label className="col-span-1 text-md font-medium text-right">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="col-span-3 px-2 py-1 rounded-lg border-black/80 border-2"
                            />

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
                    <div className="flex items-center w-full my-4">
                        <hr className="flex-grow border-t border-black/40" />
                        <span className="mx-4 text-sm text-black font-semibold">OR</span>
                        <hr className="flex-grow border-t border-black/40" />
                    </div>

                    <div className="w-full flex flex-col justify-center items-center">
                        <button
                            onClick={() => window.location.href = import.meta.env.VITE_BASE_URL + '/oauth2/authorization/google'}
                            className="my-2 bg-white text-black font-semibold border-2 border-black px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>

                        <button
                            onClick={() => window.location.href = import.meta.env.VITE_BASE_URL + '/oauth2/authorization/github'}
                            className="my-2 bg-white text-black font-semibold border-2 border-black px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                        >
                            <img
                                src="https://www.svgrepo.com/show/512317/github-142.svg"
                                alt="GitHub"
                                className="w-5 h-5"
                            />
                            Continue with GitHub
                        </button>
                    </div>
                </>
            </div>
        </div>
    );
};

export default Registration;