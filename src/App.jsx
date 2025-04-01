import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router";
import RideServices from "./components/RideServices";
import AdminServices from "./components/AdminServices.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path={"rides"} element={<RideServices />} />
                    <Route path={"admin"} element={<AdminServices />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
