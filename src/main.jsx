import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from "react-hot-toast";

const requiredEnvVars = ["VITE_BASE_URL"];

for (const key of requiredEnvVars) {
    if (!import.meta.env[key]) {
        alert(`Missing required environment variable: ${key}`);
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Toaster />
        <App />
    </StrictMode>,
)
