import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RiderRegistration = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setPhoneNumber(value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "" || phoneNumber === "") {
            toast.error("Form cannot be left blank!");
            return;
        }

        if (phoneNumber.length !== 10) {
            toast.error("Phone number must be 10 digits!");
            return;
        }

        axios.post(import.meta.env.VITE_BASE_URL + "/ride/rider/add", null, {
            params: {
                email: email,
                phoneNumber: phoneNumber,
                x: Math.floor(Math.random() * 11),
                y: Math.floor(Math.random() * 11)
            }
        })
            .then(response => {
                localStorage.setItem("RiderID", response.data);
                toast.success("Registered Successfully!");
            })
            .catch(error => {
                console.log(error.message);
                toast.error(error.message + ": Registration Failed");
            });

        setEmail("");
        setPhoneNumber("");
    };


    return (
        <div className="w-1/2 flex flex-col bg-blue-400/70 px-6 py-4 mx-16 rounded-2xl justify-center items-center border-2 border-black">
            <h1 className="text-2xl font-semibold mb-8">
                Register as a Rider
            </h1>
            <div className="flex items-center justify-center w-full">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-4 gap-4 w-2/3 justify-center items-center"
                >
                    <label className="col-span-2 text-md font-medium text-right">Email ID:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
                    />

                    <label className="col-span-2 text-md font-medium text-right">Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        className="col-span-2 px-2 py-1 rounded-lg border-black/80 border-2"
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
    );
};

export default RiderRegistration;