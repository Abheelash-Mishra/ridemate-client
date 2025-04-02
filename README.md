# RideMate Client Application

RideMate is a console-based and RESTAPI-enabled ride-hailing application written in Java using **Spring Boot**. It supports both **CLI commands** and **REST API endpoints** for managing rides, drivers, and riders.
The client-side application was built using React (with Vite).

---

## Installation & Setup
### **1. Clone the Repository**
```sh
git clone https://github.com/Abheelash-Mishra/ridemate-client.git
cd ridemate
```

### **2. Install Dependencies**
Ensure you have **Node.js** installed. Then, run this to generate the node modules:
```sh
npm ci
```

Also ensure you have a local server of the backend API. You can find the repository [here](https://github.com/Abheelash-Mishra/RideMate).

### **3. Start the Application**
Make sure to run the server and add the base URL in the `.env` file. 

Start the React application through the following command.
```sh
npm run dev
```

You can now access the React app at `http://localhost:5173`.