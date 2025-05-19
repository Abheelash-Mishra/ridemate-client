import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";

const DriverRegistration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

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

        axios.post(import.meta.env.VITE_BASE_URL + "/auth/register/driver", {
                email,
                password,
                phoneNumber,
                address,
                x: Math.floor(Math.random() * 11),
                y: Math.floor(Math.random() * 11)
        })
            .then(() => {
                toast.success("Registered Successfully!");

                navigate("/");
            })
            .catch(error => {
                toast.error(error.response.data);
            });
    };


    return (
        <div className={"h-screen flex flex-col justify-center items-center bg-p"}>
            <div className={"w-1/2 text-2xl font-bold text-center"}>
                Want to join our program as a driver, and help people get to their destinations?
            </div>
            <div className="w-full h-auto max-w-xl mt-10 flex flex-col bg-blue-400/70 px-6 py-4 mx-16 rounded-2xl justify-center items-center border-2 border-black">
                <h1 className="text-2xl font-semibold mb-8">
                    Register as a Driver
                </h1>
                <div className="flex items-center justify-center w-full">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
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
            </div>
        </div>
    );
};

export default DriverRegistration;