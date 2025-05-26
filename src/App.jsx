import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router";
import RideServices from "./components/RideServices";
import AdminServices from "./components/AdminServices.jsx";
import {useEffect} from "react";
import LoginForm from "./components/forms/LoginForm.jsx";
import Registration from "./components/registration/Registration.jsx";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.jsx";
import CompleteProfileForm from "./components/forms/CompleteProfileForm.jsx";

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
                    <Route path={"login"} element={<LoginForm />} />
                    <Route path={"register"} element={<Registration />} />
                    <Route path="profile" element={<CompleteProfileForm />} />
                    <Route path="oauth2/redirect" element={<OAuth2RedirectHandler />} />
                    <Route path={"rides"} element={<RideServices />} />
                    <Route path={"admin"} element={<AdminServices />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
