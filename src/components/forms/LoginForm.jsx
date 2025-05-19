import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            toast.error("Form cannot be left blank!");
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email address!");
            return;
        }

        axios.post(import.meta.env.VITE_BASE_URL + "/auth/login", {
            email,
            password
        })
            .then(response => {
                localStorage.setItem("jwt", response.data.token)
                toast.success("Logged In Successfully!");

                navigate("/rides")
            })
            .catch(error => {
                console.log(error)
                toast.error(error.response.data);
            })
    };


    return (
        <div className={"h-screen flex flex-col justify-center items-center bg-p"}>
            <div className="w-full h-[20rem] max-w-xl mt-10 flex flex-col bg-blue-400/70 px-6 py-4 mx-16 rounded-2xl justify-center items-center border-2 border-black">
                <h1 className="text-2xl font-semibold mb-4">
                    Login
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

                            <div className="col-span-4 flex justify-center mt-2">
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            </div>
        </div>
    );
};

export default LoginForm;