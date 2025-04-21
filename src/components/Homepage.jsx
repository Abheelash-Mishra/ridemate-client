import RiderRegistration from "./registration/RiderRegistration.jsx";
import {Link} from "react-router";

const Homepage = () => {
    return (
        <>
            <div className="w-full h-80 flex flex-col items-center justify-center bg-gradient-to-b from-primary to-primary/20">
                <div className={"w-full flex justify-between items-center"}>
                    <Link
                        to={"/register/driver"}
                        className={"px-8"}
                    >
                        <p className={"px-3 py-1 transition-colors border-black border-y-2 font-semibold border-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-900"}>
                            Register as a driver
                        </p>
                    </Link>

                    <Link
                        to={"/admin"}
                        className={"px-8"}
                    >
                        <p className={"text-blue-800 hover:underline"}>
                            Need Admin Services?
                        </p>
                    </Link>
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
            <div className={"bg-primary/20"}>
                <h1 className={"flex justify-center text-3xl font-bold py-8"}>
                    Interested in our services?
                </h1>

                <div className={"flex flex-row pb-16 justify-center"}>
                    <RiderRegistration />
                </div>
            </div>
        </>
    );
};

export default Homepage;