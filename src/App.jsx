import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router";
import RideServices from "./components/RideServices";
import AdminServices from "./components/AdminServices.jsx";
import {useEffect} from "react";
import DriverRegistration from "./components/registration/DriverRegistration.jsx";

function App() {
    useEffect(() => {
        const hasCleaned = sessionStorage.getItem("initialCleanupDone");

        if (!hasCleaned) {
            localStorage.removeItem("matchedDrivers");
            localStorage.removeItem("RideID");
            localStorage.removeItem("DriverID");
            localStorage.removeItem("billPending");

            sessionStorage.setItem("initialCleanupDone", "true");
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path={"register/driver"} element={<DriverRegistration />} />
                    <Route path={"rides"} element={<RideServices />} />
                    <Route path={"admin"} element={<AdminServices />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
