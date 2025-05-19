import RiderRegistration from "./registration/RiderRegistration.jsx";
import {Link} from "react-router";

const Homepage = () => {
    const handleLogout = () => {
        localStorage.removeItem("jwt");

        // then refresh
        window.location.reload();
    };

    return (
        <>
            <div className="w-full h-80 flex flex-col items-center justify-center bg-gradient-to-b from-primary to-white">
                <div className={"w-full flex justify-between items-center"}>
                    <Link
                        to={"/register/driver"}
                        className={"px-8"}
                    >
                        <p className={"px-3 py-1 transition-colors border-black border-y-2 font-semibold border-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-900"}>
                            Register as a driver
                        </p>
                    </Link>

                    {/*<Link*/}
                    {/*    to={"/admin"}*/}
                    {/*    className={"px-8"}*/}
                    {/*>*/}
                    {/*    <p className={"text-blue-800 hover:underline"}>*/}
                    {/*        Need Admin Services?*/}
                    {/*    </p>*/}
                    {/*</Link>*/}

                    {!localStorage.getItem("jwt") ? (
                        <div className="flex flex-row">
                            <Link to="/login" className="px-2">
                                <p className="px-3 py-1 transition-colors border-black border-y-2 font-semibold border-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-900">
                                    Login
                                </p>
                            </Link>

                            <Link to="/register/rider" className="px-2">
                                <p className="px-3 py-1 transition-colors border-black border-y-2 font-semibold border-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-900">
                                    Register
                                </p>
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            on
                            className="px-3 py-1 mx-4 transition-colors border-black border-y-2 font-semibold border-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-900">
                            Logout
                        </button>
                    )}

                </div>

                <h1 className={"text-5xl font-bold my-8"}>
                    Ride Mate
                </h1>
                <p className="text-2xl my-8 font-semibold">
                    Your buddy for whenever you need to get somewhere!
                </p>
                <Link to={"/rides"}>
                    <button
                        className={"px-4 py-2 transition-colors border-black border-y-2 font-semibold border-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-900"}
                    >
                        Use our services!
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Homepage;