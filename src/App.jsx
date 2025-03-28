import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router";
import RideServices from "./components/RideServices";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path={"rides"} element={<RideServices />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
